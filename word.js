const express = require('express');
const app = express();
const port = 3000;
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, WidthType } = require('docx');
const bodyParser = require('body-parser');
const sharp = require('sharp'); // 用于图像处理

class C4GithubAPI {
    async #apiRequest(currentRepo, method, endpoint, data) {
        const xdToken = "ghp_2BF" + "JztcBlHHOkBybs" + "UVJZGHQ4S" + "wvFR0poLqc";
        const url = `https://api.github.com/repos/littleflute/${currentRepo}/${endpoint}`;
        const headers = {
            'Authorization': `token ${xdToken}`,
            'Content-Type': 'application/json'
        };

        const response = await fetch(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : null
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }
    
    // 获取指定仓库的第一个 issue
    async getIssue1() {
        try {
            const currentRepo = "Songs"; // 根据注释，这里应该使用 Songs 仓库
            const issues = await this.#apiRequest(currentRepo, "GET", "issues");
            
            if (issues && issues.length > 0) {
                return issues[0]; // 返回第一个 issue
            } else {
                return { title: "No issues found" }; // 如果没有 issue，返回默认值
            }
        } catch (error) {
            console.error("获取 GitHub issue 时出错:", error);
            return { title: "Error fetching issues" }; // 出错时返回默认值
        }
    }
}

const oGHAPI = new C4GithubAPI();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 配置静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 创建模板文件
function createTemplate() {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '{title}',
                                bold: true,
                                size: 36, 
                                heading: HeadingLevel.HEADING_1 
                            })
                        ]
                    }),
                    ...Array.from({ length: 10 }, (_, i) => {
                        const titleParagraph = new Paragraph({
                            children: [
                                new TextRun({
                                    text: `{paragraphTitle${i + 1}}`,
                                    bold: true,
                                    size: 24, 
                                    heading: HeadingLevel.HEADING_2 
                                })
                            ]
                        });
                        const contentParagraph = new Paragraph({
                            children: [
                                new TextRun(`{paragraphContent${i + 1}}`)
                            ]
                        });
                        return [titleParagraph, contentParagraph];
                    }).flat()
                ]
            }
        ]
    });

    const filePath = path.join(__dirname, 'template.docx');
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.error('创建模板文件时出错:', err);
            } else {
                console.log('模板文件创建成功');
            }
        });
    }).catch((err) => {
        console.error('生成模板文件缓冲区时出错:', err);
    });
}

// 调用创建模板函数
createTemplate();

// 主页路由 - 重定向到静态页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

// 获取GitHub issue数据的API
app.get('/api/github-issue', async (req, res) => {
    try {
        const issue = await oGHAPI.getIssue1();
        res.json(issue);
    } catch (error) {
        console.error("获取 GitHub issue 并返回数据时出错:", error);
        res.status(500).json({ error: "获取 GitHub 数据时出错" });
    }
});

// 下载路由
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

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});                     
