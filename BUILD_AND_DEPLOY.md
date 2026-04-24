# 📦 Build & Distribution Guide - Raise Me App

This guide explains how to build and distribute your Raise Me app for **Windows Desktop (EXE)** and **Android (APK)**.

---

## 🎨 Icon Conversion

The icon.svg has been created. You need to convert it to .ico and .png formats:

### **Option 1: Using Online Converter (Easiest)**
1. Go to https://convertio.co/svg-ico/ 
2. Upload `public/icon.svg`
3. Download as `icon.ico` and save to `public/` folder
4. Also convert to `icon-512.png` and save to `public/`

### **Option 2: Using ImageMagick (Command Line)**
```bash
# Convert SVG to ICO (requires ImageMagick installed)
magick convert public/icon.svg -define icon:auto-resize=256,128,96,64,48,32,16 public/icon.ico

# Convert to PNG
magick convert public/icon.svg -background none -resize 512x512 public/icon-512.png
```

### **Option 3: Using Node.js**
```bash
npm install -g sharp
# Create a script to convert SVG to PNG/ICO
```

---

## 🖥️ Building for Windows (Desktop EXE)

### **Prerequisites**
- Node.js installed
- Git installed
- Windows system (for building Windows executable)

### **Step 1: Install Dependencies**
```bash
npm install
```

### **Step 2: Build Web Version**
```bash
npm run build
```

### **Step 3: Build Electron Executable**
```bash
# Make sure icon.ico exists in public/ folder
npm run electron-build
```

### **Output**
- **Installer**: `dist/RaiseMe-1.0.0.exe` (NSIS Installer - recommended for users)
- **Portable**: `dist/RaiseMe-1.0.0-portable.exe` (Single EXE file, no installation needed)

### **Distribution**
- Upload to a release page (GitHub Releases, SourceForge, etc.)
- Or create a simple website with download links
- Share the .exe file with users

---

## 📱 Building for Android (APK)

### **Prerequisites**
- Java Development Kit (JDK) 11+
- Android SDK installed
- Android Build Tools
- Capacitor CLI

### **Step 1: Initialize Capacitor**
```bash
# First time setup
npx cap init raise-me com.raiseme.app

# Or if already initialized, sync
npm run mobile
```

### **Step 2: Create Android Project**
```bash
npx cap add android
```

### **Step 3: Build for Android**
```bash
# Build web assets
npm run build

# Copy to Android project
npx cap copy android

# Sync with Android
npx cap sync android

# Open Android Studio
npx cap open android
```

### **Step 4: Build APK in Android Studio**
1. Android Studio will open
2. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Wait for build to complete
4. APK will be in: `android/app/build/outputs/apk/debug/app-debug.apk`

### **Release APK (for Production)**
For a signed release APK:
1. In Android Studio: **Build** → **Build Bundle(s) / APK(s)** → **Build App Bundle**
2. Or use command line:
```bash
./gradlew build
```

### **Output Location**
- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release APK: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 📥 Uploading APK to Google Play Store

### **Create Google Play Account**
1. Go to https://play.google.com/console
2. Create a developer account (one-time $25 fee)
3. Create a new app

### **Build & Upload**
1. Build release APK/AAB as described above
2. Upload to Play Store Console
3. Fill in app details, screenshots, description
4. Submit for review (takes 24-48 hours)

### **Alternative: Direct Download**
- Host the APK on your website
- Users can download and install directly
- Less secure than Play Store, but faster distribution

---

## 📤 Quick Build Commands

### **Windows EXE**
```bash
npm run build && npm run electron-build
```

### **Android APK**
```bash
npm run build && npx cap sync android
```

### **Portable Windows EXE (No Installation)**
```bash
npm run build && npm run electron-build
# Find: dist/RaiseMe-1.0.0-portable.exe
```

---

## 🚀 Deployment Checklist

- [ ] Icon converted to .ico and .png
- [ ] package.json updated with correct app name, version
- [ ] npm install completed
- [ ] npm run build successful
- [ ] Windows EXE built and tested
- [ ] Android APK built and tested
- [ ] Version number updated for release
- [ ] Ready to distribute!

---

## 🔧 Troubleshooting

### **Electron Build Issues**
- Make sure `icon.ico` exists in `public/` folder
- Check that dist/ folder was created successfully
- Try: `rm -rf node_modules && npm install`

### **Android Build Issues**
- Install Android SDK from Android Studio
- Set `ANDROID_HOME` environment variable
- Ensure Java 11+ is installed

### **Icon Not Showing**
- Convert SVG to proper format (.ico for Windows, .png for Android)
- Update file paths in configuration
- Clear cache and rebuild

---

## 📱 Testing Before Release

### **Windows EXE**
```bash
npm run electron-dev
# This runs dev server + electron for testing
```

### **Android**
```bash
# Connect Android device via USB or use emulator
npx cap run android
```

---

## 📊 File Size Optimization

### **Reduce App Size**
```javascript
// In vite.config.js, add:
build: {
  minify: 'terser',
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
      },
    },
  },
}
```

---

## ✅ Final Notes

- **Windows Users**: Most prefer the portable .exe (no installation)
- **Android Users**: Release on Play Store for maximum reach
- **Updates**: Consider adding auto-update functionality for desktop version
- **Support**: Provide installation instructions and troubleshooting guide

For questions, refer to:
- Electron Docs: https://www.electronjs.org/docs
- Capacitor Docs: https://capacitorjs.com/docs
- electron-builder: https://www.electron.build/
