import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  /* =====================
     FETCH SVIH RECEPATA
  ===================== */
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        const data = await res.json();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchRecipes();
  }, []);

  /* =====================
     JELO DANA (24h)
  ===================== */
  useEffect(() => {
    if (recipes.length === 0) return;

    const stored = localStorage.getItem("featuredRecipe");
    const storedTime = localStorage.getItem("featuredRecipeTime");

    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (stored && storedTime && now - storedTime < ONE_DAY) {
      setFeaturedRecipe(JSON.parse(stored));
    } else {
      const random =
        recipes[Math.floor(Math.random() * recipes.length)];
      setFeaturedRecipe(random);
      localStorage.setItem("featuredRecipe", JSON.stringify(random));
      localStorage.setItem("featuredRecipeTime", now);
    }
  }, [recipes]);

  /* =====================
     SEARCH – SAMO NA ENTER
  ===================== */
  const handleSearchKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (!searchTerm.trim()) return;

    const term = searchTerm.toLowerCase();

    const match = recipes.find(
      (r) =>
        r.title?.toLowerCase().includes(term) ||
        r.ingredients?.some((i) =>
          i.toLowerCase().includes(term)
        )
    );

    if (match) {
      navigate(`/jela/${match.category}/${match.subCategory}`);
    }
  };

  /* =====================
     CLICK NA JELO DANA
  ===================== */
  const handleFeaturedClick = () => {
    if (!featuredRecipe) return;

    navigate(
      `/jela/${featuredRecipe.category}/${featuredRecipe.subCategory}`
    );
  };

  return (
    <div className="container">
      {/* HERO */}
      <div className="hero">
        <h1>Dobrodošli u CookBook</h1>
        <p className="subtitle">
          Inspiracija za svaki dan — jednostavni recepti i ljubav prema kuhinji.
        </p>

        {/* SEARCH + JELO DANA */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          {/* SEARCH – LIJEVO */}
          <input
            type="text"
            placeholder="Pretraži jela ili sastojke..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            style={{
              width: "420px",
              padding: "14px 20px",
              borderRadius: "999px",
              border: "none",
              outline: "none",
              fontSize: "15px",
            }}
          />

          {/* JELO DANA – DESNO */}
          {featuredRecipe && (
            <div
              className="featured-card"
              onClick={handleFeaturedClick}
            >
              <p className="featured-label">Jelo dana</p>

              <h3>{featuredRecipe.title}</h3>

              <p className="featured-desc">
                {featuredRecipe.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
