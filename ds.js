// 安装依赖： npm install express multer pdf-poppler
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const poppler = require('pdf-poppler');

const app = express();
const port = 3001;

// 创建上传目录
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'public/output');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// 配置Multer
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// 静态文件服务
app.use(express.static('public'));

// 主页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// 文件上传处理
app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) throw new Error('请选择PDF文件');
    if (req.file.mimetype !== 'application/pdf') throw new Error('仅支持PDF文件');

    const pdfPath = req.file.path;
    const outputPrefix = path.join(outputDir, `converted-${Date.now()}`);
    
    // PDF转换配置
    const opts = {
      format: 'png',
      out_dir: outputDir,
      out_prefix: path.basename(outputPrefix),
      page: null // 转换所有页面
    };

    // 执行转换
    await poppler.convert(pdfPath, opts);
    
    // 获取生成的图片列表
    const files = fs.readdirSync(outputDir)
      .filter(file => file.startsWith(path.basename(outputPrefix)))
      .map(file => `/output/${file}`);

    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});