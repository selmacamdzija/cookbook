import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/prijava");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        {/* LOGO */}
        <div className="logo">
          <Link to="/">CookBook</Link>
        </div>

        {/* NAV LINKS */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* JELA */}
          <li className="dropdown">
            <span className="dropdown-title">Jela</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/jela/slana">Slana jela</Link>
              </li>
              <li>
                <Link to="/jela/slatka">Slatka jela</Link>
              </li>
              <li>
                <Link to="/jela/lagano-zdravo">Lagano & zdravo</Link>
              </li>
              <li>
                <Link to="/jela/pica">Pića</Link>
              </li>

              {isLoggedIn && (
                <li>
                  <Link to="/dodaj-recept">➕ Dodaj recept</Link>
                </li>
              )}
            </ul>
          </li>

          <li>
            <Link to="/galerija">Galerija</Link>
          </li>

          {/* AUTH */}
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/prijava">Prijava</Link>
              </li>
              
            </>
          ) : (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Odjava
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
