import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Greška:", err));
  }, []);

  // Jelo dana – random + 24h
  useEffect(() => {
    if (recipes.length === 0) return;

    const stored = localStorage.getItem("featuredRecipe");
    const storedTime = localStorage.getItem("featuredRecipeTime");
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (stored && storedTime && now - storedTime < ONE_DAY) {
      setFeaturedRecipe(JSON.parse(stored));
    } else {
      const random = recipes[Math.floor(Math.random() * recipes.length)];
      setFeaturedRecipe(random);
      localStorage.setItem("featuredRecipe", JSON.stringify(random));
      localStorage.setItem("featuredRecipeTime", now.toString());
    }
  }, [recipes]);

  const handleSearchKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (!searchTerm.trim()) return;

    const term = searchTerm.toLowerCase();
    const match = recipes.find(
      (r) =>
        r.title?.toLowerCase().includes(term) ||
        r.ingredients?.some((i) => i.toLowerCase().includes(term))
    );

    if (match) {
      navigate(`/jela/${match.category}/${match.subCategory}`);
    }
  };

  const handleFeaturedClick = () => {
    if (!featuredRecipe) return;
    navigate(
      `/jela/${featuredRecipe.category}/${featuredRecipe.subCategory}`
    );
  };

  return (
    <div className="home-hero">
      <div className="home-card">
        <h1>Dobrodošli u CookBook</h1>

        <p className="subtitle">
          Tvoj mali digitalni kutak za recepte i inspiraciju ✨
        </p>

        {/* PRETRAGA */}
        <input
          className="home-search"
          placeholder="Pretraži jelo ili sastojak..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />

        {/* JELO DANA */}
        {featuredRecipe && (
          <div className="featured-card" onClick={handleFeaturedClick}>
            <span className="featured-label">Jelo dana</span>
            <h3>{featuredRecipe.title}</h3>
            <p>{featuredRecipe.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
