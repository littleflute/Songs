class C4Player {
    constructor() {
        this.modal = null;
        this.createModal();
    }

    createModal() {
        // 创建模态窗口容器
        this.modal = document.createElement('div');
        this.modal.style.display = 'none';
        this.modal.style.position = 'fixed';
        this.modal.style.zIndex = '1000';
        this.modal.style.left = '0';
        this.modal.style.top = '0';
        this.modal.style.width = '100%';
        this.modal.style.height = '100%';
        this.modal.style.overflow = 'auto';
        this.modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
        
        // 创建模态窗口内容
        const content = document.createElement('div');
        content.style.backgroundColor = '#fff';
        content.style.margin = '15% auto';
        content.style.padding = '20px';
        content.style.border = '1px solid #888';
        content.style.width = '80%';
        content.style.maxWidth = '500px';
        content.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)';
        content.style.animationName = 'animatetop';
        content.style.animationDuration = '0.4s';
        
        // 创建关闭按钮
        const closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.style.color = '#aaa';
        closeBtn.style.float = 'right';
        closeBtn.style.fontSize = '28px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = () => this.hideModal();
        
        // 创建标题
        const title = document.createElement('h2');
        title.textContent = '播放器窗口';
        title.style.marginTop = '0';
        
        // 创建内容区域
        const playerContent = document.createElement('div');
        playerContent.textContent = '这里是播放器内容';
        
        // 组装模态窗口
        content.appendChild(closeBtn);
        content.appendChild(title);
        content.appendChild(playerContent);
        this.modal.appendChild(content);
        
        // 添加到文档
        document.body.appendChild(this.modal);
        
        // 点击模态窗口外部关闭
        this.modal.onclick = (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        };
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes animatetop {
                from {top: -300px; opacity: 0}
                to {top: 0; opacity: 1}
            }
        `;
        document.head.appendChild(style);
    }

    toggleWnd() {
        if (this.modal.style.display === 'none') {
            this.showModal();
        } else {
            this.hideModal();
        }
    }

    showModal() {
        this.modal.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
    }
}

// 确保DOM完全加载后再初始化
document.addEventListener('DOMContentLoaded', () => {
    const oPlayer = new C4Player();
    const btn = document.getElementById("id_4_btn_toggle_playerWnd");
    if (btn) {
        btn.onclick = () => oPlayer.toggleWnd();
    }
});

/**
 * 升级以上代码，不要生成 html 文件
 * 模态窗口 改为 非模态窗口
 * id_4_btn_toggle_playerWnd 显示或隐藏窗口， 
 * return all new code
 */