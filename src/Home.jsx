
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container nav-inner">
          <Link className="nav-brand" to="/">CampusCare</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/student">Student Portal</Link>
            <Link className="nav-cta" to="/admin-login">Admin Login</Link>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-layout">
          <div className="hero-content">
            <p className="eyebrow">COLLEGE & HOSTEL SUPPORT</p>
            <h1>Your Campus.<br />Your Voice.<br /><span>Our Responsibility.</span></h1>
            <p className="hero-description">
              Report campus problems, track your complaints, and help create
              a safer, cleaner and better college experience.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" to="/student">Student Portal</Link>
              <Link className="secondary-button" to="/track-complaint">Track Complaint</Link>
            </div>
          </div>

          <div className="hero-card">
            <p className="eyebrow">WELCOME TO CAMPUSCARE</p>
            <div className="hero-icon">✓</div>
            <h2>Every complaint matters.</h2>
            <p>Submit your concern and keep your complaint ID to follow its progress.</p>
            <div className="hero-stats">
              <div className="hero-stat"><strong>01</strong><span>Submit</span></div>
              <div className="hero-stat"><strong>02</strong><span>Track</span></div>
              <div className="hero-stat"><strong>03</strong><span>Resolve</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">OUR SERVICES</p>
            <h2>One platform. Better campus life.</h2>
            <p>Choose the service you need.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">✎</div>
              <h3>Submit a Complaint</h3>
              <p>Report hostel, classroom, cleanliness, water and other problems.</p>
              <Link className="feature-link" to="/submit-complaint">Submit Complaint →</Link>
            </article>
            <article className="feature-card">
              <div className="feature-icon">⌕</div>
              <h3>Track Progress</h3>
              <p>Use your complaint ID to check the current status.</p>
              <Link className="feature-link" to="/track-complaint">Track Complaint →</Link>
            </article>
            <article className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Administration</h3>
              <p>Authorized administrators can review and update complaints.</p>
              <Link className="feature-link" to="/admin-login">Admin Login →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>Three simple steps</h2>
          </div>
          <div className="process-grid">
            <article className="process-card"><span>01</span><h3>Submit</h3><p>Describe your issue and send your complaint.</p></article>
            <article className="process-card"><span>02</span><h3>Track</h3><p>Use the ID you receive to follow the progress.</p></article>
            <article className="process-card"><span>03</span><h3>Resolve</h3><p>See updates from the administration.</p></article>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div><h2>CampusCare</h2><p>Building a better campus, one solution at a time.</p></div>
          <p>© {new Date().getFullYear()} CampusCare</p>
        </div>
      </footer>
    </div>
  )
}
