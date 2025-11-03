import jwt from "jsonwebtoken";
import Component from "../models/Component.js";

// Hardcoded admin credentials (stored securely in production use .env)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123", // Change this!
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate credentials
    if (
      username !== ADMIN_CREDENTIALS.username ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Generate JWT token with admin role
    const token = jwt.sign(
      { username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Admin login successful",
      token,
      admin: { username, role: "admin" },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error during admin login" });
  }
};

// Get Dashboard Analytics
export const getDashboardAnalytics = async (req, res) => {
  try {
    // Total components
    const totalComponents = await Component.countDocuments();

    // Active (visible) components
    const activeComponents = await Component.countDocuments({
      isVisible: true,
    });

    // Most viewed components
    const mostViewed = await Component.find()
      .sort({ views: -1 })
      .limit(5)
      .select("title views category");

    // Category distribution
    const categoryDistribution = await Component.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Upload trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const uploadTrends = await Component.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Recent components (last 5)
    const recentComponents = await Component.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title category createdAt owner")
      .populate("owner", "name");

    res.json({
      totalComponents,
      activeComponents,
      mostViewed,
      categoryDistribution,
      uploadTrends,
      recentComponents,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Error fetching analytics data" });
  }
};

// Get All Components (Admin view with pagination)
export const getAllComponentsAdmin = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category = "",
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    const total = await Component.countDocuments(query);

    const components = await Component.find(query)
      .populate("owner", "name email")
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({
      components,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalComponents: total,
    });
  } catch (error) {
    console.error("Get components error:", error);
    res.status(500).json({ message: "Error fetching components" });
  }
};

// Update Component (Admin)
export const updateComponentAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const component = await Component.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    res.json({ message: "Component updated successfully", component });
  } catch (error) {
    console.error("Update component error:", error);
    res.status(500).json({ message: "Error updating component" });
  }
};

// Delete Component (Admin)
export const deleteComponentAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const component = await Component.findByIdAndDelete(id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    res.json({ message: "Component deleted successfully" });
  } catch (error) {
    console.error("Delete component error:", error);
    res.status(500).json({ message: "Error deleting component" });
  }
};

// Toggle Component Visibility (Admin)
export const toggleComponentVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const component = await Component.findById(id);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    component.isVisible = !component.isVisible;
    await component.save();

    res.json({
      message: `Component ${
        component.isVisible ? "shown" : "hidden"
      } successfully`,
      component,
    });
  } catch (error) {
    console.error("Toggle visibility error:", error);
    res.status(500).json({ message: "Error toggling visibility" });
  }
};
