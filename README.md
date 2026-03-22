# MEUI OS 🌑
**A browser-based Android OS simulator inspired by MIUI / HyperOS**

> Built with pure HTML, CSS, and Vanilla JavaScript — no frameworks, no dependencies, single file.

---

## 📱 Preview

> *Live demo coming soon via GitHub Pages*

---

## ✨ Features

- 🔒 **Lock Screen** — Clock, notifications, swipe to unlock
- 🔢 **PIN Screen** — 4-digit PIN (default: `1234`), shake animation on wrong input
- 🏠 **Home Screen** — 2-page app grid with swipe gesture, dock bar
- 🎛️ **Control Center** — Swipe down from top, toggles, brightness/volume sliders, media player
- 📲 **App Launch Animation** — Smooth spring-based expand from icon (HyperOS 2 / ColorOS 16 style)
- ⚙️ **Settings App** — Authentic HyperOS 2 structure with sub-pages
- 🖼️ **Wallpaper System** — 7 real abstract wallpapers + custom upload from device
- 🌑 **Boot Animation** — Logo + Android-style progress bar
- 📳 **Navbar Gesture** — Swipe up to close app, edge swipe for back

---

## 🗂️ Project Structure

```
📁 meui/
├── index.html        ← Entire simulator (single file)
└── 📁 icons/         ← App icon PNGs (place your icons here)
    ├── phone.png
    ├── messages.png
    ├── camera.png
    ├── gallery.png
    ├── browser.png
    ├── maps.png
    ├── music.png
    ├── calendar.png
    ├── mail.png
    ├── notes.png
    ├── clock.png
    ├── calculator.png
    ├── files.png
    ├── weather.png
    ├── scanner.png
    ├── settings.png
    ├── magisk.png
    ├── owl.png
    ├── kernelsu.png
    ├── termux.png
    ├── adb.png
    └── lsposed.png
```

> If an icon PNG is missing, the app will fallback to a colored tile with initials automatically.

---

## 🚀 How to Use

### Via GitHub Pages
Just open the live URL:
```
https://<your-username>.github.io/meui/
```

### Locally (PC)
Open `index.html` directly in any modern browser.

### On Android
Host via GitHub Pages or use a local server app (e.g. Termux + `python -m http.server`).

---

## 🎨 Adding Icons

Place your icon PNG files inside the `icons/` folder. Each file must match the name exactly:

| App | Filename |
|-----|----------|
| Phone | `phone.png` |
| Messages | `messages.png` |
| Camera | `camera.png` |
| Gallery | `gallery.png` |
| Browser | `browser.png` |
| Maps | `maps.png` |
| Music | `music.png` |
| Calendar | `calendar.png` |
| Mail | `mail.png` |
| Notes | `notes.png` |
| Clock | `clock.png` |
| Calculator | `calculator.png` |
| Files | `files.png` |
| Weather | `weather.png` |
| Scanner | `scanner.png` |
| Settings | `settings.png` |
| Magisk | `magisk.png` |
| Owl | `owl.png` |
| KernelSU | `kernelsu.png` |
| Termux | `termux.png` |
| ADB | `adb.png` |
| LSPosed | `lsposed.png` |

Recommended icon size: **192×192px** or **512×512px**, PNG with transparent background.

---

## 🔑 Default PIN

```
1234
```

---

## 🛠️ Built With

- HTML5 + CSS3 + Vanilla JavaScript
- [Google Material Symbols](https://fonts.google.com/icons) — UI icons
- [Outfit Font](https://fonts.google.com/specimen/Outfit) — Typography
- Wallpapers from [OriginOS Web](https://github.com/quandz24-ui/OriginWEB) by quandz24-ui

---

## 💡 Inspired By

- [OriginWEB](https://github.com/quandz24-ui/OriginWEB) by **quandz24-ui** — for architecture reference and wallpapers
- MIUI 14 / HyperOS 2 — for UI/UX design language
- ColorOS 16 — for app launch animation style

---

## 📋 Roadmap

- [ ] Working Calculator app
- [ ] Working Clock / Alarm app
- [ ] Recent Apps screen
- [ ] Notification panel
- [ ] More wallpapers
- [ ] Custom icon pack support
- [ ] Dark / Light mode toggle

---

## 📄 License

This project is open source for learning and personal use.
Not affiliated with Xiaomi, MIUI, or any related brands.

---

<div align="center">
  <b>Made with ❤️ — MEUI OS v1.0</b>
</div>
