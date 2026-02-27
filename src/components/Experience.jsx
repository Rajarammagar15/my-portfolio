import DATA from "../data/resume";
import { useFadeIn } from "../hooks/useFadeIn";
import "./Experience.css";

export default function Experience() {
  useFadeIn();

  return (
    <section id="experience">
      <div className="fade-in">
        <p className="section-label">Career Path</p>
        <h2 className="section-title">Experience</h2>
        <div className="section-divider" />
      </div>

      <div className="exp-timeline">
        {/* Work Experience */}
        {DATA.experience.map((ex, i) => (
          <div className="exp-item fade-in" key={i}>
            <div className="exp-meta">
              <span className="exp-period">{ex.period}</span>
              <span className="exp-company">{ex.company}</span>
            </div>
            <div className="exp-role">{ex.role}</div>
            {ex.sections.map((sec) => (
              <div key={sec.label}>
                <div className="exp-section-label">— {sec.label}</div>
                <ul className="exp-desc">
                  {sec.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {/* Education */}
        <div className="exp-item fade-in">
          <div className="exp-meta">
            <span className="exp-period">{DATA.education.period}</span>
            <span className="exp-company">{DATA.education.college}</span>
          </div>
          <div className="exp-role">{DATA.education.degree}</div>
          <ul className="exp-desc">
            <li>CGPA: {DATA.education.cgpa}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
