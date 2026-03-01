import { useState } from "react";
import DATA from "../data/resume";
import { useFadeIn } from "../hooks/useFadeIn";
import "./Projects.css";

// Architecture diagram for AI Stock Prediction project
// Rendered as a clean visual — no image needed
function ArchitectureDiagram() {
  return (
    <div className="arch-diagram">
      <div className="arch-title">System Architecture</div>

      {/* Data Sources */}
      <div className="arch-section">
        <div className="arch-label">Data Ingestion Layer</div>
        <div className="arch-row">
          <div className="arch-box source">News API</div>
          <div className="arch-box source">YouTube</div>
          <div className="arch-box source">Twitter / Reddit</div>
          <div className="arch-box source">Historical Stock Data</div>
        </div>
      </div>

      <div className="arch-arrows">
        <span>▼</span><span>▼</span><span>▼</span><span>▼</span>
      </div>

      {/* Processing */}
      <div className="arch-section">
        <div className="arch-label">Processing Layer</div>
        <div className="arch-row">
          <div className="arch-box process wide">
            LLM Sentiment Analyzer<br />
            <span className="arch-sub">Extracts bullish / bearish signals from text</span>
          </div>
          <div className="arch-box process wide">
            Technical Indicators<br />
            <span className="arch-sub">RSI · SMA · Volume · Price momentum</span>
          </div>
        </div>
      </div>

      <div className="arch-arrows center">▼</div>

      {/* Feature Store */}
      <div className="arch-section center-section">
        <div className="arch-label">Feature Engineering</div>
        <div className="arch-box feature">
          Feature Store<br />
          <span className="arch-sub">Merged sentiment + technical features · No look-ahead bias</span>
        </div>
      </div>

      <div className="arch-arrows center">▼</div>

      {/* ML Model */}
      <div className="arch-section center-section">
        <div className="arch-label">ML Model</div>
        <div className="arch-box model">
          XGBoost Prediction Model<br />
          <span className="arch-sub">T+1 · T+5 · T+30 day forecasts</span>
        </div>
      </div>

      <div className="arch-arrows center">▼</div>

      {/* LangChain Agent */}
      <div className="arch-section center-section">
        <div className="arch-label">Orchestration</div>
        <div className="arch-box agent">
          LangChain Agent<br />
          <span className="arch-sub">Intelligent decision orchestration · Tool routing</span>
        </div>
      </div>

      <div className="arch-arrows center">▼</div>

      {/* Output */}
      <div className="arch-section center-section">
        <div className="arch-label">Output</div>
        <div className="arch-box output">
          Final Trading Insight<br />
          <span className="arch-sub">BUY · SELL · HOLD signal with confidence score</span>
        </div>
      </div>
    </div>
  );
}

function ArchModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="modal-label">AI Stock Movement Prediction Agent</p>
            <h3 className="modal-title">System Architecture</h3>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <ArchitectureDiagram />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  useFadeIn();
  const [showArch, setShowArch] = useState(false);

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

            {/* WIP badge for AI project */}
            {p.title.includes("AI Stock") && (
              <span className="project-wip">🚧 In Progress</span>
            )}

            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>

            <div className="project-stack">
              {p.stack.map((t) => (
                <span className="stack-tag" key={t}>{t}</span>
              ))}
            </div>

            <div className="project-links">
              {/* Architecture button — only for AI Stock project */}
              {p.title.includes("AI Stock") && (
                <button className="project-link arch-btn" onClick={() => setShowArch(true)}>
                  ⬡ View Architecture
                </button>
              )}

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
              {p.academic && (
                <span className="project-academic">Academic Project</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showArch && <ArchModal onClose={() => setShowArch(false)} />}
    </section>
  );
}
