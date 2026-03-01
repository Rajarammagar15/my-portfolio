import profilePhoto from "../assets/profile.jpg";
import DATA from "../data/resume";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="about">
      <div className="hero-bg" />
      <div className="hero-grid" />

      {/* Left: text content */}
      <div className="hero-content">
        <div className="hero-greeting">Open to new opportunities</div>
        <h1 className="hero-name">
          Rajaram <em>Magar</em>
        </h1>
        <div className="hero-role">{DATA.role}</div>
        <p className="hero-bio">{DATA.bio}</p>
        <div className="hero-cta">
          <a href="#experience" className="btn-primary">View Experience</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
        <div className="cert-badges">
          {DATA.certifications.map((c) => (
            <span className="cert-badge" key={c}>🏆 {c}</span>
          ))}
        </div>
        <div className="hero-stats">
          {DATA.stats.map((s) => (
            <div key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: photo */}
      <div className="hero-photo-wrapper">
        <img src={profilePhoto} alt="Rajaram Magar" className="hero-photo" />
      </div>
    </section>
  );
}
