import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import PreviewContainer from "../components/common/PreviewContainer";
import { Eye, X, Copy } from "lucide-react";
import { AiFillHeart, AiOutlineEye, AiOutlineCheck } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const categories = [
  "All",
  "Buttons",
  "Cards",
  "Forms",
  "Inputs",
  "Navigation",
  "Modals",
  "Tables",
  "Charts",
  "Layout",
  "Other",
];

// Color mapping for each category
const categoryColors = {
  All: {
    light: { bg: "#1ABC9C", text: "#ffffff" },
    dark: { bg: "#00FFC6", text: "#050507" },
  },
  Buttons: {
    light: { bg: "#0096C7", text: "#ffffff" },
    dark: { bg: "#00D5FF", text: "#050507" },
  },
  Cards: {
    light: { bg: "#9747FF", text: "#ffffff" },
    dark: { bg: "#A14BFF", text: "#050507" },
  },
  Forms: {
    light: { bg: "#2ECC71", text: "#ffffff" },
    dark: { bg: "#2DFF72", text: "#050507" },
  },
  Inputs: {
    light: { bg: "#F77F00", text: "#ffffff" },
    dark: { bg: "#FF8A00", text: "#050507" },
  },
  Navigation: {
    light: { bg: "#4361EE", text: "#ffffff" },
    dark: { bg: "#4F6BFF", text: "#ffffff" },
  },
  Modals: {
    light: { bg: "#D63384", text: "#ffffff" },
    dark: { bg: "#FF3EC9", text: "#050507" },
  },
  Tables: {
    light: { bg: "#FFBA08", text: "#050507" },
    dark: { bg: "#FFD300", text: "#050507" },
  },
  Charts: {
    light: { bg: "#E85D75", text: "#ffffff" },
    dark: { bg: "#FF5E8E", text: "#050507" },
  },
  Layout: {
    light: { bg: "#D62828", text: "#ffffff" },
    dark: { bg: "#FF4F4F", text: "#050507" },
  },
  Other: {
    light: { bg: "#9CA3AF", text: "#111827" },
    dark: { bg: "#4B4B52", text: "#F9FAFB" },
  },
};

