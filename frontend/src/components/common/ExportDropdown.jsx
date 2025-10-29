import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Download,
  ChevronDown,
  FileCode,
  Sparkles,
  Package,
  Check,
} from "lucide-react";
import {
  convertToGenericTailwind,
  generateDualVersions,
  extractComponentName,
  generateReadme,
} from "../../utils/codeTransformer";
import JSZip from "jszip";
import { saveAs } from "file-saver";

/**
 * ExportDropdown Component
 *
 * Multi-format export dropdown for component code.
 *
 * Options:
 * 1. Copy JSX (Styled) - Nirmaan UI version with custom classes
 * 2. Copy JSX (Generic) - Standard Tailwind version
 * 3. Download ZIP - Complete package with both versions + README
 *
 * @param {string} code - Original component code
 * @param {string} theme - Current theme ('dark' or 'light')
 * @param {string} description - Component description for README
 * @param {string} className - Additional CSS classes
 */
export default function ExportDropdown({
  code,
  theme = "dark",
  description = "",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedType, setCopiedType] = useState(null); // 'styled', 'generic', or null
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyStyled = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedType("styled");
      setTimeout(() => setCopiedType(null), 2000);
    } catch (error) {
      console.error("Failed to copy styled code:", error);
    }
  };

  const handleCopyGeneric = async () => {
    try {
      const genericCode = convertToGenericTailwind(code, theme);
      await navigator.clipboard.writeText(genericCode);
      setCopiedType("generic");
      setTimeout(() => setCopiedType(null), 2000);
    } catch (error) {
      console.error("Failed to copy generic code:", error);
    }
  };

  const handleDownloadZIP = async () => {
    try {
      const zip = new JSZip();
      const componentName = extractComponentName(code);
      const versions = generateDualVersions(code, theme);

      // Add styled version
      zip.file(`${componentName}.styled.jsx`, versions.styled);

      // Add generic version
      zip.file(`${componentName}.generic.jsx`, versions.generic);

      // Add README
      const readme = generateReadme({
        componentName,
        description,
        hasNirmaanVersion: true,
        hasGenericVersion: true,
      });
      zip.file("README.md", readme);

      // Add theme.css for Nirmaan version
      // Fetch theme.css from public folder
      try {
        const themeCSSResponse = await fetch("/theme.css");
        if (themeCSSResponse.ok) {
          const themeCSSContent = await themeCSSResponse.text();
          zip.file("theme.css", themeCSSContent);
        }
      } catch (err) {
        console.warn("Could not fetch theme.css:", err);
      }

      // Generate ZIP file
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `${componentName}-package.zip`);

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to generate ZIP:", error);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 btn-accent rounded-md transition-all hover:shadow-lg"
      >
        {copiedType ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Export</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 surface border-theme rounded-lg shadow-xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-light-border dark:border-dark-border bg-light-surface/50 dark:bg-dark-surface/50">
              <h3 className="font-semibold text-sm">Export Options</h3>
              <p className="text-xs text-secondary mt-0.5">
                Choose your preferred format
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* Copy JSX (Styled) */}
              <button
                onClick={handleCopyStyled}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-light-surface dark:hover:bg-dark-surface transition-colors text-left"
              >
                <div className="p-2 rounded-md bg-accent/10 text-accent">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      Copy JSX (Styled)
                    </span>
                    {copiedType === "styled" && (
                      <Check className="w-3.5 h-3.5 text-accent" />
                    )}
                  </div>
                  <p className="text-xs text-secondary mt-0.5">
                    Nirmaan UI version with custom classes
                  </p>
                </div>
                <Copy className="w-4 h-4 text-secondary opacity-50" />
              </button>

              {/* Copy JSX (Generic) */}
              <button
                onClick={handleCopyGeneric}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-light-surface dark:hover:bg-dark-surface transition-colors text-left"
              >
                <div className="p-2 rounded-md bg-blue-500/10 text-blue-500">
                  <FileCode className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      Copy JSX (Generic)
                    </span>
                    {copiedType === "generic" && (
                      <Check className="w-3.5 h-3.5 text-accent" />
                    )}
                  </div>
                  <p className="text-xs text-secondary mt-0.5">
                    Standard Tailwind CSS version
                  </p>
                </div>
                <Copy className="w-4 h-4 text-secondary opacity-50" />
              </button>

              {/* Divider */}
              <div className="my-2 border-t border-light-border dark:border-dark-border"></div>

              {/* Download ZIP */}
              <button
                onClick={handleDownloadZIP}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-light-surface dark:hover:bg-dark-surface transition-colors text-left"
              >
                <div className="p-2 rounded-md bg-purple-500/10 text-purple-500">
                  <Package className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-sm">
                    Download ZIP Package
                  </span>
                  <p className="text-xs text-secondary mt-0.5">
                    Both versions + README + theme.css
                  </p>
                </div>
                <Download className="w-4 h-4 text-secondary opacity-50" />
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-light-border dark:border-dark-border bg-light-surface/30 dark:bg-dark-surface/30">
              <p className="text-xs text-secondary text-center">
                💡 ZIP includes setup instructions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
