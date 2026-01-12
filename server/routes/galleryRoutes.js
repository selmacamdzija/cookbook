const express = require("express");
const router = express.Router();

const {
  getGallery,
  addToGallery,
} = require("../controllers/galleryController");

const auth = require("../middleware/auth");

// ✅ JAVNO – svi mogu vidjeti galeriju
router.get("/", getGallery);

// 🔐 DODAVANJE – samo prijavljeni (ako hoćeš kasnije i ovo javno, skineš auth)
router.post("/", auth, addToGallery);

module.exports = router;
