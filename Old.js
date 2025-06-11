require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ An haɗu da MongoDB Atlas"))
.catch(err => console.error("❌ Kuskure wajen haɗuwa da MongoDB:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  pregnancyWeek: String,
});

const User = mongoose.model("User", userSchema);

/**
 * REGISTER
 */
app.post("/register", async (req, res) => {
  const { name, email, password, pregnancyWeek } = req.body;

  if (!name || !email || !password || !pregnancyWeek) {
    return res.status(400).json({ success: false, message: "Dukkan filayen dole ne a cike." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "Wannan email ɗin ya riga da rajista." });
    }

    const newUser = new User({ name, email, password, pregnancyWeek });
    await newUser.save();

    res.status(201).json({ success: true, message: "An yi rajista cikin nasara!" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Akwai matsala wajen yin rajista." });
  }
});

/**
 * LOGIN
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email ko kalmar sirri ba daidai ba ne." });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "An shiga cikin nasara!",
      token,
      user: {
        name: user.name,
        email: user.email,
        pregnancyWeek: user.pregnancyWeek,
      },
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Matsala wajen login." });
  }
});

/**
 * CONTACT FORM
 */
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Duk filayen dole ne a cike." });
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
    subject: `Sako daga ${name} ta UwaLafiya Contact Form`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Saƙon ka an tura shi cikin nasara!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Akwai matsala wajen aika saƙon." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server na gudana a port ${PORT}`));