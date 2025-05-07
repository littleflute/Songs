const express = require('express');
const puppeteer = require('puppeteer');
const htmlDocx = require('html-docx-js');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3003;

app.get('/', (req, res) => {
    const page = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>下载 Word 文档</title>
</head>
<body>
    <a href="/html2word">点击下载汪峰《人海》专辑分析 Word 文档</a>
</body>
</html>
    `;
    res.send(page);
});

app.get('/html2word', async (req, res) => {
    try {
        // 定义 HTML 内容
        const htmlContent = '<p>test text.</p>';

        // 将 HTML 转换为 DOCX
        const docx = htmlDocx.asBlob(htmlContent);

        // 设置响应头
        res.setHeader('Content-Disposition', 'attachment; filename=w1.docx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        // 发送 DOCX 文件
        res.send(Buffer.from(await docx.arrayBuffer()));
    } catch (error) {
        console.error('Error generating Word document:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
    
     
/**
 *  code12 
 */