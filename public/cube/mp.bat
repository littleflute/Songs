@echo off
setlocal enabledelayedexpansion

:: 设置主页文件名
set "index_file=index.html"

:: 创建新的主页文件并添加头部
echo ^<html^> > %index_file%
echo ^<head^> >> %index_file%
echo ^<title^>HTML文件索引^</title^> >> %index_file%
echo ^<style^> >> %index_file%
echo body { font-family: Arial, sans-serif; margin: 20px; } >> %index_file%
echo h1 { color: #333; } >> %index_file%
echo ul { list-style-type: none; padding: 0; } >> %index_file%
echo li { margin-bottom: 10px; } >> %index_file%
echo a { color: #0066cc; text-decoration: none; } >> %index_file%
echo a:hover { text-decoration: underline; } >> %index_file%
echo ^</style^> >> %index_file%
echo ^</head^> >> %index_file%
echo ^<body^> >> %index_file%
echo ^<h1^>HTML文件索引^</h1^> >> %index_file%
echo ^<ul^> >> %index_file%

:: 遍历当前目录下的所有HTML文件并添加链接
for %%f in (*.html) do (
    if /i not "%%f"=="%index_file%" (
        echo ^<li^>^<a href="%%f"^>%%f^</a^>^</li^> >> %index_file%
    )
)

:: 添加尾部
echo ^</ul^> >> %index_file%
echo ^</body^> >> %index_file%
echo ^</html^> >> %index_file%

echo 主页文件 %index_file% 已生成！
pause
    