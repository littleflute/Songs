@echo off
setlocal enabledelayedexpansion

echo 正在扫描当前目录下的MP3文件...

rem 创建临时文件存储MP3文件列表
set "tempFile=mp3_files_list.tmp"
if exist "%tempFile%" del /f /q "%tempFile%"

rem 遍历当前目录下的所有MP3文件并保存到临时文件
for %%i in (*.mp3) do (
    echo %%i>>"%tempFile%"
)

rem 检查是否找到MP3文件
set "mp3Found=false"
for /f %%a in ('type "%tempFile%" ^| find /c /v ""') do if %%a gtr 0 set "mp3Found=true"

if "%mp3Found%"=="false" (
    echo 未找到MP3文件!
    goto :cleanup
)

echo 正在生成播放列表HTML文件...

rem 创建HTML文件
set "htmlFile=mp3_player.html"
if exist "%htmlFile%" del /f /q "%htmlFile%"

rem 写入HTML头部
(
echo ^<!DOCTYPE html^>
echo ^<html lang="zh-CN"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo     ^<title^>MP3播放列表^</title^>
echo     ^<style^>
echo         body { font-family: Arial, sans-serif; margin: 20px; }
echo         .container { max-width: 800px; margin: 0 auto; }
echo         .player-container { background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
echo         .playlist { margin-top: 20px; }
echo         .playlist-item { padding: 10px; border-bottom: 1px solid #eee; cursor: pointer; }
echo         .playlist-item:hover { background-color: #f0f0f0; }
echo         .active { background-color: #e0e0e0; font-weight: bold; }
echo     ^</style^>
echo ^</head^>
echo ^<body^>
echo     ^<div class="container"^>
echo         ^<h1^>MP3播放列表^</h1^>
echo         ^<div class="player-container"^>
echo             ^<audio id="audioPlayer" controls style="width: 100%%;"^>^</audio^>
echo         ^</div^>
echo         ^<div class="playlist" id="playlist"^>
)>"%htmlFile%"

rem 写入MP3文件列表
for /f "usebackq delims=" %%a in ("%tempFile%") do (
    set "fileName=%%a"
    set "fileUrl=%%a"
    rem 转义HTML特殊字符
    set "fileName=!fileName:&=^&amp;!"
    set "fileName=!fileName:<=^&lt;!"
    set "fileName=!fileName:>=^&gt;!"
    set "fileName=!fileName:"=^&quot;!"
    echo         ^<div class="playlist-item" data-file="!fileUrl!">!fileName!^</div^>>> "%htmlFile%"
)

rem 写入HTML尾部和JavaScript
(
echo         ^</div^>
echo     ^</div^>
echo     ^<script^>
echo         // 获取DOM元素
echo         const audioPlayer = document.getElementById('audioPlayer');
echo         const playlist = document.getElementById('playlist');
echo         const playlistItems = playlist.querySelectorAll('.playlist-item');
echo         
echo         // 设置初始播放文件
echo         if (playlistItems.length > 0) {
echo             playlistItems[0].classList.add('active');
echo             audioPlayer.src = playlistItems[0].getAttribute('data-file');
echo         }
echo         
echo         // 为播放列表项添加点击事件
echo         playlistItems.forEach(item => {
echo             item.addEventListener('click', () => {
echo                 // 移除所有活动状态
echo                 playlistItems.forEach(i => i.classList.remove('active'));
echo                 // 添加当前活动状态
echo                 item.classList.add('active');
echo                 // 更新播放器源
echo                 audioPlayer.src = item.getAttribute('data-file');
echo                 // 播放音频
echo                 audioPlayer.play();
echo             });
echo         });
echo         
echo         // 音频结束后自动播放下一首
echo         audioPlayer.addEventListener('ended', () => {
echo             const activeItem = playlist.querySelector('.active');
echo             if (activeItem) {
echo                 const nextItem = activeItem.nextElementSibling;
echo                 if (nextItem && nextItem.classList.contains('playlist-item')) {
echo                     activeItem.classList.remove('active');
echo                     nextItem.classList.add('active');
echo                     audioPlayer.src = nextItem.getAttribute('data-file');
echo                     audioPlayer.play();
echo                 }
echo             }
echo         });
echo     ^</script^>
echo ^</body^>
echo ^</html^>
)>>"%htmlFile%"

:cleanup
rem 清理临时文件
if exist "%tempFile%" del /f /q "%tempFile%"

echo 播放列表已生成: %htmlFile%
echo 双击该文件即可在浏览器中打开并播放MP3文件。

pause    