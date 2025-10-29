# 🔧 Live Preview Troubleshooting Guide

## Issue: "Preview Not Available - Unsafe code patterns"

### ✅ **FIXED!** - Updated Security Rules

The security sanitization was too strict and blocking valid React code. I've updated the `LivePreview.jsx` component to be less aggressive.

---

## 🔍 What Was Changed:

### Before (Too Strict):

```javascript
// Blocked: window, document, fetch, onClick, etc.
// Problem: DOMPurify was stripping all JSX code
```

### After (Balanced Security):

```javascript
// Only blocks truly dangerous patterns:
- window.location (redirects)
- document.cookie (cookie theft)
- eval() (code injection)
- <script> tags (XSS attacks)
- XMLHttpRequest (network requests)
```

**Now allows:**

- ✅ onClick, onChange events
- ✅ useState, useEffect hooks
- ✅ All Tailwind classes
- ✅ Standard React patterns

---

## 🧪 Test Your Fix:

### 1. **Refresh the Page**

- Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- This ensures the new code is loaded

### 2. **Check Browser Console**

- Press `F12` to open developer tools
- Go to Console tab
- Look for these logs:
  ```
  Original code: export default function...
  Sanitized code: export default function...
  ```
- If you see these, the code is being processed

### 3. **Test with Simple Component**

Upload this code:

```jsx
export default function TestButton() {
  return (
    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
      Hello World
    </button>
  );
}
```

---

## 🐛 Common Issues & Fixes:

### Issue 1: "Preview Not Available" Still Shows

**Possible Causes:**

1. Browser cache not cleared
2. Code contains actual dangerous patterns
3. Component has syntax errors

**Solutions:**

```bash
# 1. Hard refresh browser
Ctrl + Shift + R

# 2. Restart dev server
cd NirmaanUI/frontend
npm run dev

# 3. Check code for:
- Missing import statements
- Syntax errors (unclosed brackets, etc.)
- Actual dangerous code (eval, script tags)
```

### Issue 2: Component Renders But Looks Wrong

**Possible Causes:**

- Missing Tailwind classes
- Component needs external CSS
- Component expects props

**Solutions:**

```jsx
// ✅ Good: Self-contained with Tailwind
export default function Card() {
  return <div className="p-4 bg-white rounded-lg">Card</div>;
}

// ❌ Bad: Expects external CSS
export default function Card() {
  return <div className="my-custom-class">Card</div>;
}
```

### Issue 3: Interactive Elements Don't Work

**Possible Causes:**

- Missing useState import
- Event handlers not properly bound

**Solutions:**

```jsx
// ✅ Good: Complete imports and handlers
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// ❌ Bad: Missing import
export default function Counter() {
  const [count, setCount] = useState(0); // Error!
  return <button onClick={() => setCount(count + 1)}>Count</button>;
}
```

---

## 🔍 Debug Checklist:

- [ ] Browser console open (F12)
- [ ] No red errors in console
- [ ] See "Original code:" log
- [ ] See "Sanitized code:" log
- [ ] Component code is valid JSX
- [ ] All imports are included
- [ ] No external dependencies
- [ ] Page hard refreshed

---

## 📝 Allowed vs Blocked Patterns:

### ✅ **ALLOWED:**

```jsx
// React Hooks
useState, useEffect, useMemo, useCallback, useRef

// Event Handlers
onClick, onChange, onSubmit, onMouseEnter, etc.

// Tailwind CSS
className="px-4 py-2 bg-blue-500 hover:bg-blue-600"

// Inline Styles
style={{ color: 'red', padding: '10px' }}

// JavaScript Methods
.map(), .filter(), .reduce(), .forEach()

// Conditional Rendering
{condition && <div>Show</div>}
{condition ? <A /> : <B />}
```

### ❌ **BLOCKED (Security):**

```jsx
// Global Objects
window.location = "..."  // Redirects
document.cookie          // Cookie theft

// Code Execution
eval("code")
new Function("code")

// Network Requests
fetch("url")
XMLHttpRequest

// Script Tags
<script>alert('xss')</script>

// Dangerous URLs
<a href="javascript:void(0)">
```

---

## 🚀 Quick Test Script:

Open browser console on the Component Detail page and run:

```javascript
// Check if LivePreview component exists
const preview = document.querySelector(".preview-container");
console.log("Preview container found:", !!preview);

// Check for errors
const errors = document.querySelector(".text-neon-red");
console.log("Error element found:", !!errors);
```

---

## 📊 Expected Behavior:

### ✅ **Working Preview:**

1. Preview tab loads without errors
2. Component renders with Tailwind styles
3. Interactive elements work (buttons, counters)
4. No "Preview Not Available" message
5. Console shows code logs (debug mode)

### ❌ **Not Working:**

1. Shows "Preview Not Available"
2. Console shows errors
3. Red error box appears
4. Component doesn't render

---

## 🆘 Still Not Working?

### Step 1: Check Component Code

Look at the component code in MongoDB. Does it contain:

- `window.location`
- `document.cookie`
- `eval()`
- `<script>` tags

If yes, these are legitimately blocked for security.

### Step 2: Check Console Errors

Press F12 and look for:

- Red error messages
- "Blocked dangerous pattern:" warnings
- React errors

### Step 3: Test with Known-Good Code

Use this guaranteed-to-work component:

```jsx
export default function Safe() {
  return <div className="p-4 text-2xl">✅ It Works!</div>;
}
```

If this doesn't work, there's a deeper issue.

### Step 4: Restart Everything

```bash
# Kill both servers (Ctrl+C)

# Start backend
cd NirmaanUI/backend
npm start

# Start frontend (new terminal)
cd NirmaanUI/frontend
npm run dev

# Clear browser cache
# Hard refresh: Ctrl+Shift+R
```

---

## 🎯 Success Indicators:

**Preview is working when you see:**

1. ✅ Component renders visually
2. ✅ Tailwind styles apply
3. ✅ No error messages
4. ✅ Console shows debug logs
5. ✅ Interactive elements respond

---

## 📞 Get Help:

If preview still doesn't work after trying all steps:

1. **Check the console logs** - Share any error messages
2. **Share the component code** - What code are you trying to preview?
3. **Share the debug logs** - What do the console.log messages show?

---

## 🔄 Recent Changes Applied:

**File:** `frontend/src/components/common/LivePreview.jsx`

**Changes:**

1. ✅ Reduced security blacklist to only critical patterns
2. ✅ Removed aggressive DOMPurify sanitization
3. ✅ Added debug console.log statements
4. ✅ Improved error messages

**Result:**

- Regular React components should now work
- Only actual malicious code is blocked
- Better debugging information

---

**Updated:** October 25, 2025
**Status:** ✅ Fixed - Less aggressive security, better compatibility
