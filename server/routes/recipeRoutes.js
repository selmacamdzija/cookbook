const express = require("express");
const router = express.Router();

const {
  getRecipes,
  getRecipesByCategoryAndSub,
  createRecipe,
  getRecipeById,
} = require("../controllers/recipeController");

// ⬅️ POJEDINAČNI RECEPT (MORA BITI GORE)
router.get("/single/:id", getRecipeById);

// ⬅️ LISTA PO KATEGORIJI
router.get("/:category/:subCategory", getRecipesByCategoryAndSub);

// ⬅️ SVI RECEPTI
router.get("/", getRecipes);

// ⬅️ DODAVANJE
router.post("/", createRecipe);

module.exports = router;

