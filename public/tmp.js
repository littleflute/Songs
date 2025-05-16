 
    // 新增的全局变量用于存储窗口位置
    let canvasWindowPos = { x: null, y: null };
    let jsonWindowPos = { x: null, y: null };
    let isDragging = false;

    // 初始化窗口拖动功能（在DOM加载时执行）
    function initWindowDrag(windowId) {
        const window = document.getElementById(windowId);
        const header = document.getElementById(`${windowId}Header`);
        const pos = windowId === 'canvasWindow' ? canvasWindowPos : jsonWindowPos;

        let startX, startY, initialX, initialY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            // 获取当前窗口位置
            initialX = pos.x !== null ? pos.x : window.offsetLeft;
            initialY = pos.y !== null ? pos.y : window.offsetTop;

            // 禁用过渡效果
            window.style.transition = 'none';
            window.classList.add('scale-[1.01]');
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            // 计算新位置并限制边界
            const newX = Math.max(0, Math.min(initialX + dx, window.innerWidth - window.offsetWidth));
            const newY = Math.max(0, Math.min(initialY + dy, window.innerHeight - window.offsetHeight));

            // 实时更新位置
            window.style.left = `${newX}px`;
            window.style.top = `${newY}px`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;

            // 保存最新位置
            pos.x = parseInt(window.style.left);
            pos.y = parseInt(window.style.top);

            // 恢复过渡效果
            window.style.transition = '';
            window.classList.remove('scale-[1.01]');
        });
    }

    // 修改后的窗口切换函数
    function toggleWindow(windowId) {
        const window = document.getElementById(windowId);
        const overlay = document.getElementById('overlay');
        const pos = windowId === 'canvasWindow' ? canvasWindowPos : jsonWindowPos;

        if (window.style.display === 'block') {
            // 关闭窗口的动画
            window.classList.add('opacity-0', 'scale-95');
            overlay.classList.add('opacity-0');
            setTimeout(() => {
                window.style.display = 'none';
                overlay.style.display = 'none';
            }, 300);
        } else {
            // 设置初始位置
            if (pos.x !== null && pos.y !== null) {
                window.style.left = `${pos.x}px`;
                window.style.top = `${pos.y}px`;
                window.style.transform = 'none';
            } else {
                window.style.left = '50%';
                window.style.top = '50%';
                window.style.transform = 'translate(-50%, -50%)';
            }

            // 打开窗口的动画
            window.style.display = 'block';
            overlay.style.display = 'block';
            setTimeout(() => {
                window.classList.remove('opacity-0', 'scale-95');
                overlay.classList.remove('opacity-0');
            }, 10);

            // 初始化画布（仅针对canvas窗口）
            if (windowId === 'canvasWindow' && !isCanvasInitialized) {
                initCanvas();
            }
        }
    }

    // 在DOM加载完成后初始化拖动功能
    document.addEventListener('DOMContentLoaded', () => {
        initWindowDrag('canvasWindow');
        initWindowDrag('jsonWindow');
        updateWordDataJson();
    }); 