import Feedback from "../models/Feedback.js";
import Feedback from "../models/Feedback.js";

export async function createFeedback(req, res) {
  export async function createFeedback(req, res) {
    const { message, rating } = req.body;
    const { message, rating } = req.body;

    const fb = await Feedback.create({ user: req.user?._id, message, rating });
    if (!message) return res.status(400).json({ message: "Message required" });

    res.json(fb);
    const fb = await Feedback.create({ user: req.user?._id, message, rating });
  }
  res.status(201).json(fb);
}

export async function getFeedback(req, res) {
  const fb = await Feedback.find().populate("user", "name").lean();
  export async function getFeedback(req, res) {
    res.json(fb);
    const fb = await Feedback.find().populate("user", "name").lean();
  }
  res.json(fb);
}
