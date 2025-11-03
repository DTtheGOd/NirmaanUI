import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";

export default function ManageComponents() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingComponent, setEditingComponent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { admin, logout, getAuthHeader } = useAdmin();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchComponents();
  }, [page, search, category]);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/components`, {
        headers: getAuthHeader(),
        params: { page, search, category, limit: 10 },
      });
      setComponents(response.data.components);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching components:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/admin/components/${id}/toggle-visibility`,
        {},
        { headers: getAuthHeader() }
      );
      fetchComponents();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await axios.delete(`${API_URL}/admin/components/${id}`, {
        headers: getAuthHeader(),
      });
      fetchComponents();
    } catch (error) {
      console.error("Error deleting component:", error);
    }
  };

  const handleEdit = (component) => {
    setEditingComponent(component);
    setShowEditModal(true);
  };

  const handleUpdateComponent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/admin/components/${editingComponent._id}`,
        editingComponent,
        { headers: getAuthHeader() }
      );
      setShowEditModal(false);
      fetchComponents();
    } catch (error) {
      console.error("Error updating component:", error);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Header */}
      <header className="surface border-b border-theme sticky top-0 z-40">
        <div className="container-max px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-2 surface border-theme rounded-lg hover:bg-accent hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Manage Components</h1>
              <p className="text-sm text-secondary">CRUD Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="px-4 py-2 surface border-theme rounded-lg hover:bg-accent hover:text-white transition-all"
            >
              <LayoutDashboard className="w-5 h-5 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
              className="px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-5 h-5 inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-max px-6 py-8">
        {/* Filters */}
        <div className="surface border-theme rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                type="text"
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 surface border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 surface border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
              >
                <option value="">All Categories</option>
                <option value="Buttons">Buttons</option>
                <option value="Cards">Cards</option>
                <option value="Forms">Forms</option>
                <option value="Navigation">Navigation</option>
                <option value="Modals">Modals</option>
                <option value="Tables">Tables</option>
                <option value="Charts">Charts</option>
                <option value="Layout">Layout</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setSearch("");
                setCategory("");
                setPage(1);
              }}
              className="px-6 py-3 surface border-theme rounded-lg hover:bg-accent hover:text-white transition-all"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Components Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
            <p className="mt-4">Loading components...</p>
          </div>
        ) : (
          <div className="surface border-theme rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-surface dark:bg-dark-surface border-b border-theme">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Author
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((component) => (
                    <tr
                      key={component._id}
                      className="border-b border-theme hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{component.title}</p>
                          <p className="text-sm text-secondary truncate max-w-xs">
                            {component.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {component.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {component.owner?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {component.views || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            component.isVisible
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {component.isVisible ? "Visible" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleToggleVisibility(component._id)
                            }
                            className="p-2 surface border-theme rounded-lg hover:bg-accent hover:text-white transition-all"
                            title={component.isVisible ? "Hide" : "Show"}
                          >
                            {component.isVisible ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(component)}
                            className="p-2 surface border-theme rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(component._id, component.title)
                            }
                            className="p-2 surface border-theme rounded-lg hover:bg-red-500 hover:text-white transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-theme flex items-center justify-between">
              <p className="text-sm text-secondary">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 surface border-theme rounded-lg hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 surface border-theme rounded-lg hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {showEditModal && editingComponent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="surface border-theme rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Edit Component</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 surface border-theme rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateComponent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editingComponent.title}
                  onChange={(e) =>
                    setEditingComponent({
                      ...editingComponent,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 surface border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={editingComponent.description}
                  onChange={(e) =>
                    setEditingComponent({
                      ...editingComponent,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 surface border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={editingComponent.category}
                  onChange={(e) =>
                    setEditingComponent({
                      ...editingComponent,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 surface border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                >
                  <option value="Buttons">Buttons</option>
                  <option value="Cards">Cards</option>
                  <option value="Forms">Forms</option>
                  <option value="Navigation">Navigation</option>
                  <option value="Modals">Modals</option>
                  <option value="Tables">Tables</option>
                  <option value="Charts">Charts</option>
                  <option value="Layout">Layout</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingComponent.isVisible}
                    onChange={(e) =>
                      setEditingComponent({
                        ...editingComponent,
                        isVisible: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-theme focus:ring-2 focus:ring-accent"
                  />
                  <span className="text-sm font-medium">Visible</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingComponent.isPublic}
                    onChange={(e) =>
                      setEditingComponent({
                        ...editingComponent,
                        isPublic: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-theme focus:ring-2 focus:ring-accent"
                  />
                  <span className="text-sm font-medium">Public</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button type="submit" className="flex-1 btn-gradient py-3">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 surface border-theme rounded-lg hover:bg-red-500/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
