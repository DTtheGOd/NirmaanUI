import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import { ThemeProvider } from "./context/ThemeContext";
import Landing from "./pages/Landing";
import LearningHub from "./pages/LearningHub";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Navbar from "./components/layout/Navbar";

// Marketplace pages
import Explore from "./pages/Explore";
import UploadComponent from "./pages/UploadComponent";
import ComponentDetailPage from "./pages/ComponentDetailPage";
import MyComponents from "./pages/MyComponents";
import MyCollection from "./pages/MyCollection";

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageComponents from "./pages/Admin/ManageComponents";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  return !user ? children : <Navigate to="/" replace />;
}

function PageWrapper({ children }) {
  return <div className="container-max py-6">{children}</div>;
}

function AdminRoute({ children }) {
  const { admin, loading } = useAdmin();
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  return admin ? children : <Navigate to="/admin/login" replace />;
}

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();
  const isLandingPage =
    location.pathname === "/" || location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
      {!isLandingPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Landing Page - Always show (logged in or not) */}
          <Route path="/" element={<Landing />} />

          {/* Public Routes - No wrapper for Explore (has sidebar) */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/component/:id" element={<ComponentDetailPage />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <PageWrapper>
                  <Login />
                </PageWrapper>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <PageWrapper>
                  <Register />
                </PageWrapper>
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <PageWrapper>
                  <UploadComponent />
                </PageWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/my-components"
            element={
              <PrivateRoute>
                <PageWrapper>
                  <MyComponents />
                </PageWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/collection"
            element={
              <PrivateRoute>
                <PageWrapper>
                  <MyCollection />
                </PageWrapper>
              </PrivateRoute>
            }
          />
          {/* Redirect old routes to collection */}
          <Route
            path="/my-likes"
            element={<Navigate to="/collection" replace />}
          />
          <Route
            path="/my-saves"
            element={<Navigate to="/collection" replace />}
          />
          <Route
            path="/components"
            element={<Navigate to="/explore" replace />}
          />
          <Route
            path="/learning"
            element={
              <PrivateRoute>
                <PageWrapper>
                  <LearningHub />
                </PageWrapper>
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/components"
            element={
              <AdminRoute>
                <ManageComponents />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/explore" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AdminProvider>
          <AppContent />
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
