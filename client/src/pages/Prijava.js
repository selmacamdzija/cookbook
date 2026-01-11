import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../api";

const Prijava = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Neuspješna prijava");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch {
      setError("Greška na serveru");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Dobrodošla nazad</h1>

        <p className="subtitle">
          Tvoj mali digitalni kutak za recepte i inspiraciju ✨
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email adresa"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Prijavi se</button>
        </form>

        <p className="auth-switch">
          Nemaš račun? <Link to="/registracija">Registruj se</Link>
        </p>
      </div>
    </div>
  );
};

export default Prijava;
