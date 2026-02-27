import { useState, useEffect } from "react";
import "./Navbar.css";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo">
        &lt;<span>RM</span>&gt;
      </div>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
