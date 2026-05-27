@echo off
title Portfolio Dev Server
echo ===================================================
echo   Starting Marklaurence Lozada Portfolio Dev Server
echo ===================================================
echo.
npm run dev -- --open
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to start. Make sure Node.js is installed.
    pause
)
