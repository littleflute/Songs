const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 存储歌单数据
let playlists = [];

// 获取所有歌单
app.get('/api/playlists', (req, res) => {
  res.json(playlists);
});

// 创建新歌单
app.post('/api/playlists', (req, res) => {
  const newPlaylist = req.body;
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});  