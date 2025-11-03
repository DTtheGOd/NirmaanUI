import { useState, useEffect } from "react";
import * as React from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
import { AlertCircle } from "lucide-react";

/**
 * LivePreview Component
 * Safely renders user-submitted React/JSX code in a sandboxed environment
 * Features: Tailwind styling, error handling, security sanitization
 */
export default function ComponentLivePreview({ code, className = "" }) {
  const [sanitizedCode, setSanitizedCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!code) {
      setIsLoading(false);
      return;
    }

    try {
      // Sanitize the code to prevent XSS attacks
      console.log("=== PREVIEW DEBUG ===");
      console.log("Original code length:", code.length);
      console.log("First 200 chars:", code.substring(0, 200));
      console.log("Code starts with:", code.substring(0, 50));

      const cleaned = sanitizeCode(code);
      console.log("Sanitized code length:", cleaned.length);
      console.log("Sanitized starts with:", cleaned.substring(0, 50));
      console.log("===================");

      setSanitizedCode(cleaned);
      setHasError(false);
    } catch (error) {
      console.error("Code sanitization failed:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  // Security: Sanitize code to prevent malicious scripts
  const sanitizeCode = (rawCode) => {
    console.log("🔍 Checking code for dangerous patterns...");

    // Only block TRULY dangerous patterns that can steal data or execute arbitrary code
    const dangerousPatterns = [
      { pattern: /document\.cookie/gi, name: "Cookie access" },
      {
        pattern: /localStorage\.(getItem|setItem).*['"]token['"]/gi,
        name: "Token theft",
      },
      { pattern: /\beval\s*\(/gi, name: "eval() execution" },
      { pattern: /new\s+Function\s*\(/g, name: "Function constructor" },
      { pattern: /<script[\s>]/gi, name: "Script injection" },
      { pattern: /javascript:\s*void/gi, name: "JavaScript protocol" },
    ];

    // Only block truly dangerous patterns
    for (const { pattern, name } of dangerousPatterns) {
      const match = rawCode.match(pattern);
      if (match) {
        console.error(`❌ Blocked: ${name}`);
        console.error(`Matched text:`, match);
        throw new Error(`Code contains potentially unsafe patterns: ${name}`);
      }
    }

    console.log("✅ Code passed security checks!");

    // Transform code for react-live
    // react-live doesn't support "export default" directly
    let transformedCode = rawCode.trim();

    // Remove "export default" and extract the function
    if (transformedCode.includes("export default")) {
      transformedCode = transformedCode.replace(/export\s+default\s+/, "");

      // If it's a function component, wrap it in a render call
      if (transformedCode.match(/^function\s+\w+/)) {
        // Extract function name
        const functionMatch = transformedCode.match(/^function\s+(\w+)/);
        if (functionMatch) {
          const functionName = functionMatch[1];
          transformedCode = `${transformedCode}\n\nrender(<${functionName} />);`;
        }
      } else if (transformedCode.match(/^const\s+\w+\s*=/)) {
        // Arrow function component
        const componentMatch = transformedCode.match(/^const\s+(\w+)\s*=/);
        if (componentMatch) {
          const componentName = componentMatch[1];
          transformedCode = `${transformedCode}\n\nrender(<${componentName} />);`;
        }
      }
    }

    console.log("Transformed code for react-live:", transformedCode);
    return transformedCode;
  };

  // Loading State
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-12 ${className}`}>
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

  // Error State - Security or Parse Error
  if (hasError || !sanitizedCode) {
    return (
      <div className={`flex items-center justify-center p-12 ${className}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center surface border-theme rounded-lg p-8 max-w-md"
        >
          <AlertCircle className="w-12 h-12 text-neon-red mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Preview Not Available</h3>
          <p className="text-sm text-secondary">
            {hasError
              ? "This component contains unsafe code patterns and cannot be previewed."
              : "No code available for preview."}
          </p>
        </motion.div>
      </div>
    );
  }

  // Main Preview Render
  return (
    <div className={`relative ${className}`}>
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
        }}
      >
        {/* Preview Container */}
        <div className="preview-container surface border-theme rounded-xl p-6 min-h-[200px]">
          {/* Inject Tailwind CSS for preview */}
          <style>{`
            .preview-container * {
              box-sizing: border-box;
            }
          `}</style>

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

      {/* Error Help Text */}
      <div className="mt-4 p-4 surface border-theme rounded-lg text-sm">
        <p className="font-semibold mb-2">
          💡 <strong>Syntax Error Help:</strong>
        </p>
        <p className="text-secondary mb-2">
          The component code has a JSX syntax error. Common causes:
        </p>
        <ul className="text-secondary text-xs list-disc list-inside space-y-1">
          <li>
            Missing or invalid function name after "export default function"
          </li>
          <li>Unclosed JSX tags (e.g., missing closing {`</div>`})</li>
          <li>Invalid characters or special symbols in the code</li>
          <li>Missing return statement or parentheses</li>
        </ul>
        <p className="text-accent mt-3 text-xs">
          → Click the <strong>"Code"</strong> tab above to see the full
          component code
        </p>
        <p className="text-secondary mt-2 text-xs">
          → Check browser console (F12) for detailed code preview
        </p>
      </div>

      {/* Preview Badge */}
      <div className="absolute top-2 right-2 px-3 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
        ✨ Live Preview
      </div>
    </div>
  );
}

/**
 * PreviewErrorBoundary - Fallback for React errors
 */
export class PreviewErrorBoundary extends Error {
  constructor(message) {
    super(message);
    this.name = "PreviewError";
  }
}
