/**
 * Code Transformer Utility
 *
 * Converts Nirmaan UI styled components to generic Tailwind CSS
 * by replacing custom classes with standard Tailwind equivalents.
 *
 * Features:
 * - Class name transformation (custom -> generic)
 * - CSS variable replacement (var(--accent) -> #1ABC9C)
 * - Theme-aware color mapping
 * - Preserves component structure and logic
 */

// Mapping of Nirmaan custom classes to generic Tailwind classes
const CLASS_MAPPINGS = {
  // Surface/Background Classes
  surface:
    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
  "bg-surface": "bg-white dark:bg-gray-800",
  "bg-light-surface": "bg-gray-50",
  "bg-dark-surface": "bg-gray-800",
  "bg-light-bg": "bg-gray-100",
  "bg-dark-bg": "bg-gray-900",

  // Text Classes
  "text-accent": "text-teal-500 dark:text-teal-400",
  "text-primary": "text-gray-900 dark:text-white",
  "text-secondary": "text-gray-600 dark:text-gray-400",
  "text-light-text": "text-gray-900",
  "text-dark-text": "text-white",
  "text-light-muted": "text-gray-500",
  "text-dark-muted": "text-gray-400",

  // Border Classes
  "border-theme": "border-gray-200 dark:border-gray-700",
  "border-accent": "border-teal-500 dark:border-teal-400",
  "border-light-border": "border-gray-200",
  "border-dark-border": "border-gray-700",

  // Button Classes
  "btn-accent":
    "bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-md transition-colors",
  "btn-primary":
    "bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition-colors",
  "btn-secondary":
    "bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-md transition-colors",

  // Special Effect Classes
  "glow-accent": "shadow-lg shadow-teal-500/50",
  "glow-purple": "shadow-lg shadow-purple-500/50",
  "glow-cyan": "shadow-lg shadow-cyan-500/50",

  // Gradient Classes
  "gradient-accent": "bg-gradient-to-r from-teal-400 to-cyan-500",
  "gradient-signature":
    "bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500",
  "bg-gradient-signature":
    "bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500",

  // Neon Color Classes (convert to standard equivalents)
  "text-neon-cyan": "text-cyan-400",
  "text-neon-purple": "text-purple-400",
  "text-neon-pink": "text-pink-400",
  "text-neon-green": "text-green-400",
  "text-neon-red": "text-red-400",
  "bg-neon-cyan": "bg-cyan-500",
  "bg-neon-purple": "bg-purple-500",
  "bg-neon-pink": "bg-pink-500",
};

// CSS Variable to hex/rgb color mappings
const COLOR_MAPPINGS = {
  light: {
    "--accent": "#1ABC9C",
    "--surface": "#FFFFFF",
    "--bg": "#F5F7FA",
    "--text": "#1F2937",
    "--border": "#E5E7EB",
    "--muted": "#6B7280",
    "--neon-cyan": "#00D9FF",
    "--neon-purple": "#A855F7",
    "--neon-pink": "#EC4899",
    "--neon-green": "#10B981",
    "--neon-red": "#EF4444",
  },
  dark: {
    "--accent": "#00FFC6",
    "--surface": "#1F1F23",
    "--bg": "#0F0F11",
    "--text": "#E0E0E0",
    "--border": "#2A2A2E",
    "--muted": "#9CA3AF",
    "--neon-cyan": "#00FFFF",
    "--neon-purple": "#C084FC",
    "--neon-pink": "#F472B6",
    "--neon-green": "#34D399",
    "--neon-red": "#F87171",
  },
};

/**
 * Convert custom Nirmaan classes to generic Tailwind classes
 * @param {string} code - Component code with Nirmaan classes
 * @returns {string} - Code with generic Tailwind classes
 */
export function convertCustomClassesToGeneric(code) {
  let transformedCode = code;

  // Replace each custom class with its generic equivalent
  Object.entries(CLASS_MAPPINGS).forEach(([customClass, genericClasses]) => {
    // Match the custom class in className strings
    // Handles: className="surface other-class"
    const classRegex = new RegExp(
      `(className=["'\`][^"'\`]*?)\\b${customClass}\\b([^"'\`]*?["'\`])`,
      "g"
    );
    transformedCode = transformedCode.replace(
      classRegex,
      `$1${genericClasses}$2`
    );
  });

  return transformedCode;
}

