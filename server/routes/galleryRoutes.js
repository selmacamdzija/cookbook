const express = require("express");
const router = express.Router();

const {
  getGallery,
  toggleLike,
  deleteImage,
} = require("../controllers/galleryController");

const authMiddleware = require("../middleware/authMiddleware");

// GET
router.get("/", getGallery);

// LIKE / UNLIKE
router.post("/:id/like", authMiddleware, toggleLike);

// DELETE (samo autor)
router.delete("/:id", authMiddleware, deleteImage);

module.exports = router;
