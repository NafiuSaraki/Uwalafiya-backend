require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();

// Middleware
app.use(cors()); // Yana yarda da duk origin, ko zaka iya amfani da: origin: process.env.CORS_ORIGIN
app.use(express.json());

// Fake in-memory database (za a maye gurbin wannan da DB a gaba)
const users = [];

/**
 * REGISTER
 */
app.post("/register", (req, res) => {
  const { name, email, password, pregnancyWeek } = req.body;
  console.log("REGISTER DATA:", req.body);

  if (!name || !email || !password || !pregnancyWeek) {
    return res.status(400).json({ success: false, message: "Dukkan filayen dole ne a cike." });
  }

  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ success: false, message: "Wannan email ɗin ya riga da rajista." });
  }

  users.push({ name, email, password, pregnancyWeek });
  res.status(201).json({ success: true, message: "An yi rajista cikin nasara!" });
});

/**
 * LOGIN
 */
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("LOGIN DATA:", req.body);

  const user = users.find(user => user.email === email && user.password === password);
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
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Akwai matsala wajen aika saƙon." });
  }
});

/**
 * Serve React frontend if deployed
 */
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

/**
 * START SERVER
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server na gudana a port ${PORT}`));