require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ Error connecting to MongoDB:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  pregnancyWeek: { type: String, default: "1" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

/**
 * REGISTER
 */
app.post("/register", async (req, res) => {
  const { name, email, password, pregnancyWeek } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "This email is already registered." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      pregnancyWeek: pregnancyWeek || "1"
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "Registration successful!" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "There was a problem during registration." });
  }
});

/**
 * LOGIN
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        name: user.name,
        email: user.email,
        pregnancyWeek: user.pregnancyWeek,
      },
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Login failed due to a server error." });
  }
});

/**
 * CONTACT FORM
 */
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name} via MumCare Contact Form`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Your message was sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send the message." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
