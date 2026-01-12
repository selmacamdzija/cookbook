import { useEffect, useState } from "react";
import API_URL from "../api";
import { Link } from "react-router-dom";

function Galerija() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Greška pri dohvaćanju galerije", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div className="container">
      <h1>Galerija</h1>

      {/* FORMA OSTAJEEEE */}
      <Link to="/galerija/dodaj">
        <button className="btn-add">Dodaj sliku</button>
      </Link>

      <div className="gallery-grid">
        {images.length === 0 && <p>Nema slika u galeriji.</p>}

        {images.map((img) => (
          <div className="gallery-card" key={img._id}>
            <img src={img.imageUrl} alt={img.title} />
            <h3>{img.title}</h3>
            <p>❤️ {img.likes || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galerija;
