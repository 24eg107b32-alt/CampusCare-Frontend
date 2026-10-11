
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = 'https://campuscare-backend-p55l.onrender.com/api/complaints';
export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const logout = useCallback(() => {
    sessionStorage.removeItem('campuscareAdminToken')
    navigate('/admin-login', { replace: true })
  }, [navigate])

  const fetchComplaints = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('campuscareAdminToken')}`,
        },
      })

      if (response.status === 401 || response.status === 403) {
        logout()
        return
      }
      if (!response.ok) throw new Error('Unable to load complaints.')

      setComplaints(await response.json())
    } catch (error) {
      setError(error.message || 'Could not connect to the backend.')
    } finally {
      setLoading(false)
    }
  }, [logout])

  useEffect(() => {
    fetchComplaints()
  }, [fetchComplaints])

  async function updateStatus(id, status) {
    setError('')

    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('campuscareAdminToken')}`,
        },
        body: JSON.stringify({ status }),
      })

      if (response.status === 401 || response.status === 403) {
        logout()
        return
      }
      if (!response.ok) throw new Error('Status update failed.')

      const updated = await response.json()
      setComplaints((previous) =>
        previous.map((item) => item.id === updated.id ? updated : item)
      )
    } catch (error) {
      setError(error.message || 'Could not update the status.')
    }
  }

  const pending = complaints.filter((item) => item.status === 'Pending').length
  const inProgress = complaints.filter((item) => item.status === 'In Progress').length
  const resolved = complaints.filter((item) => item.status === 'Resolved').length

  return (
    <main className="page-section">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">CAMPUSCARE ADMIN</p>
            <h1>Complaint Dashboard</h1>
            <p>Review complaints and update their progress.</p>
          </div>
          <div className="dashboard-actions">
            <Link className="secondary-button" to="/">Home</Link>
            <button className="secondary-button" onClick={fetchComplaints} disabled={loading}>
              Refresh
            </button>
            <button className="primary-button" onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="stats-grid">
          <article className="stat-card"><span>Total Complaints</span><strong>{complaints.length}</strong></article>
          <article className="stat-card"><span>Pending</span><strong>{pending}</strong></article>
          <article className="stat-card"><span>In Progress</span><strong>{inProgress}</strong></article>
          <article className="stat-card"><span>Resolved</span><strong>{resolved}</strong></article>
        </div>

        {error && <div className="notice" role="alert">{error}</div>}
        {loading && <p>Loading complaints...</p>}

        {!loading && (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>{item.location}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <select
                        value={item.status || 'Pending'}
                        onChange={(event) => updateStatus(item.id, event.target.value)}
                        aria-label={`Status for complaint ${item.id}`}
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {complaints.length === 0 && (
                  <tr><td colSpan="6">No complaints submitted yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
