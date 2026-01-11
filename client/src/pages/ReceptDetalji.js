import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../api";

function ReceptDetalji() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/recipes/single/${id}`
        );
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error("Greška pri učitavanju recepta", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="recipe-detail-wrapper">
        <p>Učitavanje recepta...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-wrapper">
        <p>Recept nije pronađen.</p>
      </div>
    );
  }

  return (
    <div className="recipe-detail-wrapper">
      <div className="recipe-detail-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Nazad
        </button>

        <h1>{recipe.title}</h1>

        <p className="recipe-meta">
          {recipe.category || "—"}
          {recipe.subCategory && ` / ${recipe.subCategory}`}
        </p>

        {recipe.description && (
          <p className="recipe-description">{recipe.description}</p>
        )}

        {recipe.ingredients?.length > 0 && (
          <>
            <h3>Sastojci</h3>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {recipe.steps && (
          <>
            <h3>Priprema</h3>
            <p>{recipe.steps}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ReceptDetalji;
