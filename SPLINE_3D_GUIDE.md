# 🎨 Spline 3D Integration Guide for Nirmaan UI

## Quick Start: Create Your Hero Visual in 5 Minutes

### **Step 1: Access Spline**

🔗 Go to: https://spline.design

- Click "Try for Free" (no credit card required)
- Sign up with Google/GitHub

---

### **Step 2: Choose a Template or Create from Scratch**

#### **Recommended Templates for Nirmaan UI:**

1. **"Abstract 3D Scene"** (Most Popular)

   - Search: "abstract shapes", "floating objects", "particles"
   - Perfect for tech/SaaS landing pages

2. **"Dashboard/UI Scene"**

   - Search: "dashboard", "UI components", "interface"
   - Shows component-like 3D objects

3. **"Isometric Workspace"**
   - Search: "isometric", "workspace", "developer"
   - Developer-themed scene

#### **Start from Scratch:**

- Click "New File"
- Add basic shapes (Box, Sphere, Torus)
- Apply gradient materials matching Nirmaan colors:
  - Primary: `#00FFC6` (aqua-mint)
  - Secondary: `#B300FF` (purple)
  - Tertiary: `#0078FF` (blue)

---

### **Step 3: Customize Your Scene**

#### **Recommended Elements:**

```
✅ 3-5 floating geometric shapes (cubes, spheres, toruses)
✅ Glass/translucent materials
✅ Gradient colors (aqua → blue → purple)
✅ Subtle rotation animation
✅ Depth of field (blur background)
✅ Bloom effect for glow
```

#### **Color Palette (Copy These Hex Codes):**

- **Aqua Mint**: `#00FFC6`
- **Electric Blue**: `#0078FF`
- **Neon Purple**: `#B300FF`
- **Background**: `#FFF8DC` (light mode) or `#050507` (dark mode)

#### **Animation Tips:**

- Add "Continuous" rotation to shapes (X: 0, Y: 1, Z: 0)
- Speed: 10-20 for smooth rotation
- Keep animations subtle (not distracting)

---

### **Step 4: Export for Web**

1. Click **"Export"** button (top right)
2. Select **"Export for Web"**
3. Choose **"Embed"** option
4. Copy the `<iframe>` code or React component

**Export Settings:**

- ✅ Include Code
- ✅ Auto Rotate (optional)
- ✅ Transparent Background (if you want to see page background)
- Resolution: 1920x1080 or higher

---

### **Step 5: Integrate into Nirmaan UI**

#### **Option A: Iframe Embed** (Easiest)

Open `Landing.jsx` and find this section (around line 150):

```jsx
{
  /* Placeholder for Spline 3D or Screenshot */
}
<div className="aspect-video surface border-theme rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-accent/5 to-neon-purple/5">
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center">
      <LayoutGrid className="w-24 h-24 mx-auto text-accent/30 mb-4" />
      <p className="text-secondary">
        Hero visual placeholder - Add Spline 3D or screenshot here
      </p>
    </div>
  </div>
</div>;
```

**Replace with:**

```jsx
{
  /* Spline 3D Scene */
}
<div className="aspect-video surface border-theme rounded-2xl shadow-2xl overflow-hidden">
  <iframe
    src="YOUR_SPLINE_URL_HERE"
    frameBorder="0"
    width="100%"
    height="100%"
    className="w-full h-full"
  />
</div>;
```

#### **Option B: React Component** (Advanced - Better Performance)

1. Install Spline React:

```bash
npm install @splinetool/react-spline
```

2. Import in `Landing.jsx`:

```jsx
import Spline from "@splinetool/react-spline";
```

3. Replace placeholder:

```jsx
<div className="aspect-video surface border-theme rounded-2xl shadow-2xl overflow-hidden">
  <Spline scene="YOUR_SPLINE_SCENE_URL" className="w-full h-full" />
</div>
```

---

### **Step 6: Optimize Performance**

#### **Spline Scene Optimization:**

- Keep polygon count under 50K
- Use simple shapes
- Limit number of objects (5-10 max)
- Avoid complex textures
- Use solid colors or gradients

