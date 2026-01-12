const express = require("express");
const router = express.Router();

const {
  getGallery,
  addToGallery,
} = require("../controllers/galleryController");

const auth = require("../middleware/auth");

// ✅ JAVNO – svi mogu vidjeti galeriju
router.get("/", getGallery);

router.post("/", galleryController.createGalleryItem);


module.exports = router;
