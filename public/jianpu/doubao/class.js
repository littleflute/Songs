class C4JpCanvas {
    constructor(canvas) {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                this.scale = 1;
                this.data = null;
                this.noteSymbols = ['1', '2', '3', '4', '5', '6', '7'];
                
                // 设置画布尺寸
                this.#resizeCanvas();
                
                // 监听窗口大小变化
                window.addEventListener('resize', () => this.#resizeCanvas());
    }
    // 设置乐谱数据
    setData(data) {
                this.data = data;
                this.#render();
    }
            
            // 调整画布尺寸
    #resizeCanvas() {
                const container = this.canvas.parentElement;
                const dpr = window.devicePixelRatio || 1;
                
                // 设置画布的实际像素尺寸
                this.canvas.width = container.clientWidth * dpr;
                this.canvas.height = (container.clientHeight || 600) * dpr;
                
                // 调整绘图上下文的缩放比例
                this.ctx.scale(dpr, dpr);
                
                // 设置画布的CSS显示尺寸
                this.canvas.style.width = '100%';
                this.canvas.style.height = '100%';
                
                // 如果有数据，重新渲染
                if (this.data) {
                    this.render();
                }
    }
            
    
            
            // 渲染乐谱
    #render() {
                if (!this.data) return;
                
                // 清除画布
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // 设置基础样式
                this.ctx.fillStyle = '#333';
                this.ctx.font = '24px Arial';
                this.ctx.textAlign = 'center';
                
                // 计算可用区域
                const margin = 40;
                const availableWidth = this.canvas.width / this.scale - 2 * margin;
                const availableHeight = this.canvas.height / this.scale - 2 * margin;
                
                // 绘制乐谱标题和元数据
                this.#renderMetadata(margin, availableWidth);
                
                // 计算音符区域的起始位置
                let yPos = margin + 100;
                
                // 绘制乐谱内容
                this.#renderMusicNotation(margin, yPos, availableWidth, availableHeight - 100);
                
                // 更新状态栏
                document.getElementById('currentScore').textContent = this.data.metadata.title;
                document.getElementById('status').textContent = '渲染完成';
            }
            
            // 渲染元数据
    #renderMetadata(margin, width) {
                const metadata = this.data.metadata;
                
                // 标题
                this.ctx.font = 'bold 32px Arial';
                this.ctx.fillText(metadata.title, margin + width / 2, margin + 30);
                
                // 其他元数据
                this.ctx.font = '20px Arial';
                const metadataText = `${metadata.composer} | ${metadata.key} | ${metadata.timeSignature} | ♩=${metadata.tempo}`;
                this.ctx.fillText(metadataText, margin + width / 2, margin + 65);
    }
            
            // 渲染乐谱内容
    #renderMusicNotation(x, y, width, height) {
                const measures = this.data.measures;
                const measureCount = measures.length;
                
                // 计算每个小节的宽度
                const measureWidth = width / measureCount;
                
                // 绘制每个小节
                measures.forEach((measure, index) => {
                    const measureX = x + index * measureWidth;
                    
                    // 绘制小节线
                    this.ctx.beginPath();
                    this.ctx.moveTo(measureX, y);
                    this.ctx.lineTo(measureX, y + 120);
                    this.ctx.stroke();
                    
                    // 绘制小节内的音符
                    this.#renderNotes(measure, measureX, y, measureWidth);
                });
                
                // 绘制结束线
                this.ctx.beginPath();
                this.ctx.moveTo(x + width, y);
                this.ctx.lineTo(x + width, y + 120);
                this.ctx.stroke();
    }
            
            // 渲染音符
    #renderNotes(measure, x, y, width) {
                const notes = measure.notes;
                const noteCount = notes.length;
                
                // 计算每个音符的宽度
                const noteWidth = width / noteCount;
                
                // 绘制每个音符
                notes.forEach((note, index) => {
                    const noteX = x + noteWidth / 2 + index * noteWidth;
                    
                    // 渲染单个音符
                    this.renderSingleNote(note, noteX, y, noteWidth);
                    
                    // 绘制歌词（如果有）
                    if (note.lyric) {
                        this.ctx.font = '16px Arial';
                        this.ctx.fillText(note.lyric, noteX, y + 100);
                    }
                });
    }
            
            // 渲染单个音符
    renderSingleNote(note, x, y, noteWidth) {
                // 获取音符符号
                const symbol = this.noteSymbols[note.pitch - 1];
                
                // 所有音符都在同一水平线上显示
                const noteY = y + 60;
                
                // 设置字体大小
                this.ctx.font = '28px Arial';
                
                // 绘制音符
                this.ctx.fillText(symbol, x, noteY);
                
                // 绘制高八度点（音符上方）
                if (note.octaveShift > 0) {
                    this.drawOctaveDots(x, noteY - 20, note.octaveShift);
                }
                
                // 绘制低八度点（音符下方）
                if (note.octaveShift < 0) {
                    // 根据音符时值调整低八度点的位置
                    if (note.duration >= 1) {
                        // 全音符、二分音符、四分音符
                        this.drawOctaveDots(x, noteY + 20, -note.octaveShift);
                    } else if (note.duration >= 0.5) {
                        // 八分音符
                        this.drawOctaveDots(x, noteY + 35, -note.octaveShift);
                    } else {
                        // 十六分音符
                        this.drawOctaveDots(x, noteY + 45, -note.octaveShift);
                    }
                }
                
                // 绘制音符时值标记
                this.renderNoteDuration(note, x, noteY, noteWidth);
            }
            
            // 绘制音符时值标记
    renderNoteDuration(note, x, y, noteWidth) {
                const duration = note.duration;
                
                // 全音符（duration: 4）显示为 "1 - - -"
                if (duration === 4) {
                    this.drawExtensionMarkers(x, y, noteWidth, 3);
                }
                // 二分音符（duration: 2）显示为 "2 -"
                else if (duration === 2) {
                    this.drawExtensionMarkers(x, y, noteWidth, 1);
                }
                // 四分音符（duration: 1）只显示音符数字，不添加任何标记
                // 八分音符（duration: 0.5）在音符下有一条横线
                else if (duration === 0.5) {
                    this.drawUnderline(x, y, 1);
                }
                // 十六分音符（duration: 0.25）在音符下有两条横线
                else if (duration === 0.25) {
                    this.drawUnderline(x, y, 2);
                }
            }
            
            // 绘制延长线标记（用于全音符和二分音符）
    drawExtensionMarkers(x, y, noteWidth, count) {
                const markerWidth = 10;
                const markerSpacing = 15;
                
                for (let i = 0; i < count; i++) {
                    const markerX = x + 15 + i * markerSpacing;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(markerX, y);
                    this.ctx.lineTo(markerX + markerWidth, y);
                    this.ctx.stroke();
                }
    }
            
            // 绘制音符下方的横线（用于八分音符和十六分音符）
    drawUnderline(x, y, lineCount) {
                const lineYOffset = 25;
                const lineSpacing = 10;
                
                for (let i = 0; i < lineCount; i++) {
                    const lineY = y + lineYOffset + i * lineSpacing;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(x - 10, lineY);
                    this.ctx.lineTo(x + 10, lineY);
                    this.ctx.stroke();
                }
    }
            
    // 绘制八度点
    drawOctaveDots(x, y, count) {
                this.ctx.beginPath();
                
                if (count === 1) {
                    // 一个点
                    this.ctx.arc(x, y, 2, 0, Math.PI * 2);
                } else if (count === 2) {
                    // 两个点
                    this.ctx.arc(x - 5, y, 2, 0, Math.PI * 2);
                    this.ctx.arc(x + 5, y, 2, 0, Math.PI * 2);
                } else if (count === 3) {
                    // 三个点
                    this.ctx.arc(x - 7, y, 2, 0, Math.PI * 2);
                    this.ctx.arc(x, y, 2, 0, Math.PI * 2);
                    this.ctx.arc(x + 7, y, 2, 0, Math.PI * 2);
                }
                
                this.ctx.fill();
    }
}
