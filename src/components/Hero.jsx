import profilePhoto from "../assets/profile.jpeg";
import DATA from "../data/resume";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="about">
      <div className="hero-bg" />
      <div className="hero-grid" />

      {/* Left: text */}
      <div className="hero-content">
        <div className="hero-greeting">Open to new opportunities</div>
        <h1 className="hero-name">
          Rajaram <em>Magar</em>
        </h1>
        <div className="hero-role">// {DATA.role}</div>
        <p className="hero-bio">{DATA.bio}</p>

        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>

        {/* Certifications */}
        <div className="cert-badges">
          {DATA.certifications.map((c) => (
            <span className="cert-badge" key={c}>🏆 {c}</span>
          ))}
        </div>

        {/* Awards */}
        <div className="award-badges">
          {DATA.awards.map((a) => (
            <span className="award-badge" key={a}>{a}</span>
          ))}
        </div>

        {/* Stats */}
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