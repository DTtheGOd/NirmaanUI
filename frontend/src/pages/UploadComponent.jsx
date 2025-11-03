import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { AiFillLock } from "react-icons/ai";
import { BiSun, BiFile, BiBulb, BiGlobe, BiMoon } from "react-icons/bi";
import { IoRocketSharp, IoSparkles } from "react-icons/io5";

const categories = [
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

export default function UploadComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("Other");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState("");
  const [previewTheme, setPreviewTheme] = useState("dark");
  const [useNirmaanTheme, setUseNirmaanTheme] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    setError("");

    try {
      // Create FormData for image upload
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPreviewImageUrl(res.data.url);
      setPreviewImage(file);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/components`,
        {
          title,
          description,
          code,
          category,
          isPublic,
          tags: tagsArray,
          previewImage: previewImageUrl, // Add preview image URL
          previewSettings: {
            theme: previewTheme,
            useNirmaanTheme: useNirmaanTheme,
          },
          propsSchema: {}, // Can be extended later for advanced users
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate(`/component/${res.data._id}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload component");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-signature bg-clip-text text-transparent">
          Upload Component
        </h1>
        <p className="text-secondary mb-6">
          Share your amazing React component with the community
        </p>

        {error && (
          <div className="surface border-theme border-l-4 border-l-neon-red p-4 mb-6 rounded">
            <p className="text-neon-red">{error}</p>
          </div>
        )}

        {success && (
          <div className="surface border-theme border-l-4 border-l-accent p-4 mb-6 rounded">
            <p className="text-accent">
              Component uploaded successfully! Redirecting...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Component Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full surface border-theme rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-light-muted dark:placeholder:text-dark-muted"
              placeholder="e.g., Animated Button"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full surface border-theme rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-light-muted dark:placeholder:text-dark-muted h-24 resize-none"
              placeholder="Describe your component and what it does..."
              required
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Component Code (JSX) *
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full surface border-theme rounded-md px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-light-muted dark:placeholder:text-dark-muted h-96 resize-none"
              placeholder="Paste your React component code here..."
              required
              spellCheck="false"
            />
            <p className="text-xs text-secondary mt-2 flex items-center gap-1">
              <BiBulb className="w-4 h-4" />
              Tip: Include imports and make sure the component is copy-paste
              ready
            </p>
          </div>

          {/* Preview Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Preview Image (Optional)
            </label>
            <div className="surface border-theme border-2 border-dashed rounded-lg p-6">
              {previewImageUrl ? (
                <div className="space-y-4">
                  <img
                    src={previewImageUrl}
                    alt="Component preview"
                    className="w-full max-h-64 object-contain rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImageUrl("");
                      setPreviewImage(null);
                    }}
                    className="text-sm text-neon-red hover:underline"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <input
                    type="file"
                    id="preview-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="preview-image"
                    className="cursor-pointer inline-flex flex-col items-center gap-2"
                  >
                    {uploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                        <p className="text-sm text-secondary">Uploading...</p>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-12 h-12 text-secondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm font-medium">
                          Click to upload preview image
                        </p>
                        <p className="text-xs text-secondary">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-secondary mt-2">
              📸 Upload a screenshot of your component for better visibility
              (Since live preview requires complex sandboxing)
            </p>
          </div>

          {/* Category and Visibility Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full surface border-theme rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Visibility Toggle */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Visibility
              </label>
              <div className="flex items-center gap-4 h-12">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`flex-1 py-3 rounded-md transition-all flex items-center justify-center gap-2 ${
                    isPublic
                      ? "bg-accent text-dark-bg font-medium"
                      : "surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface"
                  }`}
                >
                  <BiGlobe className="w-4 h-4" />
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`flex-1 py-3 rounded-md transition-all flex items-center justify-center gap-2 ${
                    !isPublic
                      ? "bg-accent text-dark-bg font-medium"
                      : "surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface"
                  }`}
                >
                  <AiFillLock className="w-4 h-4" />
                  Private
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tags (optional)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full surface border-theme rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-light-muted dark:placeholder:text-dark-muted"
              placeholder="animation, interactive, modern (comma separated)"
            />
          </div>

          {/* Preview Settings */}
          <div className="surface border-theme rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Preview Settings</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Preview Theme */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Default Preview Theme
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewTheme("dark")}
                    className={`flex-1 py-2.5 rounded-md transition-all flex items-center justify-center gap-2 ${
                      previewTheme === "dark"
                        ? "bg-accent text-dark-bg font-medium"
                        : "surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface"
                    }`}
                  >
                    <BiMoon className="w-4 h-4" />
                    Dark
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTheme("light")}
                    className={`flex-1 py-2.5 rounded-md transition-all flex items-center justify-center gap-2 ${
                      previewTheme === "light"
                        ? "bg-accent text-dark-bg font-medium"
                        : "surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface"
                    }`}
                  >
                    <BiSun className="w-4 h-4" />
                    Light
                  </button>
                </div>
              </div>

              {/* Use Nirmaan Theme */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Style System
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setUseNirmaanTheme(true)}
                    className={`flex-1 py-2.5 rounded-md transition-all flex items-center justify-center gap-2 ${
                      useNirmaanTheme
                        ? "bg-accent text-dark-bg font-medium"
                        : "surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface"
                    }`}
                  >
                    <IoSparkles className="w-4 h-4" />
                    Nirmaan Styled
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseNirmaanTheme(false)}
                    className={`flex-1 py-2.5 rounded-md transition-all flex items-center justify-center gap-2 ${
                      !useNirmaanTheme
                        ? "bg-accent text-dark-bg font-medium"
                        : "surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface"
                    }`}
                  >
                    <BiFile className="w-4 h-4" />
                    Generic Tailwind
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-secondary mt-2 flex items-center gap-1">
              <BiBulb className="w-4 h-4" />
              Choose how your component should be previewed. Users can toggle
              between modes when viewing.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-accent flex-1 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                "Uploading..."
              ) : (
                <>
                  <IoRocketSharp className="w-5 h-5" />
                  Upload Component
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="surface border-theme px-6 py-3 rounded-md hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
