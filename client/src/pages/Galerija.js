import { useEffect, useState } from "react";
import API_URL from "../api";

function Galerija() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/gallery`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Greška pri fetchu galerije:", res.status);
          return;
        }

        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Greška:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return <p style={{ padding: "40px" }}>Učitavanje galerije...</p>;
  }

  return (
    <div className="gallery-container">
      {images.length === 0 && (
        <p style={{ padding: "40px" }}>Galerija je prazna.</p>
      )}

      <div className="gallery-grid">
        {images.map((img) => (
          <div className="gallery-card" key={img._id}>
            <img src={img.imageUrl} alt={img.title} />
            <p>{img.title}</p>
            <div className="likes">
              ❤️ {img.likes || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galerija;
