# Yashvinexus v2 — Clean SaaS Website

A fully rebuilt, production-ready React.js website for **Yashvinexus** — clean SaaS design with GSAP animations, custom mouse tracking, and white/black color system.

## ✨ What's New in v2

| Feature | Details |
|---|---|
| **GSAP + ScrollTrigger** | All animations — hero reveal, scroll fade-ups, stagger grids |
| **Custom Cursor** | Smooth lerp-tracked mouse with hover & click states |
| **SaaS Design System** | White/Black palette, Inter + Syne typography, clean layout |
| **Full-Width Layout** | Every section spans 100% width with internal max-width wrapping |
| **Form Handler** | Real-time validation, blur touch, shake on error, success/error states |
| **Hide-on-scroll Navbar** | Smart show/hide with glassmorphism blur when scrolled |
| **3D Hero Card** | Mouse-tracking 3D tilt effect with live dashboard UI |
| **Mobile Responsive** | Full hamburger drawer, adaptive grid at every breakpoint |

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ ([nodejs.org](https://nodejs.org))

### Install & Run
```bash
cd yashvinexus
npm install
npm start
```
Opens at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📁 Structure

```
src/
├── components/
│   ├── Cursor.js          ← Mouse-tracking custom cursor
│   ├── Navbar.js / .css   ← Full-width hide-on-scroll header
│   ├── Footer.js / .css   ← Black footer with CTA strip
│   └── ScrollToTop.js     ← Floating scroll button
├── pages/
│   ├── Home.js / .css     ← Hero, Services, Stats, Testimonials, Why Us
│   ├── Services.js / .css ← 6 detailed service rows with metrics
│   ├── About.js / .css    ← Story, Values, Team, Timeline
│   └── Contact.js / .css  ← Form handler, Sidebar, FAQ accordion
├── App.js                 ← Loader, routing setup
├── index.css              ← Full design system & CSS variables
└── index.js
```

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#ffffff` |
| Primary Text | `#0a0a0a` |
| Secondary Text | `#525252` |
| Border | `#e5e5e5` |
| Accent Color | `#5b21b6` (indigo) |
| Font (Body) | Inter |
| Font (Display) | Syne |

## 📄 Pages

| Page | Route | Highlights |
|---|---|---|
| Home | `/` | Word-by-word hero, 3D card, stats strip, service grid |
| Services | `/services` | Alternating rows, metric cards, process steps |
| About | `/about` | Story, values grid, team cards, timeline |
| Contact | `/contact` | Validated form, FAQ accordion, sidebar |

---

Built with GSAP, React Router v6, React Icons | Yashvinexus 2026
