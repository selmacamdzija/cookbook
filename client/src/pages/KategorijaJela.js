import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KategorijaJela() {
  const { kategorija } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(
        `http://localhost:5000/api/recipes?category=${kategorija}`
      );
      const data = await res.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, [kategorija]);

  return (
    <div className="container">
      <h1>{kategorija}</h1>

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
}

export default KategorijaJela;
