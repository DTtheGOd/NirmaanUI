import { Router } from "express";
import {
  createFeedback,
  getFeedback,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getFeedback);
router.post("/", protect, createFeedback);

export default router;
