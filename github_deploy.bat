@echo off
chcp 65001 >nul
echo ========================================
echo   ScaleAlpha 自动部署脚本
echo ========================================
echo.

:: 检查是否有未提交的更改
echo [1/5] 检查 Git 状态...
git status --short
if errorlevel 1 (
    echo ❌ Git 命令执行失败，请确保已安装 Git
    pause
    exit /b 1
)
echo.

:: 添加所有更改
echo [2/5] 添加所有文件到暂存区...
git add .
if errorlevel 1 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)
echo ✓ 文件添加成功
echo.

:: 获取提交信息
echo [3/5] 准备提交更改...
set /p commit_msg="请输入提交信息 (直接回车使用默认信息): "
if "%commit_msg%"=="" (
    set commit_msg=更新网站内容
)
echo 提交信息: %commit_msg%
echo.

:: 提交更改
echo [4/5] 提交更改到本地仓库...
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo ⚠ 可能没有需要提交的更改
    echo.
)
echo.

:: 推送到 GitHub
echo [5/5] 推送到 GitHub...
git push origin main
if errorlevel 1 (
    echo ❌ 推送失败，请检查网络连接或权限
    pause
    exit /b 1
)
echo.

echo ========================================
echo ✓ 部署成功！
echo ========================================
echo.
echo 🚀 你的更改已推送到 GitHub
echo 📦 GitHub Actions 将自动构建和部署
echo 🌐 预计 2-5 分钟后网站更新
echo.
echo 访问地址: https://larrypatton.github.io/scalealpha/
echo Actions 状态: https://github.com/LarryPatton/scalealpha/actions
echo.
pause
