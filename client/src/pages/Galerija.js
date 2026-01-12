import { useEffect, useState } from "react";
import API_URL from "../api";

function Galerija() {
  const [items, setItems] = useState([]);
  const liked = JSON.parse(localStorage.getItem("likedImages")) || [];

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const likeImage = async (id) => {
    if (liked.includes(id)) return;

    await fetch(`${API_URL}/api/gallery/${id}/like`, {
      method: "POST",
    });

    localStorage.setItem(
      "likedImages",
      JSON.stringify([...liked, id])
    );

    setItems(items =>
      items.map(item =>
        item._id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Galerija</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {items.map(item => (
          <div key={item._id} style={{ width: "240px" }}>
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ width: "100%", borderRadius: "12px" }}
            />
            <h4>{item.title}</h4>

            <button
              onClick={() => likeImage(item._id)}
              disabled={liked.includes(item._id)}
            >
              ❤️ {item.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galerija;
