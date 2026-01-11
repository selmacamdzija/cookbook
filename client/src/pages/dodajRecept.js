import { useState } from "react";
import API_URL from "../api";

const SUBCATEGORIES = {
  slana: ["corbe", "tjestenine", "veganska", "brza"],
  slatka: ["kolaci", "torte", "deserti"],
  "lagano-zdravo": ["salate", "proteinsko", "low-carb"],
  pica: ["topli", "hladni", "smoothie"],
};

function DodajRecept() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          subCategory,
          ingredients: ingredients.filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Greška pri dodavanju recepta");
        return;
      }

      setSuccess("Recept je uspješno dodan ✨");
      setTitle("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setIngredients([""]);
    } catch {
      setError("Greška na serveru");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Dodaj novi recept</h1>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Naziv recepta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Opis recepta"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategory("");
            }}
            required
          >
            <option value="">Odaberi kategoriju</option>
            <option value="slana">Slana jela</option>
            <option value="slatka">Slatka jela</option>
            <option value="lagano-zdravo">Lagano & zdravo</option>
            <option value="pica">Pića</option>
          </select>

          {category && (
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
            >
              <option value="">Odaberi podkategoriju</option>
              {SUBCATEGORIES[category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}

          <div>
            <p>Sastojci</p>

            {ingredients.map((item, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Sastojak ${index + 1}`}
                value={item}
                onChange={(e) =>
                  handleIngredientChange(index, e.target.value)
                }
              />
            ))}

            <button type="button" onClick={addIngredient}>
              + Dodaj sastojak
            </button>
          </div>

          <button type="submit">Sačuvaj recept</button>
        </form>
      </div>
    </div>
  );
}

export default DodajRecept;
