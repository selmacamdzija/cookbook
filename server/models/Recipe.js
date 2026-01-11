const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: {
      type: [String],
      required: true,
    },

    steps: {
  type: [String],
  required: false,
},



    category: {
      type: String,
      required: true, // slana, slatka, lagano-zdravo, pica
      lowercase: true,
      trim: true,
    },

    subCategory: {
      type: String,
      required: true, // tjestenine, kolaci, supe...
      lowercase: true,
      trim: true,
    },

    image: {
      type: String, // URL ili naziv fajla (opcionalno)
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
