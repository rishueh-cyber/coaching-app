# 🚀 Quick Start Guide - Raise Me Desktop & Mobile App

## 📋 Prerequisites

Before you start, make sure you have installed:

1. **Node.js** (v16+) - https://nodejs.org
2. **Git** - https://git-scm.com
3. **For Windows EXE**: Windows PC
4. **For Android APK**: 
   - Android Studio - https://developer.android.com/studio
   - Java Development Kit (JDK) 11+ - install via Android Studio

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm run install
# or use the build script:
# Windows: build.bat install
# Mac/Linux: ./build.sh install
```

### Step 2: Test Development Build
```bash
npm run dev
# Opens the app at http://localhost:5174
```

### Step 3: Convert App Icon
Your beautiful app icon (icon.svg) needs to be converted to other formats:

**Easy Way (Online):**
1. Go to https://convertio.co/svg-ico/
2. Upload `public/icon.svg`
3. Download as `icon.ico`
4. Save to `public/` folder (replace any existing file)

**Result:** `public/icon.ico` file created ✓

---

## 🖥️ Build Windows EXE (10 minutes)

### Simple Method:
```bash
# Windows Command Prompt:
build.bat windows

# Or manually:
npm run build
npm run electron-build
```

### What You Get:
- **RaiseMe-1.0.0-portable.exe** - Single file, no installation needed
- **RaiseMe-1.0.0.exe** - Installer version with Start Menu shortcuts

### Output Location:
- Check the `dist/` folder for your .exe files

### Share Your App:
```
✓ Share RaiseMe-1.0.0-portable.exe to users
✓ They can download and run directly
✓ No installation required
```

---

## 📱 Build Android APK (15 minutes)

### Step 1: Setup Android Project
```bash
npx cap add android
```

### Step 2: Build APK
```bash
npm run build
npx cap sync android
npx cap open android
```

### Step 3: Build in Android Studio
1. Android Studio opens automatically
2. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Wait for completion (2-5 minutes)
4. APK is at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 4: Share APK
```
✓ Download app-debug.apk from Android Studio
✓ Email or upload to hosting service
✓ Users download and open with Android to install
```

---

## 📥 Installing Built Apps

### Windows EXE Installation
1. User downloads `RaiseMe-1.0.0-portable.exe`
2. Double-click to run (instant launch)
3. That's it! ✓

### Android APK Installation
1. User downloads the `.apk` file
2. Opens file manager
3. Taps the APK file
4. Confirms installation
5. App appears in their app drawer ✓

---

## 🎯 Complete Build Steps (Summary)

| Platform | Command | Time | Output |
|----------|---------|------|--------|
| **Windows** | `build.bat windows` | 10m | .exe file |
| **Android** | `build.bat android` | 15m | .apk file |
| **Web** | `npm run build` | 2m | dist/ folder |

---

## 📤 Distribution Options

### Option 1: Simple Sharing
- Share `.exe` on cloud (Dropbox, Google Drive)
- Share `.apk` on cloud
- Users download and install

### Option 2: GitHub Releases
- Push code to GitHub
- Create Release with .exe and .apk files
- Users download from releases page

### Option 3: Website
- Host `.exe` and `.apk` on your website
- Create download buttons
- Users get app from your site

### Option 4: Google Play Store (Android)
- Create Google Play Developer Account ($25)
- Upload signed APK
- Reach millions of Android users

---

## 🔧 Useful Commands

```bash
# Development
npm run dev          # Run dev server

# Building
npm run build        # Build web version
npm run electron-build    # Build Windows EXE
npm run android      # Build Android APK

# Testing
npm run electron-dev # Test desktop app with dev server

# Cleaning
rm -rf dist node_modules  # Clean all builds
```

---

## ⚠️ Common Issues & Solutions

### App icon doesn't show
- Make sure `public/icon.ico` exists
- Convert SVG properly using the online tool

### "electron-builder not found"
```bash
npm install
npm run electron-build
```

### Android build fails
- Install Android SDK via Android Studio
- Ensure Java 11+ is installed
- Set ANDROID_HOME environment variable

### App too large
- Check `dist/` folder size
- Minimize images and assets
- Use code splitting

---

## 📊 Final Checklist

- [ ] Dependencies installed: `npm install`
- [ ] Development runs: `npm run dev`
- [ ] Icon converted to .ico
- [ ] Windows EXE builds: `build.bat windows`
- [ ] Android APK builds: `build.bat android`
- [ ] App version updated in package.json
- [ ] Ready to share! 🎉

---

## 🎁 What's Included

✅ **Desktop Support**: Runs on Windows, Mac, Linux  
✅ **Mobile Support**: Runs on Android (iOS needs Mac)  
✅ **Beautiful Icon**: Professional gradient design  
✅ **Auto-Update Ready**: Framework ready for updates  
✅ **Secure**: Context isolation enabled  
✅ **Professional**: Signed builds & installers  

---

## 📞 Next Steps

1. Install dependencies
2. Convert icon (5 min)
3. Build Windows EXE (10 min)
4. Build Android APK (15 min)
5. Share with users!

**Total time from start to distribution: ~45 minutes** ⏱️

---

## 💡 Pro Tips

- Update version in `package.json` for each release
- Test app before building
- Keep icon in `public/icon.svg` for future updates
- Use `.env` for API keys (if needed)
- Remember: distributing via your site gives you full control

---

## 🆘 Need Help?

Refer to:
- Electron Docs: https://www.electronjs.org/docs
- Capacitor Docs: https://capacitorjs.com/docs
- Vite Guide: https://vitejs.dev/guide/
- Our BUILD_AND_DEPLOY.md file for detailed info

**Happy building! 🚀**
