import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";

function Galerija() {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Greška pri učitavanju galerije");
        }
        return res.json();
      })
      .then((data) => {
        setGallery(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Ne mogu učitati galeriju");
      });
  }, []);

  return (
    <div className="container">
      <div className="galerija-header">
        <h1>Galerija</h1>

        {/* Dugme za dodavanje – vodi na protected rutu */}
        <Link to="/galerija/dodaj" className="btn">
          + Dodaj sliku
        </Link>
      </div>

      {error && <p className="auth-error">{error}</p>}

      <div className="galerija-grid">
        {gallery.map((item) => (
          <div className="galerija-card" key={item._id}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="galerija-img"
            />
            <h3>{item.title}</h3>
            <div className="likes">❤️ {item.likes || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galerija;
