const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");

// JAVNA GALERIJA – BEZ AUTH
router.get("/", galleryController.getGalleryItems);
router.post("/", galleryController.createGalleryItem);
router.post("/:id/like", galleryController.likeGalleryItem);

module.exports = router;
