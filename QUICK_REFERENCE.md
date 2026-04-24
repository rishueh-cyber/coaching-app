# 📋 Quick Reference Card

Print this or save as reference!

---

## 🎯 3-Step Quick Build

### Step 1: Convert Icon (5 min)
```
https://convertio.co/svg-ico/
Upload: public/icon.svg
Download: icon.ico
Save to: public/icon.ico
```

### Step 2: Install Dependencies (3 min)
```bash
npm install
```

### Step 3: Build Your Apps
```bash
# Windows - one command!
build.bat windows

# Android - one command!
build.bat android
```

---

## 📁 What Each File Does

### 📦 Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Dependencies + build scripts |
| `vite.config.js` | Build configuration |
| `capacitor.config.json` | Android settings |

### 🎨 App Icon
| File | Purpose |
|------|---------|
| `public/icon.svg` | Your beautiful icon (edit anytime) |
| `public/icon.ico` | Windows icon (created from SVG) |

### 🖥️ Desktop (Electron)
| File | Purpose |
|------|---------|
| `public/electron.js` | Main process - desktop app logic |
| `public/preload.js` | Security layer - electron isolation |

### 📱 Mobile (Capacitor)
| File | Purpose |
|------|---------|
| `capacitor.config.json` | Android app configuration |

### 🛠️ Build Scripts
| File | Purpose |
|------|---------|
| `build.bat` | Windows build helper command |
| `build.sh` | Mac/Linux build helper command |

### 📚 Documentation
| File | Purpose |
|------|---------|
| `SETUP_COMPLETE.md` | Overview & status |
| `QUICK_START.md` | 5-min reference guide |
| `BUILD_AND_DEPLOY.md` | Detailed instructions |
| `VIDEO_TUTORIAL.md` | Step-by-step tutorial |

---

## 🚀 Build Commands

```bash
# First time
npm install

# Development (test in browser)
npm run dev

# Build distribution files
npm run build

# Create Windows EXE
npm run build
npm run electron-build

# Create Android APK
npm run build
npx cap sync android
npx cap open android
```

OR use helper scripts:

```bash
# Windows
build.bat install
build.bat windows
build.bat android
build.bat clean

# Mac/Linux
./build.sh install
./build.sh windows
./build.sh android
./build.sh clean
```

---

## 📂 Output Locations

After building:

```
Windows EXE files:
  dist/RaiseMe-1.0.0-portable.exe      ← Use this one!
  dist/RaiseMe-1.0.0-x64-Setup.exe

Android APK file:
  android/app/build/outputs/apk/debug/app-debug.apk

Web files:
  dist/index.html + assets
```

---

## ✅ Checklist

- [ ] Folder structure correct
- [ ] Icon converted to .ico
- [ ] `npm install` done
- [ ] `npm run dev` works
- [ ] Windows build succeeds
- [ ] Windows .exe tests OK
- [ ] Android build succeeds
- [ ] Android .apk tests OK
- [ ] Ready to ship!

---

## 🔧 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Icon missing | Convert SVG → ICO online tool |
| Build fails | Delete `node_modules/`, run `npm install` |
| "not found" error | Run `npm install` first |
| Stuck build | Wait 5-10 min or Ctrl+C and retry |

---

## 🌍 Share Your App

### Windows Users
```
Send them: RaiseMe-1.0.0-portable.exe
They download & double-click = Done!
```

### Android Users
```
Send them: app-debug.apk
They tap & install = Done!
```

### Web Users
```
Upload dist/ to any web hosting
Share URL with users
```

---

## 📞 Need Help?

1. **Icon issues**: Run `node scripts/convert-icon.js`
2. **Build errors**: Check `BUILD_AND_DEPLOY.md`
3. **Android problems**: See `VIDEO_TUTORIAL.md`
4. **Quick start**: Read `QUICK_START.md`

---

## 💡 Pro Tips

- **Icon** - Edit SVG anytime, re-export, rebuild
- **Version** - Update `package.json` before each release
- **Testing** - Always test .exe and .apk before sharing
- **Updates** - Increment version number for new releases

---

## 📊 Time Estimates

| Task | Duration |
|------|----------|
| Convert icon | 5 min |
| npm install | 3 min |
| Build Windows | 10-15 min |
| Build Android | 15-20 min |
| **Total** | **~45 min** |

---

## 🎯 Next Actions

1. ✅ **Convert icon** → Use online tool (5 min)
2. ✅ **Install deps** → `npm install` (3 min)
3. ✅ **Build Windows** → `build.bat windows` (15 min)
4. ✅ **Build Android** → `build.bat android` (20 min)
5. ✅ **Share files** → Upload .exe & .apk
6. 🎉 **Done!**

---

## 📱 System Requirements

### For Windows Build
- Windows PC ✓
- Node.js v16+ ✓
- Git ✓
- icon.ico file ✓

### For Android Build
- Android Studio ✓
- Java 11+ ✓
- Android SDK ✓

### For Both
- npm/Node.js installed ✓
- Project dependencies installed ✓

---

**You're ready to ship! 🚀**

Questions? Check the documentation files:
- Fast answer? → `QUICK_START.md`
- Detailed help? → `BUILD_AND_DEPLOY.md`
- Step-by-step? → `VIDEO_TUTORIAL.md`

Happy building!
