const Gallery = require("../models/Gallery");

// GET sve slike
exports.getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Greška" });
  }
};

// POST dodaj sliku
exports.createGalleryItem = async (req, res) => {
  try {
    const { imageUrl, title } = req.body;

    if (!imageUrl || !title) {
      return res.status(400).json({ message: "Nedostaju podaci" });
    }

    const item = new Gallery({
      imageUrl,
      title,
      createdBy: null,
    });

    await item.save();
    res.status(201).json(item);
  } catch {
    res.status(500).json({ message: "Greška" });
  }
};

// LIKE (server samo uvećava)
exports.likeGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Nema slike" });

    item.likes += 1;
    await item.save();

    res.json(item);
  } catch {
    res.status(500).json({ message: "Greška" });
  }
};
