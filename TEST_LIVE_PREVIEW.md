# 🧪 Live Preview System - Quick Test Guide

## Test the Live Preview Feature in 3 Minutes

### 1️⃣ Start the Application

**Terminal 1 - Backend:**

```bash
cd NirmaanUI/backend
npm start
```

**Terminal 2 - Frontend:**

```bash
cd NirmaanUI/frontend
npm run dev
```

Wait for both servers to start. Frontend should open at `http://localhost:5173`

---

### 2️⃣ Test Quick Preview on Explore Page

1. Navigate to **Explore** page
2. **Hover** over any component card
3. Look for the **Eye icon** button (top-right corner, appears on hover)
4. **Click the Eye icon** → Preview modal should open
5. Verify:
   - ✅ Component renders live in the modal
   - ✅ Tailwind styles are applied
   - ✅ "Copy Code" button works
   - ✅ "View Details" link works
   - ✅ Clicking outside closes modal
   - ✅ X button closes modal

---

### 3️⃣ Test Tabbed Interface on Detail Page

1. Click **"View Details"** on any component (or navigate from Explore)
2. You should see **3 tabs**: Preview | Code | Info
3. **Preview Tab** (Default):
   - ✅ Component renders live
   - ✅ Toolbar with "Copy Code" and "Open in New Tab"
   - ✅ Gradient background
   - ✅ "✨ Live Preview" badge visible
4. **Code Tab**:
   - ✅ Click "Code" tab
   - ✅ Syntax-highlighted code appears
   - ✅ Copy button works
5. **Info Tab**:
   - ✅ Click "Info" tab
   - ✅ Description, metadata, stats, and tags display
   - ✅ Statistics cards show counts

---

### 4️⃣ Test Security (Malicious Code)

**Create a test component with blocked patterns:**

1. Go to **Upload Component** page
2. Paste this code:

```jsx
export default function BadComponent() {
  window.alert("This should be blocked!");
  document.write("Unsafe code");
  return <div>Test Component</div>;
}
```

3. Upload the component
4. View the preview
5. Verify:
   - ✅ Preview shows "Preview Not Available" error
   - ✅ Message: "This component contains unsafe code patterns"
   - ✅ No alert popup appears
   - ✅ No document.write execution

---

### 5️⃣ Test Working Component

**Create a safe Tailwind component:**

1. Go to **Upload Component** page
2. Paste this code:

```jsx
import { useState } from "react";

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Click Counter
      </h2>
      <div className="text-6xl font-bold text-blue-500">{count}</div>
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform shadow-lg"
      >
        Click Me!
      </button>
      <button
        onClick={() => setCount(0)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
```

3. Fill in:
   - Title: "Interactive Button Counter"
   - Category: "Buttons"
   - Description: "A beautiful click counter with gradient buttons"
   - Tags: "interactive", "counter", "gradient"
4. Upload the component
5. Test preview:
   - ✅ Component renders with Tailwind styles
   - ✅ Clicking "Click Me!" increments counter
   - ✅ Reset button works
   - ✅ Gradient and hover effects work
   - ✅ Dark mode styling applies

---

### 6️⃣ Test Responsive Design

**Desktop (> 1024px):**

- ✅ Sidebar stays open
- ✅ Modal uses inset-20 (large)
- ✅ Preview renders full-width

**Tablet (768px - 1024px):**

- ✅ Sidebar toggle works
- ✅ Modal uses inset-10 (medium)
- ✅ Tabs remain horizontal

**Mobile (< 768px):**

- ✅ Sidebar collapses, toggle appears
- ✅ Modal uses inset-4 (small)
- ✅ Preview scales down
- ✅ No horizontal scroll

**Test Method:**

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test iPhone SE, iPad, and Desktop sizes

---

### 7️⃣ Test Error Handling

**Test 1: Empty Code**

- Upload component with empty code field
- Preview should show: "No code available for preview"

**Test 2: Invalid JSX**

- Paste code with syntax errors:

```jsx
export default function Broken() {
  return <div>Unclosed div
}
```

- Preview should show red error box with error message

**Test 3: Network Issues**

- Disconnect internet (or stop backend)
- Try to load component
- Verify graceful error handling

---

### 8️⃣ Performance Check

**Test Load Times:**

1. Open Network tab in DevTools
2. Navigate to a component
3. Measure time to preview render:
   - ✅ Should be < 2 seconds
4. Open/close preview modal 10 times:
   - ✅ No lag or memory leaks
5. Switch tabs 20 times:
   - ✅ Smooth animations (60fps)

---

## ✅ Expected Results

### All Green Checks = Success! 🎉

| Test                                      | Status |
| ----------------------------------------- | ------ |
| Quick preview modal opens/closes          | ✅     |
| Live preview renders components           | ✅     |
| Tabbed interface (Preview/Code/Info)      | ✅     |
| Security blocks malicious code            | ✅     |
| Tailwind CSS styles work                  | ✅     |
| Interactive components (useState) work    | ✅     |
| Copy code button works                    | ✅     |
| Responsive design (mobile/tablet/desktop) | ✅     |
| Error handling displays correctly         | ✅     |
| Performance < 2 seconds load              | ✅     |
| Animations smooth (60fps)                 | ✅     |
| No console errors                         | ✅     |

---

## 🐛 Common Issues & Fixes

### Issue: Preview doesn't render

**Fix:** Check if component uses external dependencies (axios, react-router). These won't work in sandbox.

### Issue: Styles not applied

**Fix:** Make sure component uses Tailwind classes. Custom CSS won't work.

### Issue: Modal doesn't close

**Fix:** Check for JavaScript errors in console. Ensure AnimatePresence is imported.

### Issue: "Preview Not Available" for valid code

**Fix:** Check if code contains blacklisted patterns (window, fetch, etc.). Remove them.

### Issue: Slow performance

**Fix:** Simplify component. Avoid heavy computations or large data sets in preview.

---

## 📊 Testing Checklist

Print this and check off as you test:

```
Frontend Features:
□ Install dependencies (react-live, dompurify, lucide-react)
□ LivePreview component renders without errors
□ ComponentDetailPage shows 3 tabs
□ Explore page shows hover preview button
□ Modal opens/closes smoothly
□ All buttons functional (Copy, View Details, Close)

Backend Features:
□ Component model has hasLivePreview field
□ Existing components still load correctly
□ No database errors

Security Features:
□ Malicious code blocked (window, eval, fetch)
□ XSS attempts sanitized
□ Error messages don't expose internals
□ No script injection possible

UX/UI Features:
□ Animations smooth (Framer Motion)
□ Dark/light mode works in preview
□ Responsive on mobile/tablet/desktop
□ Loading states show spinner
□ Error states show helpful messages

Performance:
□ Preview loads < 2 seconds
□ No memory leaks after 10+ previews
□ Tab switching is instant
□ Modal animations are 60fps
```

---

## 🚀 Next Steps After Testing

If all tests pass:

1. ✅ Mark feature as **Production Ready**
2. 📝 Update main README with Live Preview section
3. 🎨 Consider adding tutorial for users
4. 📊 Set up analytics to track preview usage
5. 🌟 Deploy to production!

If tests fail:

1. 🐛 Check console for errors
2. 📋 Create bug report with steps to reproduce
3. 🔍 Debug with simplified test components
4. 💬 Ask for help with specific error messages

---

**Happy Testing! 🎉**

_Built with ❤️ for the Nirmaan UI community_
