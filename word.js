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

class C4TestPage{
    #drawingCode(){
        let html = `// Canvas 绘图逻辑
const canvas = document.getElementById('id_4_canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// 初始化画布样式
ctx.strokeStyle = '#000000';
ctx.lineWidth = 2;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

// 事件监听器
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    e.stopPropagation(); // 阻止触发窗口拖动
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);}`;
      return html;
    }
    
    #drawCss(){
        let html = `#id_4_div_canvas_wrap {
    margin-top: 10px;
}

#id_4_canvas {
    touch-action: none; /* 防止移动端页面滚动 */
}`;
       return html;
    }
    
    makeHtml(docTitle,title1,content1) {
        let jsDraw = this.#drawingCode();
        let cssDraw = this.#drawCss();
        let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>生成 Word 文件</title>
                <style>
                    ${cssDraw}
                    .paragraph {
                        margin-bottom: 10px;
                    }
                    #toolbar {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: #eee;
                        padding: 10px;
                        text-align: center;
                        z-index: 1000;
                    }
                    #movableWindow {
                        display: none;
                        position: fixed;
                        background: white;
                        border: 1px solid #000;
                        padding: 20px;
                        cursor: move;
                        z-index: 1001;
                        width: 300px;
                        height: 200px;
                    }
                    #windowHeader {
                        cursor: move;
                        padding: 5px;
                        background: #ddd;
                        margin-bottom: 10px;
                    }
                    .canvas-image-preview {
                        max-width: 100%;
                        margin-top: 5px;
                        border: 1px solid #ccc;
                    }
                </style>
            </head>
            <body>
                <form action="/download" method="post" id="mainForm">
                    <input type="hidden" id="canvasImages" name="canvasImages" value="">
                    <label for="title">文章标题:</label><br>
                    <input type="text" id="title" name="title" value="${docTitle}"  required><br>
                    <div id="paragraphs">
                        <div class="paragraph">
                            <label for="paragraphTitle1">段落标题 1:</label><br>
                            <input type="text" id="paragraphTitle1" name="paragraphTitle1" value="${title1}" required><br>
                            <label for="paragraphContent1">段落内容 1:</label><br>
                            <textarea id="paragraphContent1" name="paragraphContent1" rows="4" cols="50" required>${content1}</textarea><br>
                            <div id="paragraph1Images"></div>
                        </div>
                    </div>
                    <button type="button" onclick="addParagraph()">添加新段落</button><br>
                    <button type="button" id="id_4_btn_add_pic_from_id_4_canvas" onclick="addCanvasImage()">添加画布图片</button><br>
                    <input type="submit" value="生成并下载 Word 文件">
                </form>
                <!-- 固定工具栏 -->
                <div id="toolbar">
                    <button id="id_4_toggle_window" onclick="toggleWindow()">切换窗口</button>
                </div>
                <!-- 可移动窗口 -->
                <div id="movableWindow">
                    <div id="windowHeader">拖动此处移动窗口</div>
                    <div id="id_4_div_canvas_wrap">
                        <canvas 
                            id="id_4_canvas" 
                            width="400" 
                            height="150"
                            style="border: 1px solid #000; background: white;"
                        ></canvas>
                        <button onclick="clearCanvas()">清除画布</button>
                    </div>
                </div>
                <script>
                    ${jsDraw}
                    let paragraphCount = 1;
                    let canvasImageCount = 0;
                    const canvasImages = [];
                    
                    function addParagraph() {
                        paragraphCount++;
                        const paragraphsDiv = document.getElementById('paragraphs');
                        const newParagraph = document.createElement('div');
                        newParagraph.classList.add('paragraph');
                        newParagraph.innerHTML = \`
                            <label for="paragraphTitle\${paragraphCount}">段落标题 \${paragraphCount}:</label><br>
                            <input type="text" id="paragraphTitle\${paragraphCount}" name="paragraphTitle\${paragraphCount}" required><br>
                            <label for="paragraphContent\${paragraphCount}">段落内容 \${paragraphCount}:</label><br>
                            <textarea id="paragraphContent\${paragraphCount}" name="paragraphContent\${paragraphCount}" rows="4" cols="50" required></textarea><br>
                            <div id="paragraph\${paragraphCount}Images"></div>
                        \`;
                        paragraphsDiv.appendChild(newParagraph);
                    }
                    
                    function addCanvasImage() {
                        const canvas = document.getElementById('id_4_canvas');
                        const imageDataUrl = canvas.toDataURL('image/png');
                        
                        if (!imageDataUrl) {
                            alert('画布为空，无法添加图片');
                            return;
                        }
                        
                        // 获取当前活动段落（最后一个段落）
                        const activeParagraphNum = document.querySelectorAll('.paragraph').length;
                        const targetDiv = document.getElementById(\`paragraph\${activeParagraphNum}Images\`);
                        
                        // 为图片生成唯一ID
                        const imageId = \`canvasImage\${canvasImageCount++}\`;
                        
                        // 添加预览
                        const previewImg = document.createElement('img');
                        previewImg.src = imageDataUrl;
                        previewImg.className = 'canvas-image-preview';
                        previewImg.id = imageId;
                        
                        // 添加删除按钮
                        const deleteBtn = document.createElement('button');
                        deleteBtn.textContent = '删除图片';
                        deleteBtn.onclick = function() {
                            targetDiv.removeChild(previewImg);
                            targetDiv.removeChild(deleteBtn);
                            // 从数组中移除
                            const index = canvasImages.findIndex(img => img.id === imageId);
                            if (index !== -1) {
                                canvasImages.splice(index, 1);
                            }
                            updateCanvasImagesInput();
                        };
                        
                        targetDiv.appendChild(previewImg);
                        targetDiv.appendChild(deleteBtn);
                        
                        // 保存图片数据
                        canvasImages.push({
                            id: imageId,
                            dataUrl: imageDataUrl,
                            paragraph: activeParagraphNum
                        });
                        
                        updateCanvasImagesInput();
                    }
                    
                    function updateCanvasImagesInput() {
                        const canvasImagesInput = document.getElementById('canvasImages');
                        canvasImagesInput.value = JSON.stringify(canvasImages);
                    }

                    // 窗口切换和拖动逻辑
                    let isDragging = false;
                    let startX, startY, initialX, initialY;
                    const movableWindow = document.getElementById('movableWindow');
                    const windowHeader = document.getElementById('windowHeader');

                    windowHeader.addEventListener('mousedown', (e) => {
                        isDragging = true;
                        startX = e.clientX;
                        startY = e.clientY;
                        initialX = movableWindow.offsetLeft;
                        initialY = movableWindow.offsetTop;
                        e.preventDefault();
                    });

                    document.addEventListener('mousemove', (e) => {
                        if (isDragging) {
                            const dx = e.clientX - startX;
                            const dy = e.clientY - startY;
                            movableWindow.style.left = \`\${initialX + dx}px\`;
                            movableWindow.style.top = \`\${initialY + dy}px\`;
                        }
                    });

                    document.addEventListener('mouseup', () => {
                        isDragging = false;
                    });

                    function toggleWindow() {
                        const currentDisplay = window.getComputedStyle(movableWindow).display;
                        movableWindow.style.display = currentDisplay === 'none' ? 'block' : 'none';
                        // 初始化窗口位置（例如居中）
                        if (movableWindow.style.display === 'block') {
                            movableWindow.style.left = '50%';
                            movableWindow.style.top = '50%';
                            movableWindow.style.transform = 'translate(-50%, -50%)';
                        }
                    }
                </script>
            </body>
            </html>
        `;
        return html;
    }
}

class C4GithubAPI{
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

const oTestPage = new C4TestPage();
const oGHAPI = new C4GithubAPI();

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/test', async (req, res) => {
    try {
        const i1 = await oGHAPI.getIssue1();
        const title1 = i1.title|| '使用issue的内容作为默认值，如果没有内容则为空 ';
        const content1 = i1.body || '使用issue的内容作为默认值，如果没有内容则为空字符串';  
        const docTitle = "Word 测试文章";
        const html = oTestPage.makeHtml(docTitle,title1,content1);
        res.send(html);
    } catch (error) {
        console.error("获取 issue 并渲染页面时出错:", error);
        res.status(500).send("获取 GitHub 数据时出错");
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
        res.setHeader('Content-disposition', 'attachment; filename=sample1.docx');
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
/**
 *   
 *  code id_4_btn_add_pic_from_id_4_canvas
 */