@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ================================
echo  ScaleAlpha.ai 开发服务器启动
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

REM 检查端口是否被占用
for /f "tokens=5" %%a in ('netstat -ano ^| find ":5173"') do (
    echo ⚠️  检测到端口 5173 已被占用
    set PORT_IN_USE=1
)

REM 如果5173被占用，使用5174
if defined PORT_IN_USE (
    echo 🔄 使用备用端口 5174...
    set VITE_PORT=5174
    echo.
    echo ✓ 即将在以下地址打开:
    echo   Local: http://localhost:5174/
    echo.
    timeout /t 2 /nobreak
    call npm run dev -- --port 5174
) else (
    echo ✓ 端口 5173 可用
    echo.
    echo ✓ 即将在以下地址打开:
    echo   Local: http://localhost:5173/
    echo.
    timeout /t 2 /nobreak
    call npm run dev
)

endlocal
