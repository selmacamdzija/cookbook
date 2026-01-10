import { Link, useNavigate } from "react-router-dom";

function Pica() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/jela")}>
        ← Nazad na kategorije
      </button>

      <h1>Pića</h1>

      <div className="categories-grid">
        <Link to="/jela/pica/topli" className="category-card">
          <h3>☕ Topli napici</h3>
        </Link>

        <Link to="/jela/pica/hladni" className="category-card">
          <h3>🥤 Hladni napici</h3>
        </Link>

        <Link to="/jela/pica/smoothie" className="category-card">
          <h3>🍓 Smoothie</h3>
        </Link>
      </div>
    </div>
  );
}

export default Pica;
