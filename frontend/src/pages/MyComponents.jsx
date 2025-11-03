import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { AiFillHeart, AiOutlineEye, AiFillLock } from "react-icons/ai";
import { BiCopy, BiRocket } from "react-icons/bi";

export default function MyComponents() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyComponents();
  }, []);

  const fetchMyComponents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/components/user/my-components`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComponents(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch components:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4 text-secondary">Loading your components...</p>
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-signature bg-clip-text text-transparent">
              My Components
            </h1>
            <p className="text-secondary mt-1">
              Manage all your uploaded components
            </p>
          </div>
          <Link to="/upload" className="btn-accent">
            + Upload New
          </Link>
        </div>

        {components.length === 0 ? (
          <div className="text-center py-20 surface border-theme rounded-lg">
            <p className="text-lg mb-2">No components yet</p>
            <p className="text-secondary text-sm mb-6">
              Start by uploading your first component!
            </p>
            <Link
              to="/upload"
              className="btn-accent inline-flex items-center gap-2"
            >
              <BiRocket className="w-4 h-4" />
              Upload Component
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component, index) => (
              <motion.div
                key={component._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="surface border-theme rounded-lg p-5 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Link
                      to={`/component/${component._id}`}
                      className="font-semibold text-lg hover:text-accent transition-colors"
                    >
                      {component.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs rounded-full surface border-theme">
                        {component.category}
                      </span>
                      {component.isPublic ? (
                        <span className="text-xs text-accent flex items-center gap-1">
                          <BiCopy className="w-3 h-3" />
                          Public
                        </span>
                      ) : (
                        <span className="text-xs text-neon-amber flex items-center gap-1">
                          <AiFillLock className="w-3 h-3" />
                          Private
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-secondary line-clamp-2 mb-4">
                  {component.description}
                </p>

                <div className="flex items-center justify-between text-sm text-secondary mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <AiFillHeart className="w-4 h-4" />
                      {component.likeCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <AiOutlineEye className="w-4 h-4" />
                      {component.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <BiCopy className="w-4 h-4" />
                      {component.copies || 0}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/component/${component._id}`}
                    className="flex-1 text-center py-2 rounded-md surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors text-sm"
                  >
                    View
                  </Link>
                  <Link
                    to={`/component/${component._id}/edit`}
                    className="flex-1 text-center py-2 rounded-md surface border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors text-sm"
                  >
                    Edit
                  </Link>
                </div>

                <p className="text-xs text-secondary mt-3">
                  Created {new Date(component.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
