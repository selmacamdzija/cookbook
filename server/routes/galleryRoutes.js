const express = require("express");
const router = express.Router();

const {
  getGallery,
  addToGallery,
  likeImage,
} = require("../controllers/galleryController");

const auth = require("../middleware/auth");

/*
  =========================
  GALERIJA – JAVNO
  =========================
  SVI mogu vidjeti slike
*/
router.get("/", getGallery);

/*
  =========================
  GALERIJA – ZAŠTIĆENO
  =========================
  Samo ulogovani mogu:
  - dodavati slike
  - lajkovati
*/
router.post("/", auth, addToGallery);
router.post("/:id/like", auth, likeImage);

module.exports = router;
