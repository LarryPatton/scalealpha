@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ================================
echo  ScaleAlpha.ai 生产构建
echo ================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ 错误: 未检测到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

REM 检查是否在项目目录
if not exist package.json (
    echo ❌ 错误: 找不到 package.json
    echo 请确保在项目根目录运行此脚本
    pause
    exit /b 1
)

REM 检查 node_modules 是否存在
if not exist node_modules (
    echo 📦 检测到首次运行，正在安装依赖...
    echo.
    call npm install
    if errorlevel 1 (
        echo ❌ 依赖安装失败！
        pause
        exit /b 1
    )
    echo ✓ 依赖安装完成
    echo.
)

REM 开始构建
echo 🔨 正在构建项目...
echo.

call npm run build

if errorlevel 1 (
    echo.
    echo ❌ 构建失败！
    echo.
    pause
    exit /b 1
)

echo.
echo ================================
echo ✅ 构建成功完成！
echo ================================
echo.
echo 📁 输出目录: dist\
echo 📦 生产文件已准备好部署
echo.
echo 💡 提示: 可以直接将 dist 文件夹部署到任何静态托管服务
echo.

REM 延迟2秒后关闭窗口
timeout /t 2 /nobreak
exit /b 0

endlocal
