const express = require('express');
const app = express();
const port = 3000;

// 处理/index.html请求
app.get('/index.html', (req, res) => {
    // 获取当前时间并格式化
    const currentTime = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // 返回HTML响应
    res.send(`
        <html>
            <head>
                <title>当前时间</title>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                    }
                    .time-box {
                        padding: 20px 40px;
                        background-color: white;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        font-size: 24px;
                    }
                </style>
            </head>
            <body>
                <div class="time-box">
                    当前时间：${currentTime}
                </div>
            </body>
        </html>
    `);
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器已启动，访问地址：http://localhost:${port}/index.html`);
});