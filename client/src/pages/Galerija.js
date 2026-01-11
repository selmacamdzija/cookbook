import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";
import API_URL from "../api";

function Galerija() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [likedImages, setLikedImages] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    if (likedImages.includes(id)) return;

    await fetch(`${API_URL}/api/gallery/${id}/like`, {
      method: "POST",
    });

    setImages((prev) =>
      prev.map((img) =>
        img._id === id ? { ...img, likes: (img.likes || 0) + 1 } : img
      )
    );

    setLikedImages((prev) => [...prev, id]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sigurno želiš obrisati sliku?")) return;

    await fetch(`${API_URL}/api/gallery/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  const handleSubmit = async () => {
    if (!imageUrl || !title) return;

    setSubmitting(true);
    setSuccess("Slika je uspješno dodana.");
    setTimeout(() => setSuccess(""), 2500);

    await fetch(`${API_URL}/api/gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ imageUrl, title }),
    });

    setImageUrl("");
    setTitle("");
    setShowForm(false);
    fetchGallery();
    setSubmitting(false);
  };

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div className="container">
      <h1>Galerija</h1>
      {success && <p className="subtitle">{success}</p>}

      {user && (
        <button onClick={() => setShowForm(!showForm)}>
          ➕ Dodaj sliku
        </button>
      )}

      {user && showForm && (
        <div className="gallery-form">
          <UploadImage onSuccess={setImageUrl} />
          <input
            placeholder="Naziv jela"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleSubmit}>
            {submitting ? "Objavljivanje..." : "Objavi"}
          </button>
        </div>
      )}

      <div className="gallery-grid">
        {images.map((img) => (
          <div className="gallery-card" key={img._id}>
            <img src={img.imageUrl} alt={img.title} />
            <p>{img.title}</p>

            <button
              disabled={likedImages.includes(img._id)}
              onClick={() => handleLike(img._id)}
            >
              ❤️ {img.likes || 0}
            </button>

            {user && img.createdBy?._id === user._id && (
              <button onClick={() => handleDelete(img._id)}>
                🗑 Obriši
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galerija;
