import DATA from "../data/resume";
import { useFadeIn } from "../hooks/useFadeIn";
import "./Projects.css";

export default function Projects() {
  useFadeIn();

  return (
    <section id="projects">
      <div className="fade-in">
        <p className="section-label">Selected Work</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-divider" />
      </div>
      <div className="projects-grid">
        {DATA.projects.map((p, i) => (
          <div
            className="project-card fade-in"
            key={p.title}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="project-num">
              Project_{String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-stack">
              {p.stack.map((t) => (
                <span className="stack-tag" key={t}>{t}</span>
              ))}
            </div>
            <div className="project-links">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                  ↗ Backend Repo
                </a>
              )}
              {p.frontendGithub && (
                <a href={p.frontendGithub} target="_blank" rel="noreferrer" className="project-link">
                  ↗ Frontend Repo
                </a>
              )}
              {!p.github && !p.demo && (
                <span className="project-academic">
                  Academic Project — Govt. College of Engineering
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
