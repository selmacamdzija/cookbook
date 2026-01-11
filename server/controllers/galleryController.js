const Gallery = require("../models/Gallery");

/* =========================
   GET – galerija
========================= */
exports.getGallery = async (req, res) => {
  try {
    const images = await Gallery.find()
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Greška pri učitavanju galerije" });
  }
};

/* =========================
   POST – dodaj sliku  ✅ DODANO
========================= */
exports.createImage = async (req, res) => {
  try {
    const { imageUrl, title } = req.body;

    if (!imageUrl || !title) {
      return res.status(400).json({ message: "Nedostaju podaci" });
    }

    const image = new Gallery({
      imageUrl,
      title,
      createdBy: req.user.id,
    });

    await image.save();

    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dodavanju slike" });
  }
};

/* =========================
   LIKE / UNLIKE
========================= */
exports.toggleLike = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Slika ne postoji" });

    const userId = req.user.id;
    const index = image.likedBy.indexOf(userId);

    if (index === -1) {
      image.likedBy.push(userId);
    } else {
      image.likedBy.splice(index, 1);
    }

    await image.save();
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: "Greška pri lajkanju" });
  }
};

/* =========================
   DELETE
========================= */
exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Slika ne postoji" });

    if (image.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Nemaš pravo brisanja" });
    }

    await image.deleteOne();
    res.json({ message: "Slika obrisana" });
  } catch (err) {
    res.status(500).json({ message: "Greška pri brisanju slike" });
  }
};
