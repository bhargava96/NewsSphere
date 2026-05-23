import { NavLink } from "react-router-dom";
import logo from "../assets/news-logo.png";

function Header({ theme, toggleTheme }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom px-3">
      {/* Logo instead of text */}
      <NavLink className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="NewsSphere Logo"
          style={{ height: "46px", width: "80px", marginRight: "8px" }}
        />
      </NavLink>

      <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu" style={{ borderColor: "var(--border-color)" }}>
        <span className="navbar-toggler-icon" style={{ filter: theme === "dark" ? "invert(1)" : "none" }}></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="menu">
        <ul className="navbar-nav align-items-center">
          {[
            ["Home", "/"],
            ["TopHeadlines", "/headlines"],
            ["Categories", "/categories"],
            ["Sources", "/source"],
            ["Bitcoin", "/bitcoin"],
            ["Feeds", "/feeds"],
            ["Search", "/search"],
            ["About", "/about"]
          ].map(([name, path]) => (
            <li className="nav-item" key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
          <li className="nav-item">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
