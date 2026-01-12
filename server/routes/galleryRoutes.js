const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const auth = require("../middleware/auth");

// javno
router.get("/", galleryController.getGallery);

// mora biti prijavljen
router.post("/", auth, galleryController.createGalleryItem);
router.post("/:id/like", auth, galleryController.toggleLike);

module.exports = router;
