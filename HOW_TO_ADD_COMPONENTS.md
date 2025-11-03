# 🎨 How to Add Components to Nirmaan UI

## 📋 **Two Methods to Add Components**

### **Method 1: Frontend Only (Quick & Easy)** ⭐ Recommended for now

- Add components directly to the frontend registry
- No API calls needed
- Perfect for building your component library

### **Method 2: Via API (Database)**

- Store components in MongoDB
- Requires authentication
- Good for dynamic, user-submitted components

---

## 🚀 **Method 1: Add Components to Frontend Registry**

### **Step 1: Create the Component File**

Create a new file in `frontend/src/components/showcase/`

**Example:** `frontend/src/components/showcase/Badge.jsx`

```javascript
import { motion } from "framer-motion";

export default function Badge({
  children,
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary: "bg-primary-100 text-primary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
```

---

### **Step 2: Add to ComponentShowcase.jsx**

**File:** `frontend/src/pages/ComponentShowcase.jsx`

```javascript
// 1. Import the component
import Badge from "../components/showcase/Badge";

// 2. Add to samples array
const samples = [
  {
    slug: "button",
    name: "Button",
    category: "Common",
    preview: <Button>Click me</Button>,
  },
  {
    slug: "card",
    name: "Card",
    category: "Layout",
    preview: <Card title="Sample Card">This is a simple card component</Card>,
  },
  {
    slug: "input",
    name: "Input",
    category: "Forms",
    preview: (
      <Input label="Email" placeholder="Enter your email" type="email" />
    ),
  },
  // ADD YOUR NEW COMPONENT HERE
  {
    slug: "badge",
    name: "Badge",
    category: "Common",
    preview: (
      <div className="flex gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>
    ),
  },
];
```

---

### **Step 3: Add to ComponentDetail.jsx**

**File:** `frontend/src/pages/ComponentDetail.jsx`

```javascript
// 1. Import the component
import Badge from "../components/showcase/Badge";

// 2. Add to registry object
const registry = {
  button: {
    /* ... */
  },
  card: {
    /* ... */
  },
  input: {
    /* ... */
  },

  // ADD YOUR NEW COMPONENT HERE
  badge: {
    title: "Badge",
    preview: (
      <div className="flex gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>
    ),
    code: `import { motion } from 'framer-motion'

export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={\`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium \${variants[variant]} \${className}\`}
    >
      {children}
    </motion.span>
  )
}`,
  },
};
```

---

### **✅ That's it!**

Refresh your browser and you'll see:

- New component in the showcase grid
- Click "View" to see the detail page
- Copy JSX code with one click

---

## 🗄️ **Method 2: Add Components via API (Advanced)**

Use this when you want to store components in MongoDB.

### **Option A: Via Postman/Thunder Client**

**1. Login first to get JWT token:**

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "your@email.com",
  "password": "your password"
}
```

**2. Copy the `token` from response**

**3. Create component:**

```
POST http://localhost:5000/api/components
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "name": "Badge",
  "slug": "badge",
  "category": "Common",
  "description": "A colorful badge component",
  "code": "import { motion } from 'framer-motion'\n\nexport default function Badge..."
}
```

---

### **Option B: Via Frontend (Build a Form)**

Create a "Add Component" page:

```javascript
// Example: frontend/src/pages/AddComponent.jsx
import { useState } from "react";
import api from "../services/api";

export default function AddComponent() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/components", { name, slug, code, category: "Common" });
      alert("Component added!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
      />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="JSX Code"
      />
      <button type="submit">Add Component</button>
    </form>
  );
}
```

---

## **Quick Component Template**

Copy this template for new components:

```javascript
import { motion } from "framer-motion";

export default function ComponentName({ children, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`your-styles-here ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

---

## 🎯 **Component Ideas to Add**

- ✅ **Badge** - Status indicators
- ✅ **Alert** - Success/error messages
- ✅ **Modal** - Popup dialogs
- ✅ **Dropdown** - Select menus
- ✅ **Tabs** - Tab navigation
- ✅ **Avatar** - User profile pictures
- ✅ **Tooltip** - Hover hints
- ✅ **Spinner** - Loading indicators
- ✅ **Checkbox** - Form inputs
- ✅ **Radio** - Form inputs
- ✅ **Toggle** - Switch components
- ✅ **Progress Bar** - Loading progress
- ✅ **Breadcrumb** - Navigation trail

---

## 🎨 **Best Practices**

1. **Use Framer Motion** for animations
2. **Use TailwindCSS** for styling
3. **Make it reusable** with props
4. **Keep it simple** - one component, one purpose
5. **Add variants** for different styles
6. **Document props** in comments

---

## ✅ **You Just Added:**

✅ **Input Component** - Ready to use!

**Check it out:**

1. Go to http://localhost:5173/components
2. You'll see "Input" in the grid
3. Click "View" to see the detail page
4. Copy the JSX code!

---

**Want to add more components? Just follow the 3 steps above!** 🚀
