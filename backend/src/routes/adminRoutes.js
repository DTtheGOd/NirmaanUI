import express from "express";
import * as adminController from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();
// Admin login (no auth required)
router.post("/login", adminController.adminLogin);

// Protected admin routes (require admin authentication)
router.get("/analytics", verifyAdmin, adminController.getDashboardAnalytics);
router.get("/components", verifyAdmin, adminController.getAllComponentsAdmin);
router.put(
  "/components/:id",
  verifyAdmin,
  adminController.updateComponentAdmin
);
router.delete(
  "/components/:id",
  verifyAdmin,
  adminController.deleteComponentAdmin
);
router.patch(
  "/components/:id/toggle-visibility",
  verifyAdmin,
  adminController.toggleComponentVisibility
);

export default router;
