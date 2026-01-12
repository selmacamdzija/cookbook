const GalleryItem = require("../models/GalleryItem");

// GET – sve slike
exports.getGallery = async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dohvaćanju galerije" });
  }
};

// POST – dodaj sliku
exports.createGalleryItem = async (req, res) => {
  try {
    const { imageUrl, title } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Nedostaje imageUrl" });
    }

    const newItem = new GalleryItem({
      imageUrl,
      title,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dodavanju slike" });
  }
};
