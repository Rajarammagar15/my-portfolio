import { useState, useEffect } from "react";
import "./Navbar.css";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => setMenuOpen(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">&lt;<span>RM</span>&gt;</div>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="mobile-link"
            onClick={handleLinkClick}
          >
            {l}
          </a>
        ))}
      </div>
    </>
  );
}
