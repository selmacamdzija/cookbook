import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Prijava = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    setError(data.message || "Neuspješna prijava");
    return;
  }

  // ⬇️ LOGIN USPJEŠAN – ODAVDE SE VIŠE NIŠTA NE POSTAVLJA
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
navigate("/");


};



  return (
  <div className="auth-wrapper">
    <div className="auth-card">
      <h1>Dobrodošla nazad</h1>

      <p className="subtitle">
        Tvoj mali digitalni kutak za recepte i inspiraciju ✨
      </p>

      {error !== null && <p className="auth-error">{error}</p>}

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
}

export default Prijava;
