import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";

function Galerija() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // forma
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
      const res = await fetch("http://localhost:5000/api/gallery");
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Greška pri učitavanju galerije", err);
    } finally {
      setLoading(false);
    }
  };
const handleLike = async (id) => {
  if (likedImages.includes(id)) return;

  try {
    await fetch(`http://localhost:5000/api/gallery/${id}/like`, {
      method: "POST",
    });

    setImages((prev) =>
      prev.map((img) =>
        img._id === id
          ? { ...img, likes: (img.likes || 0) + 1 }
          : img
      )
    );

    setLikedImages((prev) => [...prev, id]);
  } catch (err) {
    console.error("Greška pri lajkanju", err);
  }
};

  /* =====================
     DELETE – samo autor
  ===================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Sigurno želiš obrisati sliku?")) return;

    try {
      await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      console.error("Greška pri brisanju", err);
    }
  };

  /* =====================
     SUBMIT FORME
  ===================== */
  const handleSubmit = async () => {
    if (!imageUrl || !title) return;

    setSubmitting(true);
      setSuccess("Slika je uspješno dodana.");
setTimeout(() => setSuccess(""), 2500);

    try {
      await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          imageUrl,
          title,
        }),
      

      });

      // reset forme
      setImageUrl("");
      setTitle("");
      setShowForm(false);

      // refresh galerije
      fetchGallery();
    } catch (err) {
      console.error("Greška pri dodavanju slike", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
  return (
    <div className="container">
      <div className="gallery-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="gallery-card skeleton">
            <div className="skeleton-img" />
            <div className="skeleton-line" />
            <div className="skeleton-line small" />
          </div>
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="container">
      <h1>Galerija</h1>
      {success && <p className="subtitle">{success}</p>}
      <p className="subtitle">Fotografije koje su objavili korisnici</p>

      {/* TOGGLE DUGME */}
      {user && (
        <button
          className="add-image-toggle"
          onClick={() => setShowForm(!showForm)}
        >
          ➕ Dodaj sliku
        </button>
      )}

      {/* FORMA (nenapadna) */}
      {user && showForm && (
        <div className="gallery-form">
          <UploadImage onSuccess={setImageUrl} />

          <input
            type="text"
            placeholder="Naziv jela"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Objavljivanje..." : "Objavi"}
          </button>
        </div>
      )}

      {/* GRID */}
      {images.length === 0 ? (
        <p className="subtitle">Još nema fotografija 📸</p>
      ) : (
        <div className="gallery-grid">
          {images.map((img) => (
            <div className="gallery-card" key={img._id}>
              <img src={img.imageUrl} alt={img.title} />

              <p className="gallery-title">
                {img.title || "Bez naziva"}
              </p>

              <p className="gallery-author">
                Autor: {img.createdBy?.username || "Nepoznat"}
              </p>

              <div className="gallery-actions">
                <button
  className="like-btn"
  disabled={likedImages.includes(img._id)}
  onClick={() => handleLike(img._id)}
>
  ❤️ {img.likes || 0}
</button>


                {user &&
                  img.createdBy &&
                  img.createdBy._id === user._id && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(img._id)}
                    >
                      🗑 Obriši
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Galerija;
