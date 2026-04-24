@echo off
REM Build and Package Script for Raise Me App

echo.
echo =====================================
echo   Raise Me - Build & Package Tool
echo =====================================
echo.

if "%1"=="windows" (
    echo Building Windows EXE...
    call npm run build
    if errorlevel 1 (
        echo Build failed!
        exit /b 1
    )
    call npm run electron-build
    echo.
    echo Windows EXE built successfully!
    echo Check dist/ folder for the .exe files
    exit /b 0
)

if "%1"=="android" (
    echo Building Android APK...
    call npm run build
    if errorlevel 1 (
        echo Build failed!
        exit /b 1
    )
    call npx cap sync android
    echo.
    echo Android files synced. Opening Android Studio for final APK build...
    call npx cap open android
    exit /b 0
)

if "%1"=="web" (
    echo Building Web Version...
    call npm run build
    echo.
    echo Web build complete! Check dist/ folder
    exit /b 0
)

if "%1"=="install" (
    echo Installing dependencies...
    call npm install
    echo Dependencies installed!
    exit /b 0
)

if "%1"=="clean" (
    echo Cleaning build files...
    rmdir /s /q dist
    rmdir /s /q node_modules
    echo.
    echo Cleaned! Run 'build.bat install' to reinstall
    exit /b 0
)

REM Show help if no argument provided
echo Usage:
echo   build.bat install    - Install dependencies
echo   build.bat web        - Build web version only
echo   build.bat windows    - Build Windows EXE
echo   build.bat android    - Build Android APK
echo   build.bat clean      - Clean all build files
echo.
echo Example:
echo   build.bat windows
echo.
