import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PreviewContainer from "../components/common/PreviewContainer";
import PropsPlayground from "../components/common/PropsPlayground";
import ExportDropdown from "../components/common/ExportDropdown";
import {
  Eye,
  Code2,
  Info,
  ExternalLink,
  Sparkles,
  FileCode,
} from "lucide-react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineCheck,
  AiFillLock,
} from "react-icons/ai";
import {
  BiCopy,
  BiDownload,
  BiSave,
  BiEdit,
  BiTrash,
  BiGlobe,
} from "react-icons/bi";

export default function ComponentDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  const [activeTab, setActiveTab] = useState("preview"); // preview, code, info
  const [previewMode, setPreviewMode] = useState("nirmaan"); // nirmaan or generic
  const [previewTheme, setPreviewTheme] = useState("dark"); // dark or light
  const [previewProps, setPreviewProps] = useState({}); // props from playground

  const fetchComponent = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/components/${id}`,
        { headers }
      );

      setComponent(res.data);
      setIsLiked(res.data.isLiked || false);
      setIsSaved(res.data.isSaved || false);
      setLikeCount(res.data.likeCount || 0);
      setSaveCount(res.data.saveCount || 0);

      // Set initial preview mode and theme from component settings
      if (res.data.previewSettings) {
        setPreviewMode(
          res.data.previewSettings.useNirmaanTheme ? "nirmaan" : "generic"
        );
        setPreviewTheme(res.data.previewSettings.theme || "dark");
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch component:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(component.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Increment copy count
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/components/${id}/copy`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/components/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsLiked(res.data.isLiked);
      setLikeCount(res.data.likeCount);
    } catch (error) {
      console.error("Failed to like:", error);
    }
  };

  const handleSave = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/components/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsSaved(res.data.isSaved);
      setSaveCount(res.data.saveCount);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this component?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/components/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/my-components");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4 text-secondary">Loading component...</p>
        </div>
      </div>
    );
  }

  if (!component) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Component not found</h2>
        <Link to="/explore" className="text-accent glow-accent">
          ← Back to Explore
        </Link>
      </div>
    );
  }

  const isOwner = user && component.owner._id === user._id;

  return (
    <section className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{component.title}</h1>
                <span className="px-3 py-1 text-sm rounded-full surface border-theme">
                  {component.category}
                </span>
                {!component.isPublic && (
                  <span className="px-3 py-1 text-sm rounded-full bg-neon-amber/20 text-neon-amber flex items-center gap-1">
                    <AiFillLock className="w-3 h-3" />
                    Private
                  </span>
                )}
              </div>
              <p className="text-secondary">
                by <span className="text-accent">{component.owner.name}</span> •{" "}
                {new Date(component.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex items-center gap-2">
                <Link
                  to={`/component/${id}/edit`}
                  className="surface border-theme px-4 py-2 rounded-md hover:bg-light-surface dark:hover:bg-dark-surface transition-colors flex items-center gap-2"
                >
                  <BiEdit className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="surface border-theme px-4 py-2 rounded-md hover:bg-neon-red/10 text-neon-red transition-colors flex items-center gap-2"
                >
                  <BiTrash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="text-lg mb-4">{component.description}</p>

          {/* Stats and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-secondary">
              <span className="flex items-center gap-1">
                <AiFillHeart className="w-4 h-4" />
                {likeCount} likes
              </span>
              <span className="flex items-center gap-1">
                <BiDownload className="w-4 h-4" />
                {saveCount} saves
              </span>
              <span className="flex items-center gap-1">
                <AiOutlineEye className="w-4 h-4" />
                {component.views} views
              </span>
              <span className="flex items-center gap-1">
                <BiCopy className="w-4 h-4" />
                {component.copies || 0} copies
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                  isLiked
                    ? "bg-neon-red/20 text-neon-red"
                    : "surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface"
                }`}
              >
                {isLiked ? (
                  <>
                    <AiFillHeart className="w-4 h-4" />
                    Liked
                  </>
                ) : (
                  <>
                    <AiOutlineHeart className="w-4 h-4" />
                    Like
                  </>
                )}
              </button>
              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                  isSaved
                    ? "bg-accent/20 text-accent"
                    : "surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface"
                }`}
              >
                {isSaved ? (
                  <>
                    <BiDownload className="w-4 h-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <BiSave className="w-4 h-4" />
                    Save
                  </>
                )}
              </button>
              <button
                onClick={handleCopy}
                className="btn-accent px-6 py-2 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <AiOutlineCheck className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <BiCopy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Interface: Preview | Code | Info */}
        <div className="mb-6">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-6 surface border-theme rounded-lg p-1.5">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md transition-all flex-1 ${
                activeTab === "preview"
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "hover:bg-light-surface dark:hover:bg-dark-surface text-secondary"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="font-medium">Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md transition-all flex-1 ${
                activeTab === "code"
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "hover:bg-light-surface dark:hover:bg-dark-surface text-secondary"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span className="font-medium">Code</span>
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md transition-all flex-1 ${
                activeTab === "info"
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "hover:bg-light-surface dark:hover:bg-dark-surface text-secondary"
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="font-medium">Info</span>
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* PREVIEW TAB */}
            {activeTab === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="surface border-theme rounded-xl overflow-hidden">
                  {/* Preview Toolbar */}
                  <div className="flex items-center justify-between px-6 py-3 border-b border-light-border dark:border-dark-border bg-light-surface/50 dark:bg-dark-surface/50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <Eye className="w-4 h-4" />
                        <span>Live Component Preview</span>
                      </div>

                      {/* Theme & Mode Toggles */}
                      <div className="flex items-center gap-2">
                        {/* Nirmaan vs Generic Toggle */}
                        <div className="flex items-center gap-1 surface border-theme rounded-md p-0.5">
                          <button
                            onClick={() => setPreviewMode("nirmaan")}
                            className={`px-3 py-1.5 text-xs rounded transition-all flex items-center gap-1 ${
                              previewMode === "nirmaan"
                                ? "bg-accent text-white shadow-md"
                                : "hover:bg-light-surface dark:hover:bg-dark-surface text-secondary"
                            }`}
                            title="Preview with Nirmaan UI theme (custom colors & styles)"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Nirmaan Styled</span>
                          </button>
                          <button
                            onClick={() => setPreviewMode("generic")}
                            className={`px-3 py-1.5 text-xs rounded transition-all flex items-center gap-1 ${
                              previewMode === "generic"
                                ? "bg-accent text-white shadow-md"
                                : "hover:bg-light-surface dark:hover:bg-dark-surface text-secondary"
                            }`}
                            title="Preview with generic Tailwind (portable for any project)"
                          >
                            <FileCode className="w-3 h-3" />
                            <span>Generic Tailwind</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ExportDropdown
                        code={component.code}
                        theme={previewTheme}
                        description={component.description}
                      />
                      <button
                        onClick={() => window.open(`/preview/${id}`, "_blank")}
                        className="px-3 py-1.5 text-sm rounded-md surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in New Tab</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Preview Component */}
                  <div className="p-8 bg-gradient-to-br from-light-bg to-light-surface dark:from-dark-bg dark:to-dark-surface min-h-[400px]">
                    {component.previewImage ? (
                      /* Show uploaded preview image */
                      <div className="flex flex-col items-center justify-center h-full">
                        <img
                          src={component.previewImage}
                          alt={`${component.title} preview`}
                          className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg"
                        />
                        <p className="text-xs text-secondary mt-4">
                          📸 Static preview image (Live preview requires
                          sandboxing)
                        </p>
                      </div>
                    ) : (
                      /* Fallback to live preview */
                      <PreviewContainer
                        code={component.code}
                        theme={previewTheme}
                        useNirmaanTheme={previewMode === "nirmaan"}
                        showThemeToggle={true}
                        props={previewProps}
                        height="400px"
                        onError={(error) =>
                          console.error("Preview error:", error)
                        }
                      />
                    )}
                  </div>

                  {/* Props Playground */}
                  {component.propsSchema &&
                    Object.keys(component.propsSchema).length > 0 && (
                      <div className="px-8 pb-8">
                        <PropsPlayground
                          propsSchema={component.propsSchema}
                          initialProps={{}}
                          onPropsChange={setPreviewProps}
                        />
                      </div>
                    )}
                </div>
              </motion.div>
            )}

            {/* CODE TAB */}
            {activeTab === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="surface border-theme rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Component Code
                  </h2>
                  <button
                    onClick={handleCopy}
                    className="text-sm text-accent glow-accent hover:underline flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <AiOutlineCheck className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <BiCopy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text rounded-lg p-6 overflow-auto text-sm border border-light-border dark:border-dark-border font-mono max-h-[600px]">
                  <code>{component.code}</code>
                </pre>
              </motion.div>
            )}

            {/* INFO TAB */}
            {activeTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="surface border-theme rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                  <Info className="w-5 h-5" />
                  Component Information
                </h2>

                <div className="space-y-4">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-medium text-secondary mb-2">
                      Description
                    </h3>
                    <p className="text-base">{component.description}</p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-light-border dark:border-dark-border">
                    <div>
                      <h3 className="text-sm font-medium text-secondary mb-1">
                        Category
                      </h3>
                      <span className="px-3 py-1 text-sm rounded-full surface border-theme inline-block">
                        {component.category}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-secondary mb-1">
                        Visibility
                      </h3>
                      <span
                        className={`px-3 py-1 text-sm rounded-full inline-flex items-center gap-1 ${
                          component.isPublic
                            ? "bg-accent/20 text-accent"
                            : "bg-neon-amber/20 text-neon-amber"
                        }`}
                      >
                        {component.isPublic ? (
                          <>
                            <BiGlobe className="w-4 h-4" />
                            Public
                          </>
                        ) : (
                          <>
                            <AiFillLock className="w-4 h-4" />
                            Private
                          </>
                        )}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-secondary mb-1">
                        Created By
                      </h3>
                      <p className="text-accent">{component.owner.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-secondary mb-1">
                        Created On
                      </h3>
                      <p>
                        {new Date(component.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="pt-4 border-t border-light-border dark:border-dark-border">
                    <h3 className="text-sm font-medium text-secondary mb-3">
                      Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 rounded-lg surface border-theme">
                        <div className="text-2xl font-bold text-accent">
                          {likeCount}
                        </div>
                        <div className="text-xs text-secondary mt-1 flex items-center justify-center gap-1">
                          <AiFillHeart className="w-3 h-3" />
                          Likes
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg surface border-theme">
                        <div className="text-2xl font-bold text-accent">
                          {saveCount}
                        </div>
                        <div className="text-xs text-secondary mt-1 flex items-center justify-center gap-1">
                          <BiDownload className="w-3 h-3" />
                          Saves
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg surface border-theme">
                        <div className="text-2xl font-bold text-accent">
                          {component.views}
                        </div>
                        <div className="text-xs text-secondary mt-1">
                          👁️ Views
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg surface border-theme">
                        <div className="text-2xl font-bold text-accent">
                          {component.copies || 0}
                        </div>
                        <div className="text-xs text-secondary mt-1">
                          📋 Copies
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {component.tags && component.tags.length > 0 && (
                    <div className="pt-4 border-t border-light-border dark:border-dark-border">
                      <h3 className="text-sm font-medium text-secondary mb-3">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {component.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-sm rounded-full surface border-theme"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Code Display */}
        <div className="surface border-theme rounded-lg p-6 hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Component Code</h2>
            <button
              onClick={handleCopy}
              className="text-sm text-accent glow-accent hover:underline flex items-center gap-1"
            >
              {copied ? (
                <>
                  <AiOutlineCheck className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <BiCopy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text rounded-lg p-6 overflow-auto text-sm border border-light-border dark:border-dark-border font-mono">
            <code>{component.code}</code>
          </pre>
        </div>

        {/* Tags */}
        {component.tags && component.tags.length > 0 && (
          <div className="mt-6 hidden">
            <h3 className="text-sm font-medium mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {component.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs rounded-full surface border-theme"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <Link
            to="/explore"
            className="text-accent glow-accent hover:underline"
          >
            ← Back to Explore
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
