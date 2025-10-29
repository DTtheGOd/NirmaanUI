import { Router } from "express";
import {
  getPublicComponents,
  getComponentById,
  createComponent,
  updateComponent,
  deleteComponent,
  toggleLikeComponent,
  toggleSaveComponent,
  incrementCopyCount,
  getUserComponents,
  getUserLikedComponents,
  getUserSavedComponents,
} from "../controllers/componentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getPublicComponents);
router.get("/:id", getComponentById);

// Protected routes - Component CRUD
router.post("/", protect, createComponent);
router.put("/:id", protect, updateComponent);
router.delete("/:id", protect, deleteComponent);

// Protected routes - Interactions
router.post("/:id/like", protect, toggleLikeComponent);
router.post("/:id/save", protect, toggleSaveComponent);
router.post("/:id/copy", protect, incrementCopyCount);

// Protected routes - User components
router.get("/user/my-components", protect, getUserComponents);
router.get("/user/likes", protect, getUserLikedComponents);
router.get("/user/saves", protect, getUserSavedComponents);

export default router;
