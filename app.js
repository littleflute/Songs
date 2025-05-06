const express = require('express');
const app = express();
const port = 3000;

// 配置静态文件中间件（核心修改）
app.use(express.static('public'));  // 自动提供public目录下的静态资源

// 启动服务器（可选的监听地址改进）
app.listen(port, '0.0.0.0', () => {  // 添加'0.0.0.0'允许外部访问
    console.log(`服务器已启动，访问地址：http://localhost:${port}/index.html`);
    console.log(`局域网访问地址：http://${getIPAddress()}:${port}/index.html`);
});

// 辅助函数：获取本机IP地址（可选）
function getIPAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (const alias of iface) {
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}
/**
 * 升级
 * 设计一个类重构代码
 * 
 * */