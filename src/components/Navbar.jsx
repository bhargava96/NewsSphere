import { NavLink } from "react-router-dom";
import logo from "../assets/news-logo.png";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* Logo instead of text */}
      <NavLink className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="NewsSphere Logo"
          style={{ height: "46px", width: "80px", marginRight: "8px" }}
        />
        {/* Optional: text next to logo */}
        {/* <span>NewsSphere</span> */}
      </NavLink>

      <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="menu">
        <ul className="navbar-nav">
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
        </ul>
      </div>
    </nav>
  );
}

export default Header;
