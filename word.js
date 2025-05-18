const express = require('express');
const app = express();
const port = 3000; 
const path = require('path'); 
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, WidthType } = require('docx');
const bodyParser = require('body-parser');
const sharp = require('sharp');  
const oUI = require('./libs/ui'); 
 
 
const go = function(){

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    // 配置静态文件服务
    app.use(express.static(path.join(__dirname, 'public')));
    
    // 主页路由 - 重定向到静态页面
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
    app.get('/test', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'test.html'));
    });
    app.get('/issue1', async (req, res) => {
        try {
            oUI.run(req,res);
        } catch (error) {
            console.error("获取 issue 并渲染页面时出错:", error);
            res.status(500).send("获取 GitHub 数据时出错");
        }
    }); 
    app.post('/download', async (req, res) => {
        try {
            // 创建一个存储所有 sections 的数组
            const sections = [];
            
            // 添加标题
            sections.push({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: req.body.title,
                                bold: true,
                                size: 36,
                                heading: HeadingLevel.HEADING_1
                            })
                        ]
                    })
                ]
            });
            
            // 处理段落
            for (let i = 1; i <= 10; i++) {
                const titleKey = `paragraphTitle${i}`;
                const contentKey = `paragraphContent${i}`;
                
                if (req.body[titleKey] && req.body[contentKey]) {
                    // 添加段落标题
                    sections.push({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: req.body[titleKey],
                                        bold: true,
                                        size: 24,
                                        heading: HeadingLevel.HEADING_2
                                    })
                                ]
                            })
                        ]
                    });
                    
                    // 添加段落内容
                    sections.push({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(req.body[contentKey])
                                ]
                            })
                        ]
                    });
                    
                    // 处理该段落的图片
                    if (req.body.canvasImages) {
                        const canvasImages = JSON.parse(req.body.canvasImages);
                        const paragraphImages = canvasImages.filter(img => img.paragraph === i);
                        
                        for (const img of paragraphImages) {
                            // 从 dataURL 中提取 base64 数据
                            const base64Data = img.dataUrl.replace(/^data:image\/png;base64,/, '');
                            const buffer = Buffer.from(base64Data, 'base64');
                            
                            // 使用 sharp 处理图像（调整大小等）
                            const resizedImage = await sharp(buffer)
                                .resize({ width: 400 }) // 调整宽度为 400px，保持比例
                                .png()
                                .toBuffer();
                            
                            // 添加图像到文档
                            sections.push({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new ImageRun({
                                                data: resizedImage,
                                                transformation: {
                                                    width: 400,
                                                    height: 150,
                                                },
                                            })
                                        ]
                                    })
                                ]
                            });
                        }
                    }
                }
            }
            
            // 创建一个新的 Document 实例，传递 sections 数组
            const doc = new Document({
                creator: "Canvas绘图工具",
                title: req.body.title || "无标题文档",
                description: "通过Canvas绘图生成的文档",
                subject: "Canvas绘图文档",
                keywords: ["Canvas", "绘图", "文档"],
                sections: sections // 传递构建好的 sections 数组
            });
            
            // 生成文档
            const buffer = await Packer.toBuffer(doc);
            
            // 设置响应头
            res.setHeader('Content-disposition', 'attachment; filename=generated-document.docx');
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            
            // 发送文件
            res.send(buffer);
        } catch (error) {
            console.error('生成 DOCX 文件时出错:', error);
            res.status(500).send('生成 DOCX 文件时出错');
        }
    });     
    app.listen(port, () => {
        console.log(`服务器运行在 http://localhost:${port}`);
    });  
}();                  
/* 
// return all new code
*/