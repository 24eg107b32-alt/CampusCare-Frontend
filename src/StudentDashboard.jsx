
import { Link } from 'react-router-dom'

export default function StudentDashboard() {
  return (
    <main className="page-section">
      <div className="container">
        <p className="eyebrow">CAMPUSCARE STUDENT PORTAL</p>
        <h1>Student Dashboard</h1>
        <p>What would you like to do today?</p>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon">✎</div>
            <h2>Submit a Complaint</h2>
            <p>Report a college or hostel problem to the administration.</p>
            <Link className="primary-button" to="/submit-complaint">Submit Complaint</Link>
          </article>

          <article className="feature-card">
            <div className="feature-icon">⌕</div>
            <h2>Track a Complaint</h2>
            <p>Check the status of a complaint using its ID.</p>
            <Link className="primary-button" to="/track-complaint">Track Complaint</Link>
          </article>
        </div>

        <p className="back-link"><Link to="/">← Back to Home</Link></p>
      </div>
    </main>
  )
}
