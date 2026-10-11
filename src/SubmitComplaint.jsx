
import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = 'http://localhost:9090/api/complaints'

export default function SubmitComplaint() {
  const [form, setForm] = useState({
    category: '',
    location: '',
    title: '',
    description: '',
  })
  const [message, setMessage] = useState('')
  const [saved, setSaved] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setSaved(null)
    setLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(await response.text() || 'Complaint submission failed.')
      }

      const data = await response.json()
      setSaved(data)
      setMessage('Complaint submitted successfully!')
      setForm({ category: '', location: '', title: '', description: '' })
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
        <h1>Submit a Complaint</h1>
        <p>Provide accurate details about the issue.</p>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange} required>
            <option value="">Choose category</option>
            <option>Hostel</option>
            <option>Classroom</option>
            <option>Cleanliness</option>
            <option>Water</option>
            <option>Electricity</option>
            <option>Other</option>
          </select>

          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Hostel Block A" required />

          <label htmlFor="title">Complaint Title</label>
          <input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Short title" required />

          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} rows="5" placeholder="Describe your issue" required />

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>

        {message && <div className="notice" role="status">{message}</div>}

        {saved && (
          <div className="result-card">
            <h2>Keep your Complaint ID</h2>
            <p><strong>ID:</strong> {saved.id}</p>
            <p><strong>Status:</strong> {saved.status || 'Pending'}</p>
            <p>Save this ID so you can track your complaint later.</p>
            <Link className="primary-button" to="/track-complaint">Track Complaint</Link>
          </div>
        )}

        <p className="back-link"><Link to="/student">← Back to Student Dashboard</Link></p>
      </div>
    </main>
  )
}
