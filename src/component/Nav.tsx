import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (pathname !== "/" && pathname !== "/home") {
      navigate("/home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/home" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">T</span>
          TapCard
        </Link>

        {/* Desktop menu */}
        <ul className="nav-desktop">
          <li>
            <a href="#features" onClick={goToSection("features")}>
              Features
            </a>
          </li>
          <li>
            <a href="#templates" onClick={goToSection("templates")}>
              Templates
            </a>
          </li>
          <li>
            <Link to="/support">Support</Link>
          </li>
          <li>
            <a
              href="#download"
              className="nav-cta"
              onClick={goToSection("download")}
            >
              Get App
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile">
          <a href="#features" onClick={goToSection("features")}>
            Features
          </a>
          <a href="#templates" onClick={goToSection("templates")}>
            Templates
          </a>
          <Link to="/support" onClick={() => setMenuOpen(false)}>
            Support
          </Link>
          <Link to="/privacy-policy" onClick={() => setMenuOpen(false)}>
            Privacy
          </Link>
          <a
            href="#download"
            className="nav-mobile-cta"
            onClick={goToSection("download")}
          >
            Get App
          </a>
        </div>
      )}
    </nav>
  );
}
