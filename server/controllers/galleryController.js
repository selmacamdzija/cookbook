const Gallery = require("../models/Gallery");

// GET /api/gallery
exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find()
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dohvaćanju galerije" });
  }
};

// POST /api/gallery
exports.createGalleryItem = async (req, res) => {
  try {
    const { imageUrl, title } = req.body;

    if (!imageUrl || !title) {
      return res.status(400).json({ message: "Nedostaju podaci" });
    }

    const item = new GalleryItem({
      imageUrl,
      title,
      createdBy: req.user?._id || null,
      likedBy: [],
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dodavanju slike" });
  }
};

// POST /api/gallery/:id/like
exports.toggleLike = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Ne postoji" });

    const userId = req.user._id.toString();

    const index = item.likedBy.findIndex(
      (id) => id.toString() === userId
    );

    if (index === -1) {
      item.likedBy.push(userId);
    } else {
      item.likedBy.splice(index, 1);
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Greška pri lajku" });
  }
};
