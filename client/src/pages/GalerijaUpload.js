import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import API_URL from "../api";

function GalerijaUpload() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (!imageUrl || !title) {
      setError("Dodaj sliku i naziv jela");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ imageUrl, title }),
    });

    if (!res.ok) {
      setError("Greška pri uploadu");
      return;
    }

    navigate("/galerija");
  };

  return (
    <div className="container">
      <h1>Dodaj sliku u galeriju</h1>

      <UploadImage onSuccess={setImageUrl} />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="preview"
          style={{ width: "300px", margin: "20px 0", borderRadius: "12px" }}
        />
      )}

      <input
        placeholder="Naziv jela"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={handleSubmit}>Objavi</button>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}

export default GalerijaUpload;
