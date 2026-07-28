@echo off
REM Build script for Los Santos DOJ Website
echo [DOJ BUILD] Building Los Santos Department of Justice Website...

REM Check if node_modules exists
if not exist "node_modules" (
    echo [SETUP] Installing dependencies...
    npm install
)

REM Build CSS with Tailwind
echo [CSS] Building CSS with Tailwind...
npx tailwindcss -i ./input.css -o ./style.css --minify

REM Check if build was successful
if %errorlevel% equ 0 (
    echo [SUCCESS] Build completed successfully!
    echo [INFO] You can now open index.html in your browser.
) else (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

pause
