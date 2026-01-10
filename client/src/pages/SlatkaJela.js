import { Link, useNavigate } from "react-router-dom";

function SlatkaJela() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/jela")}>
        ← Nazad na kategorije
      </button>

      <h1>Slatka jela</h1>

      <div className="categories-grid">
        <Link to="/jela/slatka/kolaci" className="category-card">
          <h3>🍰 Kolači</h3>
        </Link>

        <Link to="/jela/slatka/torte" className="category-card">
          <h3>🎂 Torte</h3>
        </Link>

        <Link to="/jela/slatka/deserti" className="category-card">
          <h3>🍨 Desert</h3>
        </Link>
      </div>
    </div>
  );
}

export default SlatkaJela;
