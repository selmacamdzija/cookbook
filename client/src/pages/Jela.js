import { Link } from "react-router-dom";

function Jela() {
  return (
    <div className="container">
      <h1>Jela</h1>
      <p className="subtitle">
        Istraži recepte po kategorijama i pronađi inspiraciju za svaki dan.
      </p>

      <div className="categories-grid">
        <Link to="/jela/slana" className="category-card">
          <h3>🍽 Slana jela</h3>
          <p>Čorbe, glavna jela i brzi obroci</p>
        </Link>

        <Link to="/jela/slatka" className="category-card">
          <h3>🧁 Slatka jela</h3>
          <p>Kolači, torte i deserti</p>
        </Link>

        <Link to="/jela/lagano-zdravo" className="category-card">
  <h3>🥗 Lagano & zdravo</h3>
  <p>Balansirani i lagani obroci</p>
</Link>


        <Link to="/jela/pica" className="category-card">
          <h3>☕ Pića</h3>
          <p>Topli napici i osvježenje</p>
        </Link>
      </div>
    </div>
  );
}

export default Jela;
