const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, WidthType } = require('docx');

class C4UI{
    constructor(){
        console.log("C4UI: -----------------------")
        this.version = "C4UI_v0.11";
    }
    version(){
        return this.version;
    }
    async run(req, res){
    
        const oAPI = new C4GithubAPI();
        const oPage = new C4TestPage();
    
        console.log("oUI.run:=====" + Date())
        
        const issues = await oAPI.getIssues(3);

        const i1 = await oAPI.getIssue1();
        const title1 = i1.title|| '使用issue的内容作为默认值，如果没有内容则为空 ';
        const content1 = i1.body || '使用issue的内容作为默认值，如果没有内容则为空字符串';  
        const docTitle = "Word 测试文章";
        const html =   oPage.makeHtml(docTitle,title1,content1,issues);
        res.send(html);
    }
}
var e = new C4UI();

module.exports = e;

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
    async getIssues(num = 3) {
        try {
            const currentRepo = "Songs";
            const issues = await this.#apiRequest(currentRepo, "GET", `issues?per_page=${num}`);
            return issues.slice(0, num);
        } catch (error) {
            console.error("获取 GitHub issues 时出错:", error);
            return [];
        }
    }
}

class C4TestPage{
    constructor(){
        this.#createTemplate();
    }
    #getSample3Code(){ 
        let funBody = `const canvas = document.getElementById('id_4_canvas');
    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 设置颜色
    const dogColor = '#8B4513'; // 棕色
    const noseColor = '#FF69B4'; // 粉色
    const eyeColor = '#000000'; // 黑色
    
    // 绘制头部
    ctx.beginPath();
    ctx.arc(200, 75, 50, 0, Math.PI * 2);
    ctx.fillStyle = dogColor;
    ctx.fill();
    
    // 绘制耳朵
    ctx.beginPath();
    ctx.moveTo(160, 40);
    ctx.lineTo(140, 20);
    ctx.lineTo(170, 30);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(240, 40);
    ctx.lineTo(260, 20);
    ctx.lineTo(230, 30);
    ctx.closePath();
    ctx.fill();
    
    // 绘制眼睛
    ctx.beginPath();
    ctx.arc(180, 65, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(220, 65, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(183, 67, 4, 0, Math.PI * 2);
    ctx.fillStyle = eyeColor;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(223, 67, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // 绘制鼻子
    ctx.beginPath();
    ctx.arc(200, 85, 15, 0, Math.PI);
    ctx.fillStyle = noseColor;
    ctx.fill();
    
    // 绘制嘴巴
    ctx.beginPath();
    ctx.arc(200, 90, 10, 0, Math.PI);
    ctx.strokeStyle = eyeColor;
    ctx.stroke();
    
    // 绘制身体
    ctx.beginPath();
    ctx.ellipse(200, 150, 60, 40, 0, 0, Math.PI * 2);
    ctx.fillStyle = dogColor;
    ctx.fill();
    
    // 绘制腿
    ctx.beginPath();
    ctx.rect(170, 180, 10, 30);
    ctx.rect(195, 180, 10, 30);
    ctx.rect(215, 180, 10, 30);
    ctx.rect(240, 180, 10, 30);
    ctx.fill();
    
    // 绘制尾巴
    ctx.beginPath();
    ctx.moveTo(260, 140);
    ctx.bezierCurveTo(280, 130, 290, 150, 300, 140);
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // 添加文字
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText('可爱的小狗', 150, 220);`;
        let r =`function drawDog() {
                ${funBody}
        }
    
        `;

        let html = `${r}
        document.getElementById('id_4_btn_sample3').addEventListener('click', function() {
    document.getElementById('id_4_textarea').value = "drawDog()";
});   `;

        return html;
    } 
    #drawingCode(){ 
        let jsDrawDog = this.#getSample3Code();
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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
                // 绑定样本按钮点击事件 
