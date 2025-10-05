class CNote {
            constructor(canvasId) {
                this.canvas = document.getElementById(canvasId);
                this.ctx = this.canvas.getContext('2d');
                this.noteWidth = 60;
                this.noteHeight = 80;
                this.lineSpacing = 15;
                this.currentX = 50;
                this.currentY = 150;
                
                // 设置Canvas尺寸
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
                
                // 绘制五线谱和示例音符
                this.drawStaff();
                this.drawExampleNotes();
            }
            
            resizeCanvas() {
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
                this.drawStaff();
                this.drawExampleNotes();
            }
            
            drawStaff() {
                const ctx = this.ctx;
                const width = this.canvas.width;
                const startY = this.currentY - this.noteHeight / 2;
                
                ctx.clearRect(0, 0, width, this.canvas.height);
                
                // 绘制五线谱的五条线
                ctx.beginPath();
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                
                for (let i = 0; i < 5; i++) {
                    const y = startY + i * this.lineSpacing;
                    ctx.moveTo(20, y);
                    ctx.lineTo(width - 20, y);
                }
                
                ctx.stroke();
                
                // 重置当前X位置
                this.currentX = 50;
            }
            
            drawExampleNotes() {
                // 绘制示例音符序列
                this.drawNote(1, this.currentX, this.currentY); // 全音符
                this.currentX += this.noteWidth + 20;
                
                this.drawNote(2, this.currentX, this.currentY); // 二分音符
                this.currentX += this.noteWidth + 20;
                
                this.drawNote(3, this.currentX, this.currentY); // 四分音符
                this.currentX += this.noteWidth + 20;
                
                this.drawNote(4, this.currentX, this.currentY); // 八分音符
                this.currentX += this.noteWidth + 20;
                
                this.drawNote(5, this.currentX, this.currentY); // 十六分音符
                this.currentX += this.noteWidth + 20;
                
                this.drawNote(0, this.currentX, this.currentY); // 休止符
            }
            
            drawNote(type, x, y) {
                const ctx = this.ctx;
                const fontSize = 24;
                const lineHeight = 5;
                
                ctx.font = `${fontSize}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                switch(type) {
                    case 0: // 休止符
                        ctx.fillText('0', x, y);
                        break;
                        
                    case 1: // 全音符: 1 - - -
                        ctx.fillText('1', x, y);
                        this.#drawHorizontalLines(x, y, 3);
                        break;
                        
                    case 2: // 二分音符: 2 -
                        ctx.fillText('2', x, y);
                        this.#drawHorizontalLines(x, y, 1);
                        break;
                        
                    case 3: // 四分音符: 3
                        ctx.fillText('3', x, y);
                        break;
                        
                    case 4: // 八分音符: 3(音符下有一横杠)
                        ctx.fillText('3', x, y);
                        this.#drawUnderline(x, y, 1);
                        break;
                        
                    case 5: // 十六分音符: 3(音符下有2横杠)
                        ctx.fillText('3', x, y);
                        this.#drawUnderline(x, y, 2);
                        break;
                }
            }
            
            #drawHorizontalLines(x, y, count) {
                const ctx = this.ctx;
                const lineLength = 20;
                const spacing = 8;
                
                ctx.beginPath();
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                
                for (let i = 0; i < count; i++) {
                    const lineX = x + 15 + i * spacing;
                    ctx.moveTo(lineX, y);
                    ctx.lineTo(lineX + lineLength, y);
                }
                
                ctx.stroke();
            }
            
            #drawUnderline(x, y, count) {
                const ctx = this.ctx;
                const lineLength = 25;
                const spacing = 5;
                
                ctx.beginPath();
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                
                for (let i = 0; i < count; i++) {
                    const lineY = y + 15 + i * spacing;
                    ctx.moveTo(x - lineLength/2, lineY);
                    ctx.lineTo(x + lineLength/2, lineY);
                }
                
                ctx.stroke();
            }
        }
