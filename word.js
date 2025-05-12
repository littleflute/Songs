const express = require('express');
const app = express();
const port = 3000;
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const bodyParser = require('body-parser');

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
        const title1 = i1.title;
        const content1 = i1.body || ''; // 使用issue的内容作为默认值，如果没有内容则为空字符串
        const docTitle = "Word 测试文章";
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>生成 Word 文件</title>
                <style>
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
                </style>
            </head>
            <body>
                <form action="/download" method="post">
                    <label for="title">文章标题:</label><br>
                    <input type="text" id="title" name="title" value="${docTitle}"  required><br>
                    <div id="paragraphs">
                        <div class="paragraph">
                            <label for="paragraphTitle1">段落标题 1:</label><br>
                            <input type="text" id="paragraphTitle1" name="paragraphTitle1" value="${title1}" required><br>
                            <label for="paragraphContent1">段落内容 1:</label><br>
                            <textarea id="paragraphContent1" name="paragraphContent1" rows="4" cols="50" required>${content1}</textarea><br>
                        </div>
                    </div>
                    <button type="button" onclick="addParagraph()">添加新段落</button><br>
                    <input type="submit" value="生成并下载 Word 文件">
                </form>
                <!-- 固定工具栏 -->
                <div id="toolbar">
                    <button onclick="toggleWindow()">切换窗口</button>
                </div>
                <!-- 可移动窗口 -->
                <div id="movableWindow">
                    <div id="windowHeader">拖动此处移动窗口</div>
                    <div>窗口内容...</div>
                </div>
                <script>
                    let paragraphCount = 1;
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
                        \`;
                        paragraphsDiv.appendChild(newParagraph);
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
                        movableWindow.style.display = movableWindow.style.display === 'none' ? 'block' : 'none';
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
        res.send(html);
    } catch (error) {
        console.error("获取 issue 并渲染页面时出错:", error);
        res.status(500).send("获取 GitHub 数据时出错");
    }
});
// 下载路由
app.post('/download', (req, res) => {
    try {
        const content = fs.readFileSync(path.resolve(__dirname, 'template.docx'), 'binary');
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);

        const data = {
            title: req.body.title
        };

        for (let i = 1; i <= 10; i++) {
            const titleKey = `paragraphTitle${i}`;
            const contentKey = `paragraphContent${i}`;
            if (req.body[titleKey] && req.body[contentKey]) {
                data[titleKey] = req.body[titleKey];
                data[contentKey] = req.body[contentKey];
            }
        }

        doc.render(data);

        const buf = doc.getZip().generate({ type: 'nodebuffer' });
        const filePath = path.join(__dirname, 'sample1.docx');
        fs.writeFileSync(filePath, buf);

        res.setHeader('Content-disposition', 'attachment; filename=sample1.docx');
        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        const filestream = fs.createReadStream(filePath);
        filestream.pipe(res);
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
 *  let paragraphContent1 has default value as i1.body
 */