import { useState } from "react";
import DATA from "../data/resume";
import { useFadeIn } from "../hooks/useFadeIn";
import "./Projects.css";

// ── Diagram content map ──────────────────────────────────────────
// For wallet + AI stock we render coded diagrams.
// For image-based diagrams (HLD, LLD PNGs) point to /docs/ in public folder.
// Drop your PNG files into public/docs/:
//   public/docs/HLD.png
//   public/docs/wallet-service-lld.png
//   public/docs/fraud-service-lld.png
//   public/docs/audit-service-lld.png
//   public/docs/notification-service-lld.png

const DIAGRAM_IMAGES = {
  hld:          "/docs/HLD.png",
  wallet:       "/docs/wallet-service-lld.png",
  fraud:        "/docs/fraud-service-lld.png",
  audit:        "/docs/audit-service-lld.png",
  notification: "/docs/notification-service-lld.png",
};

// AI Stock architecture — rendered as JSX (no image needed)
function AIStockDiagram() {
  return (
    <div className="arch-diagram">
      <div className="arch-section">
        <div className="arch-label">Data Ingestion Layer</div>
        <div className="arch-row">
          <div className="arch-box source">News API</div>
          <div className="arch-box source">YouTube</div>
          <div className="arch-box source">Twitter / Reddit</div>
          <div className="arch-box source">Historical Stock Data</div>
        </div>
      </div>
      <div className="arch-arrows"><span>▼</span><span>▼</span><span>▼</span><span>▼</span></div>
      <div className="arch-section">
        <div className="arch-label">Processing Layer</div>
        <div className="arch-row">
          <div className="arch-box process wide">LLM Sentiment Analyzer<br /><span className="arch-sub">Extracts bullish / bearish signals from text</span></div>
          <div className="arch-box process wide">Technical Indicators<br /><span className="arch-sub">RSI · SMA · Volume · Price momentum</span></div>
        </div>
      </div>
      <div className="arch-arrows center">▼</div>
      <div className="arch-section center-section">
        <div className="arch-label">Feature Engineering</div>
        <div className="arch-box feature">Feature Store<br /><span className="arch-sub">Merged sentiment + technical features · No look-ahead bias</span></div>
      </div>
      <div className="arch-arrows center">▼</div>
      <div className="arch-section center-section">
        <div className="arch-label">ML Model</div>
        <div className="arch-box model">XGBoost Prediction Model<br /><span className="arch-sub">T+1 · T+5 · T+30 day forecasts</span></div>
      </div>
      <div className="arch-arrows center">▼</div>
      <div className="arch-section center-section">
        <div className="arch-label">Orchestration</div>
        <div className="arch-box agent">LangChain Agent<br /><span className="arch-sub">Intelligent decision orchestration · Tool routing</span></div>
      </div>
      <div className="arch-arrows center">▼</div>
      <div className="arch-section center-section">
        <div className="arch-label">Output</div>
        <div className="arch-box output">Final Trading Insight<br /><span className="arch-sub">BUY · SELL · HOLD signal with confidence score</span></div>
      </div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────
function DiagramModal({ project, onClose }) {
  const [activeKey, setActiveKey] = useState(
    project.diagrams ? project.diagrams[0].key : "aistock"
  );

  const isImageDiagram = activeKey !== "aistock";
  const imageSrc = DIAGRAM_IMAGES[activeKey];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <p className="modal-label">{project.title}</p>
            <h3 className="modal-title">Architecture Diagrams</h3>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Tab bar — only show if multiple diagrams */}
        {project.diagrams && project.diagrams.length > 1 && (
          <div className="modal-tabs">
            {project.diagrams.map((d) => (
              <button
                key={d.key}
                className={`modal-tab ${activeKey === d.key ? "active" : ""}`}
                onClick={() => setActiveKey(d.key)}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="modal-body">
          {activeKey === "aistock" ? (
            <AIStockDiagram />
          ) : (
            <img
              src={imageSrc}
              alt={`${project.title} diagram`}
              className="diagram-img"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function Projects() {
  useFadeIn();
  const [modalProject, setModalProject] = useState(null);

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
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="project-num">
              Project_{String(i + 1).padStart(2, "0")}
            </div>

            {/* ── Badges ── */}
            <div className="project-badges">
              {p.wip && <span className="badge badge-wip">🚧 In Progress</span>}
              {p.internal && <span className="badge badge-internal">🏢 Internal Tool — TCS</span>}
              {p.personal && <span className="badge badge-personal">🧑‍💻 Personal Project</span>}
              {p.academic && <span className="badge badge-academic">🎓 Academic Project</span>}
            </div>

            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>

            <div className="project-stack">
              {p.stack.map((t) => (
                <span className="stack-tag" key={t}>{t}</span>
              ))}
            </div>

            {/* ── Links ── */}
            <div className="project-links">
              {p.diagrams && (
                <button
                  className="project-link arch-btn"
                  onClick={() => setModalProject(p)}
                >
                  ⬡ View Architecture
                </button>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                  ↗ GitHub Repo
                </a>
              )}
              {p.frontendGithub && (
                <a href={p.frontendGithub} target="_blank" rel="noreferrer" className="project-link">
                  ↗ Frontend Repo
                </a>
              )}
              {p.internal && (
                <span className="project-confidential">🔒 Proprietary — Not Open Source</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalProject && (
        <DiagramModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </section>
  );
}