import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator'


const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' },
    (err, token) => {
        if (err) throw err;}
  );
};

// POST /auth/register
export const register = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
  try {
    const { username, email, password, password2 } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword,
      isGuest: false,
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    res.json({ token, user: { id: newUser._id, username: newUser.username } });

  } catch (err) {
    console.error("❌ Register error:", err);  
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /auth/login
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isGuest: false });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error("❌ Register error:", err);  
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /auth
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("❌ Register error:", err);  
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /auth/guest
export const generateGuestToken = async (req, res) => {
  try {
      const guestUser = new User({
      username: `guest_${Date.now()}`,
      isGuest: true,
    });

    await guestUser.save();

    const token = generateToken(guestUser._id, '1d');
    res.json({ token, user: { id: guestUser._id, username: guestUser.username } });

  } catch (err) {
    console.error("❌ Register error:", err);  
    res.status(500).json({ error: 'Server error' });
  }
}