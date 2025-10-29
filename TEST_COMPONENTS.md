# 🧪 Test Component for Live Preview

## Simple Test Component (Paste this code when uploading)

```jsx
export default function TestButton() {
  return (
    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg">
      Click Me!
    </button>
  );
}
```

## Interactive Test Component

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Counter: {count}
      </h2>
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform shadow-lg"
      >
        Increment
      </button>
    </div>
  );
}
```

## Card Component

```jsx
export default function Card() {
  return (
    <div className="max-w-sm p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
        Beautiful Card
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        This card component has dark mode support and looks amazing!
      </p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Learn More
      </button>
    </div>
  );
}
```

## Gradient Button

```jsx
export default function GradientButton() {
  return (
    <div className="flex gap-4 flex-wrap">
      <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:scale-105 transition-transform shadow-lg">
        Pink to Orange
      </button>
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:scale-105 transition-transform shadow-lg">
        Blue to Cyan
      </button>
      <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform shadow-lg">
        Purple to Pink
      </button>
    </div>
  );
}
```

## Instructions:

1. Go to Upload Component page
2. Copy one of the code samples above
3. Paste it in the code field
4. Fill in title, description, category
5. Click Upload
6. Navigate to the component detail page
7. You should see the live preview working!

## If Preview Still Shows Error:

1. Open browser console (F12)
2. Check for error messages
3. Look for the "Original code:" and "Sanitized code:" console logs
4. Share the error message so we can fix it
