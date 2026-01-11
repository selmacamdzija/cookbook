import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../api";

function KategorijaJela() {
  const { kategorija } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/recipes?category=${kategorija}`
        );
        const data = await res.json();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
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
              {recipe.ingredients?.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KategorijaJela;
