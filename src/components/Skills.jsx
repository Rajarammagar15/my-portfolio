import DATA from "../data/resume";
import { useFadeIn } from "../hooks/useFadeIn";
import "./Skills.css";

export default function Skills() {
  useFadeIn();

  return (
    <section id="skills">
      <div className="fade-in">
        <p className="section-label">What I work with</p>
        <h2 className="section-title">Technical Skills</h2>
        <div className="section-divider" />
      </div>
      <div className="skills-grid">
        {DATA.skills.map((sk, i) => (
          <div
            className="skill-card fade-in"
            key={sk.title}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="skill-card-icon">{sk.icon}</div>
            <div className="skill-card-title">{sk.title}</div>
            <div className="skill-tags">
              {sk.tags.map((t) => (
                <span className="skill-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
