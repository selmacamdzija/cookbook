const Gallery = require("../models/Gallery");

/* =========================
   GET – sva galerija
========================= */
exports.getGallery = async (req, res) => {
  try {
    const images = await Gallery.find()
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dohvaćanju galerije" });
  }
};

/* =========================
   POST – like / unlike
========================= */
exports.toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const imageId = req.params.id;

    const image = await Gallery.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Slika ne postoji" });
    }

    const alreadyLiked = image.likedBy.includes(userId);

    if (alreadyLiked) {
      // UNLIKE
      image.likedBy.pull(userId);
      image.likes = Math.max(0, image.likes - 1);
    } else {
      // LIKE
      image.likedBy.push(userId);
      image.likes += 1;
    }

    await image.save();

    res.json({
      likes: image.likes,
      likedByUser: !alreadyLiked,
    });
  } catch (err) {
    res.status(500).json({ message: "Greška pri lajkanju" });
  }
};

/* =========================
   DELETE – samo autor
========================= */
exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Slika ne postoji" });
    }

    // ⬇️ SAMO AUTOR
    if (image.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Nemaš pravo brisanja" });
    }

    await image.deleteOne();

    res.json({ message: "Slika obrisana" });
  } catch (err) {
    res.status(500).json({ message: "Greška pri brisanju" });
  }
};
