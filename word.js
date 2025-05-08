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
                            new TextRun('{htmlContent}')
                        ]
                    })
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
        <form action="/download" method="post">
            <label for="content">输入要插入到 Word 文件的内容:</label><br>
            <textarea id="content" name="content" rows="4" cols="50"></textarea><br>
            <input type="submit" value="生成并下载 Word 文件">
        </form>
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
            htmlContent: req.body.content
        };

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
 * update the home page, let me can edit and creat a new word file
 */