/**
 * Convert CSS variables to hex colors
 * @param {string} code - Component code with var() references
 * @param {string} theme - 'light' or 'dark'
 * @returns {string} - Code with hex colors
 */
export function convertCSSVariablesToColors(code, theme = "dark") {
  let transformedCode = code;
  const colorMap = COLOR_MAPPINGS[theme] || COLOR_MAPPINGS.dark;

  // Replace var(--variable-name) with hex colors
  Object.entries(colorMap).forEach(([variable, hexColor]) => {
    const varRegex = new RegExp(`var\\(${variable}\\)`, "g");
    transformedCode = transformedCode.replace(varRegex, hexColor);
  });

  return transformedCode;
}

/**
 * Convert Nirmaan styled component to generic Tailwind version
 * @param {string} code - Original component code
 * @param {string} theme - 'light' or 'dark' for color mapping
 * @returns {string} - Generic Tailwind version
 */
export function convertToGenericTailwind(code, theme = "dark") {
  let transformedCode = code;

  // Step 1: Convert custom classes to generic Tailwind
  transformedCode = convertCustomClassesToGeneric(transformedCode);

  // Step 2: Convert CSS variables to hex colors
  transformedCode = convertCSSVariablesToColors(transformedCode, theme);

  // Step 3: Add comment header explaining the transformation
  const header = `/*
 * This component has been converted from Nirmaan UI to generic Tailwind CSS.
 * Custom classes and CSS variables have been replaced with standard Tailwind utilities.
 * Theme: ${theme}
 */

`;

  return header + transformedCode;
}

/**
 * Generate both Nirmaan styled and generic versions
 * @param {string} code - Original component code
 * @param {string} theme - 'light' or 'dark'
 * @returns {Object} - { styled: string, generic: string }
 */
export function generateDualVersions(code, theme = "dark") {
  return {
    styled: code, // Original Nirmaan styled code
    generic: convertToGenericTailwind(code, theme), // Generic Tailwind version
  };
}

/**
 * Extract component name from code
 * @param {string} code - Component code
 * @returns {string} - Component name or 'Component'
 */
export function extractComponentName(code) {
  // Try to find function name
  const functionMatch = code.match(
    /(?:export\s+default\s+)?function\s+([A-Z][a-zA-Z0-9]*)/
  );
  if (functionMatch) return functionMatch[1];

  // Try to find const component
  const constMatch = code.match(
    /(?:export\s+)?const\s+([A-Z][a-zA-Z0-9]*)\s*=/
  );
  if (constMatch) return constMatch[1];

  return "Component";
}

/**
 * Generate README content for exported component
 * @param {Object} options - { componentName, description, hasNirmaanVersion, hasGenericVersion }
 * @returns {string} - README markdown content
 */
export function generateReadme({
  componentName = "Component",
  description = "",
  hasNirmaanVersion = true,
  hasGenericVersion = true,
}) {
  return `# ${componentName}

${description}

## Installation

### Prerequisites
- React 18+
- Tailwind CSS 3+

${
  hasNirmaanVersion
    ? `
### Nirmaan UI Version
This version uses Nirmaan UI's custom theme system.

1. Copy \`theme.css\` to your \`public\` folder
2. Import in your main HTML:
   \`\`\`html
   <link rel="stylesheet" href="/theme.css" />
   \`\`\`
3. Use the component from \`${componentName}.styled.jsx\`
`
    : ""
}

${
  hasGenericVersion
    ? `
### Generic Tailwind Version
This version uses standard Tailwind CSS classes.

1. Ensure Tailwind CSS is configured
2. Use the component from \`${componentName}.generic.jsx\`
3. No additional setup required
`
    : ""
}

## Usage

\`\`\`jsx
import ${componentName} from './${componentName}';

function App() {
  return (
    <div>
      <${componentName} />
    </div>
  );
}
\`\`\`

## Customization

Modify the Tailwind classes to match your design system.

---

**Exported from Nirmaan UI** - https://nirmaanui.com
`;
}
