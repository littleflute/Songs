@echo off
setlocal enabledelayedexpansion

:: 创建UTF-8编码的索引HTML文件
chcp 65001 > nul
echo ^<html^>^<head^>^<meta charset="UTF-8"^>^<title^>MP3文件列表^</title^>^</head^>^<body^>^<h1^>MP3文件列表^</h1^>^<ul^> > index.html

:: 遍历当前目录下所有mp3文件
for %%a in (*.mp3) do (
    echo ^<li^>^<a href="%%a"^>%%a^</a^>^</li^> >> index.html
)

:: 完成HTML文件
echo ^</ul^>^</body^>^</html^> >> index.html

echo 索引页已生成: index.html
    