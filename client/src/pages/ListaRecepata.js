import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function ListaRecepata() {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/recipes/${category}/${subCategory}`
        );
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Greška pri učitavanju recepata", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category, subCategory]);

  if (loading) {
    return (
      <div className="container">
        <p>Učitavanje recepata...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* ✅ BACK DUGME – vodi NA KATEGORIJU */}
      <button
        className="back-btn"
        onClick={() => navigate(`/jela/${category}`)}
      >
        ← Nazad
      </button>

      {recipes.length === 0 ? (
        <p>Nema recepata u ovoj kategoriji.</p>
      ) : (
        <div className="gallery-grid">
          {recipes.map((recipe) => (
            <Link
              key={recipe._id}
              to={`/recept/${recipe._id}`}
              className="gallery-card"
            >
              <div className="gallery-info">
                <h3>{recipe.title}</h3>
                {recipe.description && (
                  <p>{recipe.description.slice(0, 90)}...</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaRecepata;
