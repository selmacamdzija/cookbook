import { Link, useNavigate } from "react-router-dom";

function SlanaJela() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/jela")}>
        ← Nazad na kategorije
      </button>

      <h1>Slana jela</h1>
      <p className="subtitle">
        Od toplih čorbi do brzih svakodnevnih obroka.
      </p>

      <div className="categories-grid">
        <Link to="/jela/slana/corbe" className="category-card">
          <h3>🥣 Čorbe & supe</h3>
          <p>Tople, domaće i hranjive</p>
        </Link>

        <Link to="/jela/slana/veganska" className="category-card">
          <h3>🌱 Veganska jela</h3>
          <p>Biljna i lagana kuhinja</p>
        </Link>

        <Link to="/jela/slana/tjestenine" className="category-card">
          <h3>🍝 Tjestenine</h3>
          <p>Klasični i moderni recepti</p>
        </Link>

        <Link to="/jela/slana/brza" className="category-card">
          <h3>⚡ Brza jela</h3>
          <p>Gotovo za manje od 30 minuta</p>
        </Link>
      </div>
    </div>
  );
}

export default SlanaJela;
