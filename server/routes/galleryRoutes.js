const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getGallery,
  toggleLike,
  deleteImage,
  createImage, // ✅ DODANO
} = require("../controllers/galleryController");

/* =========================
   GET – sve slike
========================= */
router.get("/", getGallery);

/* =========================
   POST – dodaj sliku  ✅ DODANO
========================= */
router.post("/", authMiddleware, createImage);

/* =========================
   LIKE / UNLIKE
========================= */
router.post("/:id/like", authMiddleware, toggleLike);

/* =========================
   DELETE
========================= */
router.delete("/:id", authMiddleware, deleteImage);

module.exports = router;