document.getElementById('id_4_btn_sample1').addEventListener('click', drawSample1); 
function drawSample1() { 
            const canvas = document.getElementById('id_4_canvas');
            const ctx = canvas.getContext('2d');
            
            // 清空画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 树干
            ctx.beginPath();
            ctx.rect(180, 100, 40, 100);
            ctx.fillStyle = '#8B4513'; // 棕色
            ctx.fill();
            
            // 树叶（三角形）
            ctx.beginPath();
            ctx.moveTo(200, 20);
            ctx.lineTo(140, 100);
            ctx.lineTo(260, 100);
            ctx.closePath();
            ctx.fillStyle = '#228B22'; // 深绿色
            ctx.fill();
            
            // 第二层树叶
            ctx.beginPath();
            ctx.moveTo(200, 40);
            ctx.lineTo(150, 120);
            ctx.lineTo(250, 120);
            ctx.closePath();
            ctx.fill();
            
            // 第三层树叶
            ctx.beginPath();
            ctx.moveTo(200, 60);
            ctx.lineTo(160, 140);
            ctx.lineTo(240, 140);
            ctx.closePath();
            ctx.fill();
            
            // 太阳
            ctx.beginPath();
            ctx.arc(320, 40, 30, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700'; // 金色
            ctx.fill();
            
            // 太阳光芒
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI / 4) * i;
                const x1 = 320 + Math.cos(angle) * 45;
                const y1 = 40 + Math.sin(angle) * 45;
                const x2 = 320 + Math.cos(angle) * 60;
                const y2 = 40 + Math.sin(angle) * 60;
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#FFD700';
                ctx.stroke();
            }
            
            // 树标签
            ctx.fillStyle = '#000';
            ctx.font = '16px Arial';
            ctx.fillText('示例树', 170, 220);  
         
    }
