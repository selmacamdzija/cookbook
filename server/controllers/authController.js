const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Sva polja su obavezna",
      });
    }

    // 🔹 Provjera emaila
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email je već registrovan",
      });
    }

    // 🔹 Provjera username-a
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Korisničko ime je već zauzeto",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // ✅ AUTOMATSKA PRIJAVA
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Greška na serveru",
    });
  }
};

/* =====================
   LOGIN
===================== */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Sva polja su obavezna" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Neispravni podaci" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Neispravni podaci" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Greška na serveru" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
