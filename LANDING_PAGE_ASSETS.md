# Nirmaan UI Landing Page - Asset Requirements

## 🎨 Assets Needed to Complete the Landing Page

### 1. **Logo / Branding** (Priority: HIGH)

- **File**: `frontend/src/assets/logo.svg` or `logo.png`
- **Usage**: Navbar branding (currently using text "Nirmaan UI")
- **Requirements**:
  - SVG format preferred for scalability
  - Should work on both light and dark backgrounds
  - Recommended size: 200x50px (auto-scales)
  - **Color scheme**: Use accent colors (#00FFC6 aqua-mint or gradient)

---

### 2. **Hero Section Visual** (Priority: HIGH)

- **Option A - Spline 3D Model** (RECOMMENDED)
  - Create a 3D component showcase on [Spline.design](https://spline.design)
  - Export as embedded iframe or React component
  - **Theme**: Floating UI components, abstract shapes, or isometric design
  - **Colors**: Match your gradient signature (aqua #00FFC6 → blue #0078FF → purple #B300FF)
- **Option B - Screenshot/Mockup**

  - High-quality screenshot of the app interface
  - File: `frontend/src/assets/hero-mockup.png`
  - Recommended size: 1920x1080px
  - Show: Component explorer or live preview feature

- **Option C - Animated SVG/Lottie**
  - Component animation or interactive illustration
  - File: `frontend/src/assets/hero-animation.json` (Lottie)

**Current Status**: Placeholder grid pattern with icon

---

### 3. **Team Photos** (Priority: MEDIUM)

- **File**: `frontend/src/assets/team/dhruv.jpg` (and others)
- **Requirements**:
  - Professional headshots or casual developer photos
  - Square format: 400x400px minimum
  - Consistent style (same background/lighting)
  - File size: < 200KB each (optimized)

**Current Status**: Placeholder gradient circles with user icon

---

### 4. **Feature Icons** (Priority: LOW)

- **Status**: Already using Lucide React icons ✅
- No additional assets needed (Code, Palette, Zap, Download, Lock, TrendingUp)

---

### 5. **Background Patterns/Textures** (Priority: LOW - Optional)

- **File**: `frontend/src/assets/grid-pattern.svg` or `noise-texture.png`
- **Usage**: Subtle background overlays
- **Current Status**: Using CSS-generated grid pattern ✅

---

## 🎬 GSAP Animation Suggestions

### Recommended Animations to Add:

1. **Hero Title Animation**

   ```javascript
   // Stagger animation for title words
   gsap.from(".hero-title span", {
     y: 100,
     opacity: 0,
     stagger: 0.1,
     duration: 1,
     ease: "power4.out",
   });
   ```

2. **Stats Counter Animation**

   ```javascript
   // Animate numbers counting up
   gsap.to(".stat-value", {
     innerText: (i, target) => target.getAttribute("data-value"),
     duration: 2,
     snap: { innerText: 1 },
     ease: "power1.inOut",
   });
   ```

3. **Parallax Scroll Effects**

   ```javascript
   // Floating orbs move on scroll
   gsap.to(".floating-orb", {
     y: -200,
     scrollTrigger: {
       trigger: ".hero",
       scrub: true,
     },
   });
   ```

4. **Card Hover 3D Tilt**
   - Use `react-tilt` or GSAP for feature cards
   - Add subtle rotation on mouse move

---

## 🖼️ Quick Implementation Guide

### To Add Spline 3D:

1. Go to https://spline.design
2. Create a new project
3. Build a 3D scene (components floating, abstract shapes, etc.)
4. Export → "Export for Web" → Get embed code
5. Replace this section in `Landing.jsx`:

```jsx
{
  /* Current placeholder */
}
<div className="aspect-video surface...">
  {/* ADD HERE */}
  <iframe src="YOUR_SPLINE_URL" frameBorder="0" width="100%" height="100%" />
</div>;
```

### To Add Team Photos:

1. Place images in `frontend/src/assets/team/`
2. Import in `Landing.jsx`:

```jsx
import dhruvPhoto from "../assets/team/dhruv.jpg";
```

3. Replace placeholder:

```jsx
image: dhruvPhoto, // Instead of "/api/placeholder/200/200"
```

### To Add Logo:

1. Place logo SVG in `frontend/src/assets/`
2. Update `Landing.jsx` Hero section:

```jsx
<img src="/src/assets/logo.svg" alt="Nirmaan UI" className="h-12" />
```

---

## 📦 File Structure After Assets:

```
frontend/src/assets/
├── logo.svg                 # Main logo
├── hero-mockup.png          # Hero section visual
├── hero-animation.json      # Optional Lottie animation
└── team/
    ├── dhruv.jpg           # Team member photo
    └── ...                 # Additional team photos
```

---

## ✅ What's Already Done:

- ✅ 7 Complete sections (Hero, About, Stats, How It Works, Features, Team, Footer)
- ✅ Framer Motion animations (fade-in, slide-up, scale)
- ✅ Responsive grid layouts
- ✅ Dark mode support
- ✅ Lucide React icons
- ✅ CSS grid pattern background
- ✅ Gradient orbs with animations
- ✅ Floating cards with continuous motion
- ✅ Smooth scrolling structure

---

## 🚀 Next Steps:

1. **HIGH PRIORITY**:

   - [ ] Add logo SVG (replace "Nirmaan UI" text in navbar/footer)
   - [ ] Add hero visual (Spline 3D, screenshot, or animation)

2. **MEDIUM PRIORITY**:

   - [ ] Add team photos
   - [ ] Update social media links (GitHub, LinkedIn, Twitter)

3. **OPTIONAL**:
   - [ ] Add GSAP scroll animations
   - [ ] Create custom illustrations
   - [ ] Add video demo

---

## 💡 Asset Resources:

- **3D Models**: [Spline.design](https://spline.design)
- **Illustrations**: [unDraw](https://undraw.co), [Storyset](https://storyset.com)
- **Icons**: Already using Lucide React ✅
- **Animations**: [LottieFiles](https://lottiefiles.com)
- **Stock Photos**: [Unsplash](https://unsplash.com) (for team placeholders)

---

**Current Landing Page URL**: http://localhost:5174/

All placeholders are clearly marked with comments in the code for easy replacement!