document.getElementById('id_4_btn_sample2').addEventListener('click', drawGreatWallSample); 
function drawGreatWallSample() {
    const canvas = document.getElementById('id_4_canvas');
    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景
    ctx.fillStyle = '#87CEEB'; // 天空蓝
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制山脉
    ctx.beginPath();
    ctx.fillStyle = '#2F4F4F';
    ctx.moveTo(0, 150);
    ctx.lineTo(50, 100);
    ctx.lineTo(100, 120);
    ctx.lineTo(150, 90);
    ctx.lineTo(200, 110);
    ctx.lineTo(250, 80);
    ctx.lineTo(300, 100);
    ctx.lineTo(350, 70);
    ctx.lineTo(400, 100);
    ctx.lineTo(400, 150);
    ctx.closePath();
    ctx.fill();

    // 绘制长城主体
    ctx.beginPath();
    ctx.strokeStyle = '#8B4513'; // 砖红色
    ctx.lineWidth = 8;
    ctx.moveTo(0, 130);
    ctx.lineTo(50, 110);
    ctx.lineTo(100, 130);
    ctx.lineTo(150, 100);
    ctx.lineTo(200, 120);
    ctx.lineTo(250, 90);
    ctx.lineTo(300, 110);
    ctx.lineTo(350, 80);
    ctx.lineTo(400, 110);
    ctx.stroke();

    // 绘制烽火台
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(180, 70, 40, 60);
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.arc(200, 60, 15, 0, Math.PI, true);
    ctx.fill();
    
    // 绘制城垛
    for(let x = 0; x < 400; x += 20) {
        ctx.fillRect(x, 122, 10, 8);
    }

    // 绘制树木
    function drawTree(x, y) {
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x-15, y+30);
        ctx.lineTo(x+15, y+30);
        ctx.closePath();
        ctx.fill();
    }
    drawTree(320, 80);
    drawTree(280, 90);
    drawTree(60, 100);

    // 添加文字
    ctx.fillStyle = '#FFD700';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('万里长城欢迎您', canvas.width/2, 50);
} 
 ${jsDrawDog} 
 `;
      return html;
    }
    
    #drawCss(){
        let html = `
            #id_4_div_canvas_wrap {
                margin-top: 10px;
            }

            #id_4_canvas {
                touch-action: none; /* 防止移动端页面滚动 */
            }
            /* 添加按钮高亮样式 */
            .highlighted {
                background-color: #4CAF50;
                color: white;
            }
        `;
       return html;
    }
    
    makeHtml(docTitle,title1,content1,issues) {
        let jsDraw = this.#drawingCode();
        let cssDraw = this.#drawCss();
        let div4Wnd = this.#createWnd();
        let jsLoadIssues = this.#loadIssuesCode(issues);
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
                    #id_4_toolbar {
                        position: fixed;
                        top: 0;
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
                <div style="padding-top: 60px;"> <!-- 新增顶部内边距，防止内容被工具栏覆盖 -->
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
                        <button type="button" id="id_4_btn_toggle_json_wnd" onclick="toggleJsonWindow()">jsonWnd</button><br>
                        <input type="submit" value="生成并下载 Word 文件">
                    </form>
                </div>
                <!-- 固定工具栏 -->
                <div id="id_4_toolbar">
                    <button id="id_4_toggle_window" onclick="toggleWindow()">切换窗口</button>
                </div>
                ${div4Wnd}
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
                    
                    // 修复jsonWnd按钮的点击事件
                    function toggleJsonWindow() {
                        // 这里可以实现json窗口的逻辑
                        alert('JSON窗口功能将在此处实现');
                    }
                    
                    // 执行textarea中代码的功能
                    document.getElementById('id_4_btn_run_from_ta').addEventListener('click', runCodeFromTextarea);
                    
                    function runCodeFromTextarea() {
                        try {
                            const code = document.getElementById('id_4_textarea').value;
                            const canvas = document.getElementById('id_4_canvas');
                            const ctx = canvas.getContext('2d');
                            
                            // 保存当前画布状态
                            const tempCanvas = document.createElement('canvas');
                            tempCanvas.width = canvas.width;
                            tempCanvas.height = canvas.height;
                            const tempCtx = tempCanvas.getContext('2d');
                            tempCtx.drawImage(canvas, 0, 0);
                            
                            // 清空画布
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            
                            // 创建沙箱环境执行代码
                            const sandbox = {
                                ctx: ctx,
                                canvas: canvas,
                                clearCanvas: clearCanvas,
                                alert: (msg) => { window.alert("代码输出:  " + msg); }
                            };
                            
                            // 使用with语句创建沙箱作用域
                            with(sandbox) {
                                new Function(code)();
                            }
                            
                        } catch (error) {
                            alert("执行代码时出错: " + error.message);
                            console.error(error);
                        }
                    }
                    
                    ${jsLoadIssues}
                    window.addEventListener('DOMContentLoaded', () => {
                        createIssueButtons(); 
                    });
                </script>
            </body>
            </html>
        `;
        return html;
    }
    #loadIssuesCode(issues){
        const data = JSON.stringify(issues);
        const html = `
                    const issuesData = ${data};
                    
                    // 页面加载时创建issue按钮
                    function createIssueButtons() {
                        const toolbar = document.getElementById('id_4_div_toolbar_load_issues');
                        issuesData.forEach((issue, index) => {
                            const btn = document.createElement('button');
                            btn.textContent = index;
                            btn.style.margin = '2px';
                            btn.onclick = () => { 
                                // 重置所有按钮样式
                                document.querySelectorAll('#id_4_div_toolbar_load_issues button').forEach(button => {
                                    button.classList.remove('highlighted');
                                });
                                
                                // 高亮当前按钮
                                btn.classList.add('highlighted');
                                
                                // 更新文本区域内容
                                document.getElementById('id_4_textarea').value = issue.title + " " + issue.body; 
                            };
                            toolbar.appendChild(btn);
                        });
                    }
                    `;
        return html;
    }
    #createWnd(){
        const html=`
                <!-- 可移动窗口 -->
                <div id="movableWindow">
                    <div id="windowHeader">drag here v0.11</div>
                    <div id="id_4_div_canvas_wrap">
                        <canvas 
                            id="id_4_canvas" 
                            width="400" 
                            height="150"
                            style="border: 1px solid #000; background: white;"
                        ></canvas>
                        <button onclick="clearCanvas()">清除画布</button>
                        <button id="id_4_btn_run_from_ta" style="border:solid 1px green;">执行代码</button>
                        <button id="id_4_btn_sample1">示例1</button> 
                        <button id="id_4_btn_sample2">示例2</button>
                        <button id="id_4_btn_sample3">示例3</button>
                    </div>
                    <div id="id_4_div_toolbar_load_issues">
                        <textarea id="id_4_textarea" value = "test..."></textarea>
                    </div>
                </div>
                `;
        return html;
    }
    #createTemplate() {
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
}    
 
/**
 * 升级
 * 实现：点击 id_4_btn_sample3，再点击 id_4_btn_run_from_ta, 在画布上画一只小狗
 * return all new code
 */