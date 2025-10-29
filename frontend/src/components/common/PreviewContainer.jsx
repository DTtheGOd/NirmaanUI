import { useState, useEffect } from "react";
import * as React from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Sun, Moon } from "lucide-react";

/**
 * PreviewContainer Component
 * Centralized component for rendering live previews with theme support
 *
 * Features:
 * - Sandbox rendering with react-live
 * - Theme injection (Nirmaan vs Generic)
 * - Error handling
 * - Security sanitization
 * - Props playground binding
 */
export default function PreviewContainer({
  code,
  theme = "dark",
  useNirmaanTheme = true,
  props = {},
  onError,
  height = 400,
  className = "",
  showThemeToggle = false,
  onThemeChange,
}) {
  const [sanitizedCode, setSanitizedCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    if (!code) {
      setIsLoading(false);
      return;
    }

    try {
      const cleaned = sanitizeAndTransformCode(code, props);
      setSanitizedCode(cleaned);
      setHasError(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Code sanitization/transformation failed:", error);
      setHasError(true);
      setErrorMessage(error.message);
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  }, [code, props]);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  // Security: Sanitize and transform code
  const sanitizeAndTransformCode = (rawCode, componentProps = {}) => {
    // Dangerous pattern detection
    const dangerousPatterns = [
      { pattern: /window\.location/gi, name: "window.location" },
      { pattern: /document\.cookie/gi, name: "document.cookie" },
      { pattern: /eval\s*\(/gi, name: "eval()" },
      { pattern: /Function\s*\(/gi, name: "Function()" },
      { pattern: /<script[\s>]/gi, name: "<script> tag" },
      { pattern: /javascript:\s*void/gi, name: "javascript: protocol" },
      { pattern: /XMLHttpRequest/gi, name: "XMLHttpRequest" },
      { pattern: /fetch\s*\(/gi, name: "fetch()" },
      { pattern: /postMessage/gi, name: "postMessage" },
      { pattern: /ServiceWorker/gi, name: "ServiceWorker" },
      { pattern: /importScripts/gi, name: "importScripts" },
      { pattern: /on\w+\s*=/gi, name: "inline event handlers" },
    ];

    // Check for dangerous patterns
    for (const { pattern, name } of dangerousPatterns) {
      if (pattern.test(rawCode)) {
        console.warn(`Blocked dangerous pattern: ${name}`);
        throw new Error(`Code contains potentially unsafe patterns: ${name}`);
      }
    }

    // Transform code for react-live
    let transformedCode = rawCode.trim();

    // Remove "export default" and extract the function
    if (transformedCode.includes("export default")) {
      transformedCode = transformedCode.replace(/export\s+default\s+/, "");

      // Handle function components
      if (transformedCode.match(/^function\s+\w+/)) {
        const functionMatch = transformedCode.match(/^function\s+(\w+)/);
        if (functionMatch) {
          const functionName = functionMatch[1];

          // If props are provided, inject them
          if (Object.keys(componentProps).length > 0) {
            const propsString = JSON.stringify(componentProps);
            transformedCode = `${transformedCode}\n\nrender(<${functionName} {...${propsString}} />);`;
          } else {
            transformedCode = `${transformedCode}\n\nrender(<${functionName} />);`;
          }
        }
      }
      // Handle arrow function/const components
      else if (transformedCode.match(/^const\s+\w+\s*=/)) {
        const componentMatch = transformedCode.match(/^const\s+(\w+)\s*=/);
        if (componentMatch) {
          const componentName = componentMatch[1];

          if (Object.keys(componentProps).length > 0) {
            const propsString = JSON.stringify(componentProps);
            transformedCode = `${transformedCode}\n\nrender(<${componentName} {...${propsString}} />);`;
          } else {
            transformedCode = `${transformedCode}\n\nrender(<${componentName} />);`;
          }
        }
      }
    }

    console.log(
      "Transformed code for preview:",
      transformedCode.substring(0, 200)
    );
    return transformedCode;
  };

  const handleThemeToggle = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);
    if (onThemeChange) onThemeChange(newTheme);
  };

  // Loading State
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center p-12 ${className}`}
        style={{ minHeight: `${height}px` }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full"
          />
          <p className="mt-4 text-sm text-secondary">Loading preview...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (hasError || !sanitizedCode) {
    return (
      <div
        className={`flex items-center justify-center p-12 ${className}`}
        style={{ minHeight: `${height}px` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center surface border-theme rounded-lg p-8 max-w-md"
        >
          <AlertCircle className="w-12 h-12 text-neon-red mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Preview Not Available</h3>
          <p className="text-sm text-secondary mb-2">
            {hasError ? errorMessage : "No code available for preview."}
          </p>
          {hasError && (
            <div className="mt-4 p-3 bg-neon-red/10 rounded-md text-xs text-left text-neon-red font-mono">
              Security check failed. Component contains unsafe code patterns.
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Main Preview Render
  return (
    <div className={`relative ${className}`}>
      {/* Theme CSS Injection */}
      {useNirmaanTheme && <link rel="stylesheet" href="/theme.css" />}

      {/* Theme Toggle Button */}
      {showThemeToggle && (
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-md surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
            title={`Switch to ${
              currentTheme === "dark" ? "light" : "dark"
            } mode`}
          >
            {currentTheme === "dark" ? (
              <Sun className="w-4 h-4 text-accent" />
            ) : (
              <Moon className="w-4 h-4 text-accent" />
            )}
          </button>
        </div>
      )}

      <div data-theme={currentTheme}>
        <LiveProvider
          code={sanitizedCode}
          noInline={true}
          theme={undefined}
          language="jsx"
          scope={{
            React,
            useState: React.useState,
            useEffect: React.useEffect,
            useMemo: React.useMemo,
            useCallback: React.useCallback,
            useRef: React.useRef,
            ...props,
          }}
        >
          {/* Preview Container */}
          <div
            className={`preview-container surface border-theme rounded-xl p-6 overflow-auto ${
              useNirmaanTheme ? "preview-wrapper" : ""
            }`}
            style={{ minHeight: `${height}px`, maxHeight: `${height * 2}px` }}
          >
            {/* Inject Tailwind CSS */}
            <link
              href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4/dist/tailwind.min.css"
              rel="stylesheet"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="preview-content"
              >
                <LivePreview />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Error Display */}
          <LiveError
            className="mt-4 p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg text-neon-red text-sm font-mono overflow-auto"
            style={{ whiteSpace: "pre-wrap", maxHeight: "200px" }}
          />
        </LiveProvider>
      </div>

      {/* Preview Badge */}
      <div className="absolute top-2 right-2 px-3 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm flex items-center gap-1">
        <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
        {useNirmaanTheme ? "Nirmaan Styled" : "Generic Tailwind"}
      </div>

      {/* Error Help Text */}
      <LiveError>
        {(error) =>
          error && (
            <div className="mt-4 p-4 surface border-theme rounded-lg text-sm">
              <p className="font-semibold mb-2">
                💡 <strong>Component Error:</strong>
              </p>
              <p className="text-secondary text-xs">
                This component has a runtime error. Check the error message
                above for details.
              </p>
            </div>
          )
        }
      </LiveError>
    </div>
  );
}

/**
 * Export utility function for code transformation
 * Used by export features
 */
export function convertToGenericTailwind(code) {
  // Replace custom classes with generic Tailwind equivalents
  const replacements = {
    surface: "bg-white dark:bg-gray-800",
    "bg-surface": "bg-white dark:bg-gray-800",
    "text-accent": "text-blue-500",
    "border-theme": "border border-gray-200 dark:border-gray-700",
    "glow-accent": "",
    "shadow-glow-accent": "shadow-lg",
    "bg-light-bg": "bg-gray-50",
    "bg-dark-bg": "bg-gray-900",
    "text-secondary": "text-gray-600 dark:text-gray-400",
  };

  let genericCode = code;
  Object.entries(replacements).forEach(([custom, generic]) => {
    const regex = new RegExp(`\\b${custom}\\b`, "g");
    genericCode = genericCode.replace(regex, generic);
  });

  return genericCode;
}
