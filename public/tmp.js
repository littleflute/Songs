function initWindowDrag(windowId) {
    const window = document.getElementById(windowId);
    const header = document.getElementById(`${windowId}Header`);
    const pos = windowId === 'canvasWindow' ? canvasWindowPos : jsonWindowPos;

    let isDragging = false;
    let startX, startY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        // 获取当前窗口实际位置
        const rect = window.getBoundingClientRect();
        pos.x = rect.left;
        pos.y = rect.top;

        // 清除transform并改用固定定位
        window.style.position = 'fixed';
        window.style.left = `${pos.x}px`;
        window.style.top = `${pos.y}px`;
        window.style.transform = 'none';
        window.style.transition = 'none';

        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // 计算新位置并限制边界
        const newX = Math.max(0, Math.min(pos.x + dx, window.innerWidth - window.offsetWidth));
        const newY = Math.max(0, Math.min(pos.y + dy, window.innerHeight - window.offsetHeight));

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
    });
}