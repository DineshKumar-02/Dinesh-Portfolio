# DineshKumar S — Professional Developer Portfolio

A premium, interactive, and highly animated portfolio website built from scratch using only raw **HTML5**, **CSS3**, and modern **JavaScript (ES6+)**. 

The design takes inspiration from Apple, Solana, and MetaMask design styles, emphasizing elegant glassmorphism, responsive elements, and clean coding layout rules.

---

## 🎨 Theme & Colors
- **Main Backdrop:** Deep black, dark purple, and dark blue glowing radial-gradients.
- **Accents:** 
  - Solana Purple (`#9945FF`)
  - MetaMask Orange (`#F6851B`)
  - Electric Blue (`#00F0FF`)
  - ThinkHub Purple (`#6C63FF`)

---

## ✨ Features
1. **Interactive Glow Mouse Pointer:** Glow radial overlays follow the user's cursor dynamically.
2. **Moving Gradient Blobs:** Organic blurred blobs drift in the background using CSS keyframe rules.
3. **Sleek Initial Preloader:** Clean introductory workspace load bar matching system boot flows.
4. **Interactive Text Scroller:** Simulates keyboard actions cycles across skill profiles.
5. **Project screenshot carousels:** Built-in slide controllers showcasing ThinkHub and MetaQR configurations.
6. **Certificate Modal Lightbox:** Embeds PDF/Image credentials dynamically upon card click without resetting page layouts.
7. **Clean Subpages Structure:** Independent detail pages inside `/pages` providing deep-dive details.

---

## 📁 File Structure
```
Portfolio-Website/
│
├── index.html               # Main page layout containing profile grids
├── style.css                # Global stylesheet containing variables and animations
├── script.js                # Core JS logic handling menus, typing cycles, and modals
│
├── assets/
│   ├── images/              # Portrait photo assets
│   ├── certificates/        # Credentials copied files
│   ├── resume/              # Downloadable resume document
│   └── project-images/      # Project capture slides
│
└── pages/
    ├── projects.html        # Case studies deep-dives
    ├── certifications.html  # Achievements gallery
    ├── contact.html         # Communications center
    └── about.html           # Professional timeline
```

---

## 🚀 How to Run Locally

Since this website uses vanilla web assets, there are **no compile steps** or npm configurations required.

### Option A: Static Load
Double click `index.html` to execute the webpage directly inside default web browsers.

### Option B: Local HTTP Server (Recommended)
Running a local web server allows PDFs inside frames to load correctly due to cross-origin policies.

Using Node.js (`http-server`):
```bash
npx http-server ./
```

Using Python:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` inside your browser.
