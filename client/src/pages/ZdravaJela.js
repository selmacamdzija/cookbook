import { Link, useNavigate } from "react-router-dom";

function ZdravaJela() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/jela")}>
        ← Nazad na kategorije
      </button>

      <h1>Lagano & zdravo</h1>

      <div className="categories-grid">
        <Link to="/jela/lagano-zdravo/salate" className="category-card">
          <h3>🥗 Salate</h3>
        </Link>

        <Link to="/jela/lagano-zdravo/proteinsko" className="category-card">
          <h3>💪 Proteinsko</h3>
        </Link>

        <Link to="/jela/lagano-zdravo/low-carb" className="category-card">
          <h3>🥑 Low carb</h3>
        </Link>
      </div>
    </div>
  );
}

export default ZdravaJela;
