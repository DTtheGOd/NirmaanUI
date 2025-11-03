import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  useEffect(() => {
    if (token) {
      // Verify token is still valid
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        setAdmin(decoded);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.post(`${API_URL}/admin/login`, {
        username,
        password,
      });

      const { token: newToken, admin: adminData } = response.data;

      localStorage.setItem("adminToken", newToken);
      setToken(newToken);
      setAdmin(adminData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setAdmin(null);
  };

  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    getAuthHeader,
    isAuthenticated: !!admin,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
