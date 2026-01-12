const express = require("express");
const router = express.Router();

// ✅ OVO JE FALILO
const galleryController = require("../controllers/galleryController");

// JAVNA GALERIJA (bez auth)
router.get("/", galleryController.getGallery);
router.post("/", galleryController.createGalleryItem);

module.exports = router;