export default function Explore() {
  const { theme } = useTheme();
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024); // Open on desktop by default
  const [previewModal, setPreviewModal] = useState(null); // { component, show }
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchComponents();
  }, [sort]);

  useEffect(() => {
    filterComponents();
  }, [components, category, search]);

  const fetchComponents = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/components?sort=${sort}`
      );
      setComponents(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch components:", error);
      setComponents([]);
      setLoading(false);
    }
  };

  const filterComponents = () => {
    if (!Array.isArray(components)) {
      setFilteredComponents([]);
      return;
    }

    let filtered = components;

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((comp) => comp.category === category);
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(
        (comp) =>
          comp.title.toLowerCase().includes(search.toLowerCase()) ||
          comp.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredComponents(filtered);
  };

  const handleOpenPreview = (component, e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    setPreviewModal({ component, show: true });
  };

  const handleClosePreview = () => {
    setPreviewModal(null);
    setCopied(false);
  };

  const handleCopyCode = async (code, e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4 text-secondary">Loading components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{
          x: window.innerWidth >= 1024 ? 0 : -300,
          opacity: window.innerWidth >= 1024 ? 1 : 0,
        }}
        animate={{
          x: isSidebarOpen ? 0 : -300,
          opacity: isSidebarOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:sticky top-0 left-0 h-screen bg-light-bg dark:bg-dark-bg border-r border-light-border dark:border-dark-border overflow-y-auto z-30 w-64"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-end mb-6 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-light-surface dark:hover:bg-dark-surface"
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="text-sm font-medium text-secondary mb-2 block">
              Search
            </label>
            <div className="relative">
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-muted dark:text-dark-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components..."
                className="w-full surface border-theme rounded-md pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-light-muted dark:placeholder:text-dark-muted"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="mb-6">
            <label className="text-sm font-medium text-secondary mb-2 block">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full surface border-theme rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option
                value="recent"
                className="bg-light-surface dark:bg-dark-surface"
              >
                Most Recent
              </option>
              <option
                value="popular"
                className="bg-light-surface dark:bg-dark-surface"
              >
                Most Popular
              </option>
              <option
                value="liked"
                className="bg-light-surface dark:bg-dark-surface"
              >
                Most Liked
              </option>
            </select>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="text-sm font-medium text-secondary mb-3 block">
              Categories
            </label>
            <div className="space-y-1">
              {categories.map((cat) => {
                const colors = categoryColors[cat][theme];
                const isActive = category === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? colors.bg : "transparent",
                      color: isActive ? colors.text : undefined,
                      borderLeft: isActive
                        ? `3px solid ${colors.bg}`
                        : "3px solid transparent",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload Button */}
          <Link
            to="/upload"
            className="w-full btn-accent flex items-center justify-center gap-2 py-3"
          >
            <span className="text-lg">+</span> Upload Component
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-light-bg dark:bg-dark-bg overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-md"
          >
            ☰ Filters
          </button>
          {/* Results Count */}
          <p className="text-secondary text-sm mb-6">
            {filteredComponents.length} component
            {filteredComponents.length !== 1 ? "s" : ""} found
          </p>

          {/* Components Grid */}
          {filteredComponents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-secondary text-lg">No components found</p>
              <p className="text-secondary text-sm mt-2">
                Try adjusting your filters or{" "}
                <Link to="/upload" className="text-accent glow-accent">
                  upload your own component
                </Link>
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component, index) => (
                <motion.div
                  key={component._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group"
                >
                  <Link
                    to={`/component/${component._id}`}
                    className="block surface border-theme rounded-lg overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Preview Image Thumbnail */}
                    {component.previewImage && (
                      <div className="relative w-full h-48 bg-gradient-to-br from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg overflow-hidden">
                        <img
                          src={component.previewImage}
                          alt={component.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}

                    {/* Component Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                            {component.title}
                          </h3>
                          <p className="text-xs text-secondary mt-1">
                            by {component.owner?.name || "Anonymous"}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full surface border-theme">
                          {component.category}
                        </span>
                      </div>

                      <p className="text-sm text-secondary line-clamp-2 mb-4">
                        {component.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-secondary">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <AiFillHeart className="w-4 h-4" />
                            {component.likeCount || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <AiOutlineEye className="w-4 h-4" />
                            {component.views || 0}
                          </span>
                        </div>
                        <span className="text-xs">
                          {new Date(component.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Quick Preview Button - Shows on Hover */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => handleOpenPreview(component, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-accent text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10 hover:shadow-accent/30"
                    title="Quick Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Quick Preview Modal */}
      <AnimatePresence>
        {previewModal?.show && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePreview}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 z-50 surface border-theme rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-light-border dark:border-dark-border bg-light-surface/50 dark:bg-dark-surface/50">
                <div className="flex-1">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Eye className="w-5 h-5 text-accent" />
                    {previewModal.component.title}
                  </h2>
                  <p className="text-sm text-secondary mt-1">
                    by {previewModal.component.owner?.name || "Anonymous"} •{" "}
                    {previewModal.component.category}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Copy Code Button */}
                  <button
                    onClick={(e) =>
                      handleCopyCode(previewModal.component.code, e)
                    }
                    className="px-4 py-2 rounded-md surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">
                      {copied ? (
                        <>
                          <AiOutlineCheck className="w-4 h-4 inline mr-1" />
                          Copied
                        </>
                      ) : (
                        "Copy Code"
                      )}
                    </span>
                  </button>

                  {/* View Details Button */}
                  <Link
                    to={`/component/${previewModal.component._id}`}
                    className="px-4 py-2 rounded-md btn-accent text-sm"
                  >
                    View Details
                  </Link>

                  {/* Close Button */}
                  <button
                    onClick={handleClosePreview}
                    className="p-2 rounded-md surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Preview */}
              <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-light-bg to-light-surface dark:from-dark-bg dark:to-dark-surface">
                <div className="max-w-5xl mx-auto">
                  {previewModal.component.previewImage ? (
                    /* Show uploaded preview image */
                    <div className="flex flex-col items-center justify-center min-h-[500px]">
                      <img
                        src={previewModal.component.previewImage}
                        alt={`${previewModal.component.title} preview`}
                        className="max-w-full max-h-[600px] object-contain rounded-lg shadow-2xl"
                      />
                      <p className="text-xs text-secondary mt-4">
                        📸 Static preview image
                      </p>
                    </div>
                  ) : (
                    /* Fallback to live preview */
                    <PreviewContainer
                      code={previewModal.component.code}
                      theme={
                        previewModal.component.previewSettings?.theme || "dark"
                      }
                      useNirmaanTheme={
                        previewModal.component.previewSettings
                          ?.useNirmaanTheme !== false
                      }
                      showThemeToggle={true}
                      height="500px"
                      className="h-full"
                    />
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-light-border dark:border-dark-border bg-light-surface/50 dark:bg-dark-surface/50 text-sm text-secondary">
                <div className="flex items-center justify-between">
                  <p>{previewModal.component.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <AiFillHeart className="w-4 h-4" />
                      {previewModal.component.likeCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <AiOutlineEye className="w-4 h-4" />
                      {previewModal.component.views || 0}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
