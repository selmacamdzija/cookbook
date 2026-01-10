import { useEffect, useState } from "react";
import DodajRecept from "./dodajRecept";

const Recepti = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch("/api/recipes");
      const data = await res.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  const handleRecipeAdded = (newRecipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  return (
    <div className="container">
      <DodajRecept onRecipeAdded={handleRecipeAdded} />

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>
              <strong>Sastojci:</strong>{" "}
              {recipe.ingredients.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recepti;