#### **React Integration:**

```jsx
// Lazy load Spline for better performance
const Spline = lazy(() => import("@splinetool/react-spline"));

// Add loading state
<Suspense
  fallback={
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
    </div>
  }
>
  <Spline scene="YOUR_URL" />
</Suspense>;
```

---

## 🎯 Spline Scene Ideas for Nirmaan UI

### **Idea 1: Floating Component Cards**

```
- 3D card shapes with rounded corners
- Floating at different heights
- Subtle rotation
- Glass material with transparency
- Gradient borders
```

### **Idea 2: Abstract Shapes**

```
- Mix of cubes, spheres, toruses
- Aqua-blue-purple gradient materials
- Orbital animation
- Depth of field blur
- Bloom glow effect
```

### **Idea 3: Code Block Scene**

```
- 3D code editor mockup
- Floating UI elements
- Terminal window
- Component previews
- Interactive hover states
```

### **Idea 4: Isometric Workspace**

```
- Desk with laptop
- Floating screens
- Code symbols
- Minimalist design
- Pastel colors
```

---

## 📸 Alternative: Use a Screenshot

If Spline is too complex, create a great screenshot:

### **What to Screenshot:**

1. Open your app at http://localhost:5174/explore
2. Select a beautiful component
3. Show the live preview feature
4. Use browser dev tools to set viewport: 1920x1080
5. Take screenshot (Windows: Win+Shift+S, Mac: Cmd+Shift+4)

### **Screenshot Editing:**

- Add subtle shadow/glow in Photoshop/Figma
- Add browser frame mockup (optional)
- Export as optimized PNG (< 500KB)

### **Integration:**

```jsx
import heroMockup from "../assets/hero-mockup.png";

<img
  src={heroMockup}
  alt="Nirmaan UI Components"
  className="w-full h-full object-cover rounded-2xl"
/>;
```

---

## ✨ Pro Tips

### **Spline Best Practices:**

1. **Keep it Simple** - Less is more, 5-7 objects max
2. **Match Brand Colors** - Use your exact hex codes
3. **Subtle Animation** - Slow rotation (10-15 speed)
4. **Test Performance** - Check on slower devices
5. **Fallback** - Have a static image backup

### **Free Spline Alternatives:**

- **Vectary** (https://vectary.com) - Similar to Spline
- **Three.js** - Custom code (more complex)
- **Rive** (https://rive.app) - 2D animations

### **No-Code Option:**

Just use a **high-quality screenshot** of your app! Sometimes simple is best.

---

## 🎬 Video Tutorial Resources

### **Spline Tutorials:**

- YouTube: "Spline 3D Tutorial for Beginners"
- YouTube: "Spline Landing Page Hero Section"
- Official Docs: https://docs.spline.design

### **Recommended Channels:**

- Spline Official YouTube
- DesignCourse
- Flux Academy

---

## 🚀 Quick Win: Copy a Community Scene

### **Spline Community:**

1. Go to https://spline.design/community
2. Search: "abstract", "shapes", "landing page"
3. Find a scene you like
4. Click "Remix"
5. Customize colors to match Nirmaan UI
6. Export and integrate!

**Popular Scenes to Remix:**

- "Abstract Gradient Shapes"
- "Floating UI Elements"
- "Tech Background"
- "3D Dashboard"

---

## ✅ Final Checklist

- [ ] Created Spline account
- [ ] Chose template or created custom scene
- [ ] Applied Nirmaan UI colors (#00FFC6, #0078FF, #B300FF)
- [ ] Added subtle animations
- [ ] Exported for web
- [ ] Integrated iframe/React component
- [ ] Tested performance
- [ ] Optimized scene (< 50K polygons)
- [ ] Added fallback image

---

**Time Estimate**:

- Quick (using template): **5-10 minutes**
- Custom scene: **30-60 minutes**
- Screenshot alternative: **2 minutes**

**Recommendation**: Start with a community template, customize colors, and iterate! 🎨

**Current Landing Page**: http://localhost:5174/ (ready for your 3D scene!)
