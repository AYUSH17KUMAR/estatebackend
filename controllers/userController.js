import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ _id: user.id, email: user.email, token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
