const Recipe = require("../models/Recipe");

/* =====================
   GET SVI RECEPTI
   (opcionalno po category – query)
===================== */
const getRecipes = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const recipes = await Recipe.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error("GET RECIPES ERROR:", error);
    res.status(500).json({
      message: "Greška pri dohvaćanju recepata",
    });
  }
};

/* =====================
   GET PO CATEGORY + SUBCATEGORY
   (OVO KORISTIŠ ZA /jela/:category/:subCategory)
===================== */
const getRecipesByCategoryAndSub = async (req, res) => {
  try {
    const { category, subCategory } = req.params;

    console.log("FILTER:", category, subCategory);

    const recipes = await Recipe.find({
      category: category,
      subCategory: subCategory,
    }).sort({ createdAt: -1 });

    res.status(200).json(recipes);
  } catch (error) {
    console.error("GET BY CAT+SUB ERROR:", error);
    res.status(500).json({
      message: "Greška pri dohvaćanju recepata",
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("➡️ GET RECIPE BY ID:", id);

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recept nije pronađen",
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("GET RECIPE BY ID ERROR:", error);
    res.status(500).json({
      message: "Greška pri dohvaćanju recepta",
    });
  }
};


/* =====================
   CREATE RECIPE
===================== */
const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      category,
      subCategory,
    } = req.body;

    if (
      !title ||
      !description ||
      !ingredients ||
      !category ||
      !subCategory
    ) {
      return res.status(400).json({
        message: "Nedostaju obavezna polja",
      });
    }

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      category,
      subCategory,
      createdBy: req.userId || null,
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("CREATE RECIPE ERROR:", error);
    res.status(500).json({
      message: "Greška na serveru",
    });
  }
};

module.exports = {
  getRecipes,
  getRecipesByCategoryAndSub,
  createRecipe,
  getRecipeById,
};
