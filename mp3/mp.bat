@echo off
setlocal enabledelayedexpansion

:: 创建UTF-8编码的索引HTML文件
chcp 65001 > nul
echo ^<html^>^<head^>^<meta charset="UTF-8"^>^<title^>MP3文件列表^</title^> > index.html
echo ^<script src="player.js"^>^</script^> >> index.html
echo ^</head^>              >>index.html
echo ^<body^>^<h1^>MP3文件列表v0. 13^</h1^> >> index.html

echo ^<button id="id_4_btn_toggle_playerWnd" ^>togglePlayerWnd^</button^> >> index.html
:: 创建文本区域
echo ^<textarea id="id_4_ta_list" rows="20" cols="50" readonly^> >> index.html

:: 遍历当前目录下所有mp3文件并添加到文本区域
for %%a in (*.mp3) do (
    echo %%a >> index.html
)

:: 关闭文本区域
echo ^</textarea^> >> index.html

:: 添加链接列表
echo ^<h2^>点击播放^</h2^>^<ul^> >> index.html
for %%a in (*.mp3) do (
    echo ^<li^>^<a href="%%a"^>%%a^</a^>^</li^> >> index.html
)

:: 完成HTML文件
echo ^</ul^>^</body^>^</html^> >> index.html

echo 索引页已生成: index.html
    
:: 升级：把MP3 列表 放到 id="id_4_ta_list" 的 textarea 里