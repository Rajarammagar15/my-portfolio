// ─────────────────────────────────────────────────────────────
//  HOW TO ENABLE REAL EMAIL SENDING (EmailJS — free, no backend)
// ─────────────────────────────────────────────────────────────
//  1. Run:  npm install @emailjs/browser
//  2. Sign up at https://emailjs.com
//  3. Create a Service (connect your Gmail) → copy Service ID
//  4. Create an Email Template → use these variables in the template:
//       {{from_name}}  {{from_email}}  {{message}}
//     → copy Template ID
//  5. Go to Account → copy your Public Key
//  6. Fill in the three constants below and uncomment the emailjs lines
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
// import emailjs from "@emailjs/browser"; // ← uncomment after: npm install @emailjs/browser

import DATA from "../data/resume";
import { useFadeIn } from "../hooks/useFadeIn";
import "./Contact.css";

const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // ← replace
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // ← replace
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // ← replace

export default function Contact() {
  useFadeIn();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // ── OPTION A: EmailJS (recommended) ──────────────────────
    // Uncomment the block below once you've installed emailjs and filled in the keys above.
    //
    // emailjs
    //   .send(
    //     EMAILJS_SERVICE_ID,
    //     EMAILJS_TEMPLATE_ID,
    //     {
    //       from_name:  formData.name,
    //       from_email: formData.email,
    //       message:    formData.message,
    //     },
    //     EMAILJS_PUBLIC_KEY
    //   )
    //   .then(() => {
    //     setStatus("sent");
    //     setFormData({ name: "", email: "", message: "" });
    //   })
    //   .catch(() => setStatus("error"));
    //
    // ── OPTION B: Dummy success (current behaviour — remove once EmailJS is set up) ──
    setTimeout(() => setStatus("sent"), 800);
  };

  return (
    <section id="contact">
      <div className="fade-in">
        <p className="section-label">Let's Connect</p>
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-divider" />
      </div>

      <div className="contact-wrapper">
        {/* Left: contact info */}
        <div className="contact-info fade-in">
          <p>
            I'm open to backend engineering roles, fintech product companies, and
            high-scale platform teams. If you're building something challenging and
            meaningful — I'd love to hear about it.
          </p>
          <div className="contact-details">
            <div className="contact-row">
              <span className="contact-row-label">Email</span>
              <span className="contact-row-val">
                <a href={`mailto:${DATA.contact.email}`}>{DATA.contact.email}</a>
              </span>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">Phone</span>
              <span className="contact-row-val">{DATA.contact.phone}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">Based in</span>
              <span className="contact-row-val">{DATA.contact.location}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">GitHub</span>
              <span className="contact-row-val">
                <a href={`https://${DATA.contact.github}`} target="_blank" rel="noreferrer">
                  {DATA.contact.github}
                </a>
              </span>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">LinkedIn</span>
              <span className="contact-row-val">
                <a href={`https://${DATA.contact.linkedin}`} target="_blank" rel="noreferrer">
                  {DATA.contact.linkedin}
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form className="contact-form fade-in" onSubmit={handleSubmit}>
          {status === "sent" ? (
            <div className="form-success">
              ✓ MESSAGE SENT — I'll be in touch soon.
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" className="form-input"
                  placeholder="Jane Doe"
                  value={formData.name} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email" className="form-input"
                  placeholder="jane@company.com"
                  value={formData.email} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" className="form-textarea"
                  placeholder="Tell me about the role or project..."
                  value={formData.message} onChange={handleChange} required
                />
              </div>

              {status === "error" && (
                <p className="form-error">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ alignSelf: "flex-start" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
