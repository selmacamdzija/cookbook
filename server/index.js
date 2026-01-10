require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});


// ⬇️ API RUTE PRVO
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/gallery", galleryRoutes);

// ⬇️ ROOT RUTA NA KRAJU
app.get("/", (req, res) => {
  res.send("CookBook server radi");
});

app.listen(5000, () => {
  console.log("Server je pokrenut na portu 5000");
});
