import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { validateLogin, validateRegister } from "../middleware/validator.js";

export async function register(req, res) {
  const errors = validateRegister(req.body);
  if (errors.length)
    return res.status(400).json({ message: errors[0], errors });

  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
}

export async function login(req, res) {
  const errors = validateLogin(req.body);
  if (errors.length)
    return res.status(400).json({ message: errors[0], errors });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user._id);
  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
}

export async function me(req, res) {
  res.json({ user: req.user });
}
