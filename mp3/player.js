class C4Player {
    constructor() {
        this.wnd = null;
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.audio = new Audio();
        this.currentIndex = 0;
        this.playlist = [
            { name: "j_90.mp3", url: "j_90.mp3" },
            { name: "中产阶级 - 郑智化.mp3", url: "中产阶级 - 郑智化.mp3" },
            { name: "我的明天 - 郑智化.mp3", url: "我的明天 - 郑智化.mp3" },
            { name: "红河谷1.mp3", url: "红河谷1.mp3" }
        ];
        
        this.audio.addEventListener('ended', () => this.playNext());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        
        this.createWindow();
    }

    createWindow() {
        // 创建窗口容器
        this.wnd = document.createElement('div');
        this.wnd.style.display = 'none';
        this.wnd.style.position = 'fixed';
        this.wnd.style.zIndex = '1000';
        this.wnd.style.left = '20px';
        this.wnd.style.top = '20px';
        this.wnd.style.width = '400px';
        this.wnd.style.minHeight = '300px';
        this.wnd.style.backgroundColor = '#fff';
        this.wnd.style.border = '1px solid #ccc';
        this.wnd.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        this.wnd.style.borderRadius = '4px';
        this.wnd.style.overflow = 'hidden';
        
        // 创建标题栏
        const titleBar = document.createElement('div');
        titleBar.style.padding = '8px 16px';
        titleBar.style.backgroundColor = '#f0f0f0';
        titleBar.style.borderBottom = '1px solid #ddd';
        titleBar.style.cursor = 'move';
        titleBar.style.display = 'flex';
        titleBar.style.justifyContent = 'space-between';
        titleBar.style.alignItems = 'center';
        
        // 创建标题
        const title = document.createElement('span');
        title.textContent = '音乐播放器';
        title.style.fontWeight = 'bold';
        
        // 创建关闭按钮
        const closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.style.color = '#888';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = () => this.hideWnd();
        
        // 创建内容区域
        const playerContent = document.createElement('div');
        playerContent.style.padding = '16px';
        
        // 创建当前播放歌曲显示
        this.songTitle = document.createElement('div');
        this.songTitle.textContent = '未播放任何歌曲';
        this.songTitle.style.fontSize = '16px';
        this.songTitle.style.marginBottom = '10px';
        this.songTitle.style.textAlign = 'center';
        
        // 创建进度条容器
        const progressContainer = document.createElement('div');
        progressContainer.style.height = '4px';
        progressContainer.style.backgroundColor = '#eee';
        progressContainer.style.marginBottom = '15px';
        progressContainer.style.cursor = 'pointer';
        
        // 创建进度条
        this.progressBar = document.createElement('div');
        this.progressBar.style.height = '100%';
        this.progressBar.style.backgroundColor = '#3498db';
        this.progressBar.style.width = '0%';
        
        // 添加进度条点击事件
        progressContainer.addEventListener('click', (e) => {
            const duration = this.audio.duration;
            const progressWidth = progressContainer.clientWidth;
            const clickPosition = e.offsetX;
            const seekTime = (clickPosition / progressWidth) * duration;
            this.audio.currentTime = seekTime;
        });
        
        progressContainer.appendChild(this.progressBar);
        
        // 创建时间显示
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.style.fontSize = '12px';
        this.timeDisplay.style.color = '#666';
        this.timeDisplay.style.marginBottom = '15px';
        this.timeDisplay.style.display = 'flex';
        this.timeDisplay.style.justifyContent = 'space-between';
        this.timeDisplay.innerHTML = '<span id="current-time">0:00</span> / <span id="total-time">0:00</span>';
        
        // 创建控制按钮
        const controls = document.createElement('div');
        controls.style.display = 'flex';
        controls.style.justifyContent = 'center';
        controls.style.alignItems = 'center';
        controls.style.marginBottom = '15px';
        
        // 上一曲按钮
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '上一曲';
        prevBtn.style.margin = '0 5px';
        prevBtn.style.padding = '5px 10px';
        prevBtn.style.border = 'none';
        prevBtn.style.backgroundColor = '#f0f0f0';
        prevBtn.style.borderRadius = '3px';
        prevBtn.style.cursor = 'pointer';
        prevBtn.onclick = () => this.playPrev();
        
        // 播放/暂停按钮
        this.playPauseBtn = document.createElement('button');
        this.playPauseBtn.textContent = '播放';
        this.playPauseBtn.style.margin = '0 5px';
        this.playPauseBtn.style.padding = '5px 15px';
        this.playPauseBtn.style.border = 'none';
        this.playPauseBtn.style.backgroundColor = '#3498db';
        this.playPauseBtn.style.color = 'white';
        this.playPauseBtn.style.borderRadius = '3px';
        this.playPauseBtn.style.cursor = 'pointer';
        this.playPauseBtn.onclick = () => this.togglePlay();
        
        // 下一曲按钮
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '下一曲';
        nextBtn.style.margin = '0 5px';
        nextBtn.style.padding = '5px 10px';
        nextBtn.style.border = 'none';
        nextBtn.style.backgroundColor = '#f0f0f0';
        nextBtn.style.borderRadius = '3px';
        nextBtn.style.cursor = 'pointer';
        nextBtn.onclick = () => this.playNext();

        
        const sampleList1Btn = document.createElement('button');
        
        // 音量控制
        const volumeContainer = document.createElement('div');
        volumeContainer.style.display = 'flex';
        volumeContainer.style.alignItems = 'center';
        volumeContainer.style.marginBottom = '15px';
        
        const volumeIcon = document.createElement('span');
        volumeIcon.textContent = '音量:';
        volumeIcon.style.marginRight = '5px';
        
        this.volumeSlider = document.createElement('input');
        this.volumeSlider.type = 'range';
        this.volumeSlider.min = '0';
        this.volumeSlider.max = '1';
        this.volumeSlider.step = '0.1';
        this.volumeSlider.value = '0.7';
        this.volumeSlider.style.width = '100%';
        this.volumeSlider.oninput = () => this.setVolume();
        
        volumeContainer.appendChild(volumeIcon);
        volumeContainer.appendChild(this.volumeSlider);
        
        // 创建播放列表
        this.playlistContainer = document.createElement('div');
        this.playlistContainer.style.marginTop = '15px';
        
        // 组装控制区
        controls.appendChild(prevBtn);
        controls.appendChild(this.playPauseBtn);
        controls.appendChild(nextBtn);
        controls.appendChild(sampleList1Btn);
        
        // 组装内容区
        playerContent.appendChild(this.songTitle);
        playerContent.appendChild(progressContainer);
        playerContent.appendChild(this.timeDisplay);
        playerContent.appendChild(controls);
        playerContent.appendChild(volumeContainer);
        playerContent.appendChild(this.playlistContainer);
        
        // 初始化播放列表
        this.initPlaylist();
        
        // 组装窗口
        titleBar.appendChild(title);
        titleBar.appendChild(closeBtn);
        this.wnd.appendChild(titleBar);
        this.wnd.appendChild(playerContent);
        
        // 添加到文档
        document.body.appendChild(this.wnd);
        
        // 设置拖拽功能
        this.setupDraggable(titleBar);
        
        // 设置音量
        this.audio.volume = 0.7;
    }
    
    // 初始化播放列表
    initPlaylist() {
        this.playlistContainer.innerHTML = '';
        
        const playlistTitle = document.createElement('div');
        playlistTitle.textContent = '播放列表';
        playlistTitle.style.fontWeight = 'bold';
        playlistTitle.style.marginBottom = '5px';
        this.playlistContainer.appendChild(playlistTitle);
        
        const listContainer = document.createElement('div');
        listContainer.style.maxHeight = '150px';
        listContainer.style.overflowY = 'auto';
        
        this.playlist.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.textContent = song.name;
            songItem.style.padding = '5px';
            songItem.style.borderBottom = '1px solid #eee';
            songItem.style.cursor = 'pointer';
            
            if (index === this.currentIndex) {
                songItem.style.backgroundColor = '#e8f4fa';
            }
            
            songItem.addEventListener('click', () => {
                this.currentIndex = index;
                this.loadSong();
                this.play();
                this.initPlaylist();
            });
            
            listContainer.appendChild(songItem);
        });
        
        this.playlistContainer.appendChild(listContainer);
    }
    
    // 加载歌曲
    loadSong() {
        const song = this.playlist[this.currentIndex];
        this.audio.src = song.url;
        this.songTitle.textContent = song.name;
        this.updateTimeDisplay();
    }
    
    // 播放
    play() {
        this.audio.play();
        this.playPauseBtn.textContent = '暂停';
    }
    
    // 暂停
    pause() {
        this.audio.pause();
        this.playPauseBtn.textContent = '播放';
    }
    
    // 切换播放/暂停状态
    togglePlay() {
        if (this.audio.paused) {
            if (this.audio.src === '') {
                if (this.playlist.length > 0) {
                    this.loadSong();
                    this.play();
                }
            } else {
                this.play();
            }
        } else {
            this.pause();
        }
    }
    
    // 播放上一曲
    playPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadSong();
        this.play();
        this.initPlaylist();
    }
    
    // 播放下一曲
    playNext() {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.loadSong();
        this.play();
        this.initPlaylist();
    }
    
    // 设置音量
    setVolume() {
        this.audio.volume = this.volumeSlider.value;
    }
    
    // 更新进度条
    updateProgress() {
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressBar.style.width = percent + '%';
        this.updateTimeDisplay();
    }
    
    // 更新时间显示
    updateTimeDisplay() {
        const currentMinutes = Math.floor(this.audio.currentTime / 60);
        const currentSeconds = Math.floor(this.audio.currentTime % 60);
        const totalMinutes = Math.floor(this.audio.duration / 60) || 0;
        const totalSeconds = Math.floor(this.audio.duration % 60) || 0;
        
        document.getElementById('current-time').textContent = 
            `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        document.getElementById('total-time').textContent = 
            `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }
    
    // 设置拖拽功能
    setupDraggable(element) {
        // 鼠标按下事件
        element.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.offsetX = e.clientX - this.wnd.getBoundingClientRect().left;
            this.offsetY = e.clientY - this.wnd.getBoundingClientRect().top;
            
            // 提高层级
            this.wnd.style.zIndex = '1001';
            
            // 阻止事件冒泡
            e.stopPropagation();
        });
        
        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const x = e.clientX - this.offsetX;
                const y = e.clientY - this.offsetY;
                
                // 限制窗口在可视区域内
                const maxX = window.innerWidth - this.wnd.offsetWidth;
                const maxY = window.innerHeight - this.wnd.offsetHeight;
                
                this.wnd.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
                this.wnd.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
            }
        });
        
        // 鼠标释放事件
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
    }

    toggleWnd() {
        if (this.wnd.style.display === 'none') {
            this.showWnd();
        } else {
            this.hideWnd();
        }
    }

    showWnd() {
        this.wnd.style.display = 'block';
    }

    hideWnd() {
        this.wnd.style.display = 'none';
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
 * code sampleList1Btn
 * return all new code
 */