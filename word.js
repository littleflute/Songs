const express = require('express');
const app = express();
const port = 3000;
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// 创建模板文件
function createTemplate() {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun('{title}')
                        ]
                    }),
                    ...Array.from({ length: 10 }, (_, i) => new Paragraph({
                        children: [
                            new TextRun(`{paragraphTitle${i + 1}}`),
                            new TextRun('\n'),
                            new TextRun(`{paragraphContent${i + 1}}`)
                        ]
                    }))
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

// 主页路由
app.get('/', (req, res) => {
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
            </style>
        </head>
        <body>
            <form action="/download" method="post">
                <label for="title">文章标题:</label><br>
                <input type="text" id="title" name="title" required><br>
                <div id="paragraphs">
                    <div class="paragraph">
                        <label for="paragraphTitle1">段落标题 1:</label><br>
                        <input type="text" id="paragraphTitle1" name="paragraphTitle1" required><br>
                        <label for="paragraphContent1">段落内容 1:</label><br>
                        <textarea id="paragraphContent1" name="paragraphContent1" rows="4" cols="50" required></textarea><br>
                    </div>
                </div>
                <button type="button" onclick="addParagraph()">添加新段落</button><br>
                <input type="submit" value="生成并下载 Word 文件">
            </form>
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
            </script>
        </body>
        </html>
    `;
    res.send(html);
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
            if (req.body[`paragraphTitle${i}`] && req.body[`paragraphContent${i}`]) {
                data[`paragraphTitle${i}`] = req.body[`paragraphTitle${i}`];
                data[`paragraphContent${i}`] = req.body[`paragraphContent${i}`];
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
 *  文章的题目,段落标题。 应该醒目
 */