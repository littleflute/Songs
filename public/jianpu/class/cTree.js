 // CTree类 - 版本v0.11
class CTree {
            /**
             * 构造函数
             * @param {string} canvasId - 画布元素ID
             */
            constructor(canvasId) {
                this.canvas = document.getElementById(canvasId);
                this.ctx = this.canvas.getContext('2d');
                this.container = this.canvas.parentElement;
                this.treeCount = 1; // 默认树木数量
                this.leafColors = ['#81C784', '#66BB6A', '#4CAF50', '#388E3C'];
                this.trunkColor = '#5D4037';
                this.skyGradient = null;
                this.groundColor = '#8BC34A';
                
                this._init();
            }
            
            /**
             * 初始化函数
             */
            _init() {
                this._setupEventListeners();
                this._resizeCanvas();
                this.render();
            }
            
            /**
             * 设置事件监听器
             */
            _setupEventListeners() {
                window.addEventListener('resize', () => this._resizeCanvas());
            }
            
            /**
             * 调整画布大小
             */
            _resizeCanvas() {
                this.canvas.width = this.container.clientWidth;
                this.canvas.height = this.container.clientHeight;
                this._createSkyGradient();
                this.render();
            }
            
            /**
             * 创建天空渐变
             */
            _createSkyGradient() {
                const groundLevel = this.canvas.height * 0.8;
                this.skyGradient = this.ctx.createLinearGradient(0, 0, 0, groundLevel);
                this.skyGradient.addColorStop(0, '#87CEEB');
                this.skyGradient.addColorStop(1, '#E0F7FA');
            }
            
            /**
             * 绘制背景
             */
            _drawBackground() {
                const width = this.canvas.width;
                const height = this.canvas.height;
                const groundLevel = height * 0.8;
                
                // 绘制天空
                this.ctx.fillStyle = this.skyGradient;
                this.ctx.fillRect(0, 0, width, groundLevel);
                
                // 绘制地面
                this.ctx.fillStyle = this.groundColor;
                this.ctx.fillRect(0, groundLevel, width, height - groundLevel);
            }
            
            /**
             * 绘制树干
             * @param {number} x - 树干底部中心点X坐标
             * @param {number} y - 树干底部中心点Y坐标
             * @param {number} height - 树干高度
             */
            _drawTrunk(x, y, height = 150) {
                this.ctx.fillStyle = this.trunkColor;
                this.ctx.beginPath();
                this.ctx.moveTo(x - 15, y);
                this.ctx.lineTo(x + 15, y);
                this.ctx.lineTo(x + 10, y - height);
                this.ctx.lineTo(x - 10, y - height);
                this.ctx.closePath();
                this.ctx.fill();
            }
            
            /**
             * 绘制树叶簇
             * @param {number} x - 树叶簇中心点X坐标
             * @param {number} y - 树叶簇中心点Y坐标
             * @param {number} width - 树叶簇宽度
             * @param {number} height - 树叶簇高度
             * @param {number} density - 树叶密度
             */
            _drawLeafCluster(x, y, width, height, density) {
                for (let i = 0; i < density; i++) {
                    const leafX = x + (Math.random() - 0.5) * width;
                    const leafY = y + (Math.random() - 0.5) * height;
                    const leafSize = 5 + Math.random() * 15;
                    const leafColor = this.leafColors[Math.floor(Math.random() * this.leafColors.length)];
                    
                    this.ctx.fillStyle = leafColor;
                    this.ctx.beginPath();
                    this.ctx.arc(leafX, leafY, leafSize, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
            
            /**
             * 绘制单棵树
             * @param {number} x - 树干底部中心点X坐标
             * @param {number} y - 树干底部中心点Y坐标
             */
            _drawSingleTree(x, y) {
                // 绘制树干
                this._drawTrunk(x, y);
                
                // 绘制树冠
                this._drawLeafCluster(x, y - 180, 100, 120, 50);
                this._drawLeafCluster(x - 40, y - 150, 60, 80, 30);
                this._drawLeafCluster(x + 40, y - 150, 60, 80, 30);
            }
            
            /**
             * 绘制多棵树
             */
            _drawMultipleTrees() {
                const width = this.canvas.width;
                const height = this.canvas.height;
                const groundLevel = height * 0.8;
                
                // 根据画布宽度计算树木间距
                const treeSpacing = width / (this.treeCount + 1);
                
                for (let i = 1; i <= this.treeCount; i++) {
                    const treeX = treeSpacing * i;
                    // 随机调整树木高度，创建层次感
                    const treeHeight = 120 + Math.random() * 80;
                    const treeY = groundLevel - (Math.random() * 50);
                    
                    this._drawTrunk(treeX, treeY, treeHeight);
                    
                    // 根据树干高度调整树冠大小
                    const mainClusterSize = 80 + (treeHeight / 150) * 40;
                    const subClusterSize = 50 + (treeHeight / 150) * 30;
                    
                    this._drawLeafCluster(treeX, treeY - treeHeight - 30, mainClusterSize, mainClusterSize * 1.2, 40 + Math.random() * 20);
                    this._drawLeafCluster(treeX - mainClusterSize * 0.4, treeY - treeHeight, subClusterSize, subClusterSize * 1.3, 20 + Math.random() * 20);
                    this._drawLeafCluster(treeX + mainClusterSize * 0.4, treeY - treeHeight, subClusterSize, subClusterSize * 1.3, 20 + Math.random() * 20);
                }
            }
            
            /**
             * 设置树木数量
             * @param {number} count - 树木数量
             */
            setTreeCount(count) {
                if (count > 0 && count <= 10) { // 限制树木数量在1-10之间
                    this.treeCount = count;
                    this.render();
                }
            }
            
            /**
             * 设置树叶颜色
             * @param {array} colors - 树叶颜色数组
             */
            setLeafColors(colors) {
                if (Array.isArray(colors) && colors.length > 0) {
                    this.leafColors = colors;
                    this.render();
                }
            }
            
            /**
             * 设置树干颜色
             * @param {string} color - 树干颜色
             */
            setTrunkColor(color) {
                this.trunkColor = color;
                this.render();
            }
            
            /**
             * 设置地面颜色
             * @param {string} color - 地面颜色
             */
            setGroundColor(color) {
                this.groundColor = color;
                this.render();
            }
            
            /**
             * 渲染树木
             */
            render() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this._drawBackground();
                
                if (this.treeCount === 1) {
                    // 单棵树居中显示
                    this._drawSingleTree(this.canvas.width / 2, this.canvas.height * 0.8);
                } else {
                    // 多棵树分布显示
                    this._drawMultipleTrees();
                }
            }
}
        