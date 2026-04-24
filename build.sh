#!/bin/bash

# Build and Package Script for Raise Me App

echo ""
echo "====================================="
echo "  Raise Me - Build & Package Tool"
echo "====================================="
echo ""

case "$1" in
  windows)
    echo "Building Windows EXE..."
    npm run build || exit 1
    npm run electron-build
    echo ""
    echo "Windows EXE built successfully!"
    echo "Check dist/ folder for the .exe files"
    exit 0
    ;;
  android)
    echo "Building Android APK..."
    npm run build || exit 1
    npx cap sync android
    echo ""
    echo "Android files synced. Opening Android Studio for final APK build..."
    npx cap open android
    exit 0
    ;;
  web)
    echo "Building Web Version..."
    npm run build
    echo ""
    echo "Web build complete! Check dist/ folder"
    exit 0
    ;;
  install)
    echo "Installing dependencies..."
    npm install
    echo "Dependencies installed!"
    exit 0
    ;;
  clean)
    echo "Cleaning build files..."
    rm -rf dist
    rm -rf node_modules
    echo ""
    echo "Cleaned! Run './build.sh install' to reinstall"
    exit 0
    ;;
  *)
    # Show help if no argument provided
    echo "Usage:"
    echo "  ./build.sh install    - Install dependencies"
    echo "  ./build.sh web        - Build web version only"
    echo "  ./build.sh windows    - Build Windows EXE"
    echo "  ./build.sh android    - Build Android APK"
    echo "  ./build.sh clean      - Clean all build files"
    echo ""
    echo "Example:"
    echo "  ./build.sh windows"
    echo ""
    exit 0
    ;;
esac
