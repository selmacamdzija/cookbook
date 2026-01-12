const express = require("express");
const router = express.Router();

const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.getGallery);
router.post("/", galleryController.createGalleryItem);

module.exports = router;
