import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Copy, ChevronDown, ChevronUp } from "lucide-react";

/**
 * PropsPlayground Component
 *
 * Interactive props editor for live component preview.
 * Renders form inputs based on propsSchema and updates preview in real-time.
 *
 * @param {Object} propsSchema - Schema defining prop types and defaults
 *   Example: {
 *     variant: { type: "string", default: "primary", options: ["primary", "secondary"] },
 *     size: { type: "string", default: "md", options: ["sm", "md", "lg"] },
 *     disabled: { type: "boolean", default: false },
 *     count: { type: "number", default: 0, min: 0, max: 100 },
 *     color: { type: "color", default: "#1ABC9C" }
 *   }
 * @param {Object} initialProps - Initial prop values
 * @param {Function} onPropsChange - Callback when props change (props) => void
 * @param {String} className - Additional CSS classes
 */
export default function PropsPlayground({
  propsSchema = {},
  initialProps = {},
  onPropsChange,
  className = "",
}) {
  const [props, setProps] = useState(initialProps);
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  // Initialize props with defaults from schema
  useEffect(() => {
    const defaultProps = {};
    Object.entries(propsSchema).forEach(([key, config]) => {
      defaultProps[key] =
        initialProps[key] !== undefined ? initialProps[key] : config.default;
    });
    setProps(defaultProps);
  }, [propsSchema, initialProps]);

  // Notify parent when props change
  useEffect(() => {
    if (onPropsChange) {
      onPropsChange(props);
    }
  }, [props, onPropsChange]);

  const handlePropChange = (propName, value) => {
    setProps((prev) => ({
      ...prev,
      [propName]: value,
    }));
  };

  const handleReset = () => {
    const defaultProps = {};
    Object.entries(propsSchema).forEach(([key, config]) => {
      defaultProps[key] = config.default;
    });
    setProps(defaultProps);
  };

  const handleCopyProps = async () => {
    try {
      const propsString = JSON.stringify(props, null, 2);
      await navigator.clipboard.writeText(propsString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy props:", error);
    }
  };

  const renderInput = (propName, config) => {
    const value = props[propName];

    switch (config.type) {
      case "string":
        if (config.options && config.options.length > 0) {
          // Dropdown for string with options
          return (
            <select
              value={value || config.default || ""}
              onChange={(e) => handlePropChange(propName, e.target.value)}
              className="w-full px-3 py-2 rounded-md surface border-theme focus:ring-2 focus:ring-accent focus:outline-none text-sm"
            >
              {config.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        } else {
          // Text input for free-form string
          return (
            <input
              type="text"
              value={value || ""}
              onChange={(e) => handlePropChange(propName, e.target.value)}
              placeholder={config.placeholder || `Enter ${propName}`}
              className="w-full px-3 py-2 rounded-md surface border-theme focus:ring-2 focus:ring-accent focus:outline-none text-sm"
            />
          );
        }

      case "number":
        return (
          <input
            type="number"
            value={value !== undefined ? value : config.default || 0}
            onChange={(e) =>
              handlePropChange(propName, parseFloat(e.target.value))
            }
            min={config.min}
            max={config.max}
            step={config.step || 1}
            className="w-full px-3 py-2 rounded-md surface border-theme focus:ring-2 focus:ring-accent focus:outline-none text-sm"
          />
        );

      case "boolean":
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => handlePropChange(propName, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 surface border-theme rounded-full peer peer-checked:bg-accent transition-all"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </div>
            <span className="text-sm text-secondary">
              {value ? "Enabled" : "Disabled"}
            </span>
          </label>
        );

      case "color":
        return (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value || config.default || "#1ABC9C"}
              onChange={(e) => handlePropChange(propName, e.target.value)}
              className="w-12 h-10 rounded-md cursor-pointer border border-light-border dark:border-dark-border"
            />
            <input
              type="text"
              value={value || config.default || "#1ABC9C"}
              onChange={(e) => handlePropChange(propName, e.target.value)}
              placeholder="#1ABC9C"
              className="flex-1 px-3 py-2 rounded-md surface border-theme focus:ring-2 focus:ring-accent focus:outline-none text-sm font-mono"
            />
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => handlePropChange(propName, e.target.value)}
            className="w-full px-3 py-2 rounded-md surface border-theme focus:ring-2 focus:ring-accent focus:outline-none text-sm"
          />
        );
    }
  };

  // If no props schema, don't render anything
  if (!propsSchema || Object.keys(propsSchema).length === 0) {
    return null;
  }

  return (
    <div
      className={`surface border-theme rounded-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b border-light-border dark:border-dark-border bg-light-surface/50 dark:bg-dark-surface/50 cursor-pointer hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-accent" />
          <h3 className="font-semibold">Props Playground</h3>
          <span className="text-xs surface border-theme px-2 py-0.5 rounded-full">
            {Object.keys(propsSchema).length} props
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyProps();
                }}
                className="px-3 py-1.5 text-xs rounded-md surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors flex items-center gap-1"
                title="Copy props as JSON"
              >
                <Copy className="w-3 h-3" />
                {copied ? "Copied!" : "Copy Props"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="px-3 py-1.5 text-xs rounded-md surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors flex items-center gap-1"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-secondary" />
          )}
        </div>
      </div>

      {/* Props Form */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(propsSchema).map(([propName, config]) => (
              <div key={propName} className="space-y-2">
                <label className="block text-sm font-medium">
                  <span className="text-light-text dark:text-dark-text">
                    {propName}
                  </span>
                  {config.required && (
                    <span className="text-neon-red ml-1">*</span>
                  )}
                  {config.description && (
                    <span className="block text-xs text-secondary mt-0.5">
                      {config.description}
                    </span>
                  )}
                </label>
                {renderInput(propName, config)}
              </div>
            ))}
          </div>

          {/* Current Props Display */}
          <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border">
            <details className="group">
              <summary className="cursor-pointer text-sm text-secondary hover:text-accent transition-colors flex items-center gap-2">
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                View Current Props (JSON)
              </summary>
              <pre className="mt-3 p-4 bg-light-surface dark:bg-dark-surface rounded-md text-xs font-mono overflow-auto max-h-[200px] border border-light-border dark:border-dark-border">
                {JSON.stringify(props, null, 2)}
              </pre>
            </details>
          </div>
        </motion.div>
      )}
    </div>
  );
}
