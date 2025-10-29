import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function MyCollection() {
  const [activeTab, setActiveTab] = useState("liked"); // "liked" or "saved"
  const [likedComponents, setLikedComponents] = useState([]);
  const [savedComponents, setSavedComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllComponents();
  }, []);

  const fetchAllComponents = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch both liked and saved components
      const [likedRes, savedRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/components/user/likes`, {
          headers,
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/components/user/saves`, {
          headers,
        }),
      ]);

      setLikedComponents(likedRes.data);
      setSavedComponents(savedRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch components:", error);
      setLoading(false);
    }
  };

  const currentComponents =
    activeTab === "liked" ? likedComponents : savedComponents;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4 text-secondary">Loading your collection...</p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-signature bg-clip-text text-transparent">
            📚 My Collection
          </h1>
          <p className="text-secondary">
            Components you've liked and saved for later
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-theme">
          <button
            onClick={() => setActiveTab("liked")}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "liked"
                ? "text-accent border-b-2 border-accent"
                : "text-secondary hover:text-primary"
            }`}
          >
            ❤️ Liked ({likedComponents.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "saved"
                ? "text-accent border-b-2 border-accent"
                : "text-secondary hover:text-primary"
            }`}
          >
            📥 Saved ({savedComponents.length})
          </button>
        </div>

        {/* Components Grid */}
        {currentComponents.length === 0 ? (
          <div className="text-center py-20 surface border-theme rounded-lg">
            <p className="text-lg mb-2">
              {activeTab === "liked"
                ? "No liked components yet"
                : "No saved components yet"}
            </p>
            <p className="text-secondary text-sm mb-6">
              {activeTab === "liked"
                ? "Like components from the Explore page to see them here"
                : "Save components from the Explore page to see them here"}
            </p>
            <Link to="/explore" className="btn-accent inline-block">
              🔍 Explore Components
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentComponents.map((component, index) => (
              <motion.div
                key={component._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/component/${component._id}`}
                  className="block surface border-theme rounded-lg p-5 hover:shadow-lg transition-all group"
                >
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
                        ❤️ {component.likeCount || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        👁️ {component.views || 0}
                      </span>
                    </div>
                    <span className="text-xs">
                      {new Date(component.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
