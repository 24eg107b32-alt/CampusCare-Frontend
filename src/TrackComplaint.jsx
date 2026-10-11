
import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = 'http://localhost:9090/api/complaints'

export default function TrackComplaint() {
  const [id, setId] = useState('')
  const [complaint, setComplaint] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleTrack(event) {
    event.preventDefault()
    setComplaint(null)
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(id.trim())}`)

      if (response.status === 404) {
        throw new Error('No complaint found with that ID.')
      }
      if (!response.ok) {
        throw new Error('Could not retrieve the complaint.')
      }

      setComplaint(await response.json())
    } catch (error) {
      setMessage(error.message || 'Could not connect to the backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-section">
      <div className="container narrow">
        <p className="eyebrow">STUDENT PORTAL</p>
        <h1>Track Your Complaint</h1>
        <p>Enter the complaint ID you received after submission.</p>

        <form className="complaint-form" onSubmit={handleTrack}>
          <label htmlFor="complaintId">Complaint ID</label>
          <input
            id="complaintId"
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="Enter complaint ID"
            required
          />
          <button className="primary-button" disabled={loading}>
            {loading ? 'Searching...' : 'Track Complaint'}
          </button>
        </form>

        {message && <div className="notice" role="alert">{message}</div>}

        {complaint && (
          <div className="result-card">
            <h2>Complaint Details</h2>
            <p><strong>ID:</strong> {complaint.id}</p>
            <p><strong>Title:</strong> {complaint.title}</p>
            <p><strong>Category:</strong> {complaint.category}</p>
            <p><strong>Location:</strong> {complaint.location}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className="status-pill">{complaint.status || 'Pending'}</span>
            </p>
          </div>
        )}

        <p className="back-link"><Link to="/student">← Back to Student Dashboard</Link></p>
      </div>
    </main>
  )
}
