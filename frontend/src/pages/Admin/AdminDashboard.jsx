import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { motion } from "framer-motion";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Package,
  Eye,
  TrendingUp,
  LogOut,
  Settings,
  Activity,
} from "lucide-react";

const COLORS = ["#00FFC6", "#0078FF", "#B300FF", "#FFD700", "#FF6B6B"];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { admin, logout, getAuthHeader } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.get(`${API_URL}/admin/analytics`, {
        headers: getAuthHeader(),
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Header */}
      <header className="surface border-b border-theme sticky top-0 z-40">
        <div className="container-max px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="w-8 h-8 text-accent" />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-secondary">
                Welcome back, {admin?.username}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/components")}
              className="px-4 py-2 surface border-theme rounded-lg hover:bg-accent hover:text-white transition-all"
            >
              <Settings className="w-5 h-5 inline mr-2" />
              Manage Components
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-5 h-5 inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-max px-6 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Components"
            value={analytics?.totalComponents || 0}
            icon={<Package className="w-8 h-8" />}
            color="from-accent to-blue-500"
          />
          <MetricCard
            title="Active Components"
            value={analytics?.activeComponents || 0}
            icon={<Activity className="w-8 h-8" />}
            color="from-blue-500 to-purple-500"
          />
          <MetricCard
            title="Total Views"
            value={
              analytics?.mostViewed?.reduce((sum, c) => sum + c.views, 0) || 0
            }
            icon={<Eye className="w-8 h-8" />}
            color="from-purple-500 to-pink-500"
          />
          <MetricCard
            title="Categories"
            value={analytics?.categoryDistribution?.length || 0}
            icon={<TrendingUp className="w-8 h-8" />}
            color="from-pink-500 to-accent"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution Pie Chart */}
          <ChartCard title="Components by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics?.categoryDistribution || []}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analytics?.categoryDistribution?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Upload Trends Line Chart */}
          <ChartCard title="Upload Trends (Last 7 Days)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.uploadTrends || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#00FFC6"
                  strokeWidth={2}
                  name="Uploads"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Most Viewed Components Bar Chart */}
        <ChartCard title="Most Viewed Components">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics?.mostViewed || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#00FFC6" name="Views" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Recent Activity */}
        <div className="surface border-theme rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-accent" />
            Recent Components
          </h2>
          <div className="space-y-3">
            {analytics?.recentComponents?.map((component) => (
              <div
                key={component._id}
                className="flex items-center justify-between p-4 surface border-theme rounded-lg hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-semibold">{component.title}</h3>
                  <p className="text-sm text-secondary">
                    {component.category} • by{" "}
                    {component.owner?.name || "Unknown"}
                  </p>
                </div>
                <span className="text-sm text-secondary">
                  {new Date(component.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface border-theme rounded-2xl p-6 hover:shadow-xl transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-1">{value.toLocaleString()}</h3>
      <p className="text-secondary text-sm">{title}</p>
    </motion.div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="surface border-theme rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
