const Gallery = require("../models/Gallery");

// GET – sve slike
exports.getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dohvaćanju galerije" });
  }
};

// POST – dodaj sliku (bez autha)
exports.createGalleryItem = async (req, res) => {
  try {
    const { imageUrl, title } = req.body;

    if (!imageUrl || !title) {
      return res.status(400).json({ message: "Nedostaju podaci" });
    }

    const newItem = new Gallery({
      imageUrl,
      title,
      createdBy: null, // JAVNO
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dodavanju slike" });
  }
};

// LIKE – samo jednom po useru (frontend kontrola)
exports.likeGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Nije pronađeno" });

    item.likes += 1;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Greška pri lajkanju" });
  }
};
