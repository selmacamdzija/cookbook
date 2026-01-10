import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Greška pri registraciji");
        return;
      }

      // ✅ AUTOMATSKA PRIJAVA
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Ne mogu se spojiti na server");
    }
  };

 return (
  <div className="auth-wrapper">
    <div className="auth-card">
      <h1>Registracija</h1>
      <p className="subtitle">Kreiraj svoj CookBook nalog</p>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registruj se</button>
      </form>
    </div>
  </div>
);
}

export default Register;
