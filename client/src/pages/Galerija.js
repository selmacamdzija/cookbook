import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";

function Galerija() {
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const handleLike = async (id) => {
    if (!token) return alert("Moraš biti prijavljen");

    const res = await fetch(`${API_URL}/api/gallery/${id}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const updated = await res.json();
      setItems((prev) =>
        prev.map((i) => (i._id === updated._id ? updated : i))
      );
    }
  };

  return (
    <div className="container">
      <h1>Galerija</h1>

      {token && (
        <Link to="/galerija/dodaj">
          <button>+ Dodaj sliku</button>
        </Link>
      )}

      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item._id} className="gallery-card">
            <img src={item.imageUrl} alt={item.title} />
            <h3>{item.title}</h3>

            <button onClick={() => handleLike(item._id)}>
              ❤️ {item.likedBy?.length || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galerija;
