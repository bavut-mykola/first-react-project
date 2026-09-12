import { useState } from 'react';
import '../styles/aboutUs.scss';

function AboutUs() {
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <span className="about-badge">Est. 2026</span>
          <h1 className="about-title">Redefining How You Experience Technology.</h1>
          <p className="about-lead">
            ELIX was born from a simple, uncompromising vision: technology should seamlessly integrate into your life, bringing elegance, absolute performance, and pure aesthetic pleasure without unnecessary complexity.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-grid">
          <div className={`about-text-block ${isJourneyOpen ? 'expanded' : ''}`}>
            <h2>Our Origin and Journey</h2>
            <p className="card-preview">
              What started as a small, passionate team of tech enthusiasts in 2026 has quickly evolved into a trusted destination for modern device lovers.
            </p>
            <div className="card-full-text">
              <p>
                We noticed a gap in the market: while gadgets were becoming more powerful, the shopping and ownership experience often felt cluttered, overwhelming, and impersonal.
              </p>
              <p>
                We decided to change that. By curating only the finest devices — from cutting-edge smartphones to refined everyday accessories — ELIX built a space where quality speaks louder than endless choices. Every item in our catalog is hand-selected to meet strict standards of craftsmanship, design durability, and raw performance.
              </p>
            </div>
            <button 
              type="button" 
              className="expand-btn" 
              onClick={() => setIsJourneyOpen(!isJourneyOpen)}
              aria-label="Toggle text"
            >
              <svg className={`arrow-icon ${isJourneyOpen ? 'open' : ''}`} viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 8 12 16 20 8"></polyline>
              </svg>
            </button>
          </div>

          <div className={`about-text-block ${isPhilosophyOpen ? 'expanded' : ''}`}>
            <h2>The Philosophy of Less, But Better</h2>
            <p className="card-preview">
              We believe in minimalist principles not just in design, but in how we operate.
            </p>
            <div className="card-full-text">
              <p>
                A clean desk, a distraction-free screen, and carefully engineered tools allow the human mind to focus on what truly matters.
              </p>
              <p>
                Our curated approach ensures that you never have to waste hours comparing dozens of mediocre options. At ELIX, if a device is on our shelves, it means we stand behind its reliability, tactile feel, and capability to elevate your daily routine.
              </p>
            </div>
            <button 
              type="button" 
              className="expand-btn" 
              onClick={() => setIsPhilosophyOpen(!isPhilosophyOpen)}
              aria-label="Toggle text"
            >
              <svg className={`arrow-icon ${isPhilosophyOpen ? 'open' : ''}`} viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 8 12 16 20 8"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container stats-grid">
          <div className="stat-card">
            <span className="stat-number">15,000+</span>
            <span className="stat-label">Happy Clients Worldwide</span>
            <p className="stat-desc">People who trust our selection to power their everyday work, creativity, and connection.</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">99.4%</span>
            <span className="stat-label">Satisfaction Rate</span>
            <p className="stat-desc">Reflected in our seamless delivery, responsive support, and rigorous product standards.</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Curated Quality</span>
            <p className="stat-desc">Every piece of hardware undergoes strict verification before reaching our catalog.</p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="section-header">
            <h2>What Drives Us Forward</h2>
            <p>The core principles that shape every decision we make at ELIX.</p>
          </div>
          <div className="values-grid">
            <div className="value-item">
              <h3>Uncompromising Quality</h3>
              <p>We test and verify every device category to ensure long-term durability, top-tier performance, and premium material finishes.</p>
            </div>
            <div className="value-item">
              <h3>Transparent Simplicity</h3>
              <p>From our clean website interface to clear specifications and honest pricing, we keep things straightforward and respectful of your time.</p>
            </div>
            <div className="value-item">
              <h3>Human-Centric Support</h3>
              <p>Technology is personal. When you have questions, you get real, expert assistance tailored to your exact needs and setup.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container mission-container">
          <h2>Looking Ahead</h2>
          <p>
            As we continue to grow, our core commitment remains unchanged. We are constantly expanding our horizons, exploring new horizons in backend efficiency, user experience, and next-generation device accessibility. Thank you for being a part of the ELIX journey.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;