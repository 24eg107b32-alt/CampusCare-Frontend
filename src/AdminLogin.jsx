
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(
    'https://campuscare-backend-p55l.onrender.com/api/auth/admin-login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.trim(),
            password: password,
          }),
        }
      )

      const responseText = await response.text()

      console.log('Login HTTP status:', response.status)
      console.log('Login server response:', responseText)

      if (!response.ok) {
        throw new Error(
          `Login failed (${response.status}): ${
            responseText || 'No response from server'
          }`
        )
      }

      let data

      try {
        data = JSON.parse(responseText)
      } catch {
        throw new Error('The server returned an invalid response.')
      }

      if (!data.token) {
        throw new Error('The server did not return an authentication token.')
      }

      sessionStorage.setItem('campuscareAdmin', 'true')
      sessionStorage.setItem('campuscareAdminToken', data.token)

      navigate('/admin', { replace: true })
    } catch (error) {
      console.error('Admin login error:', error)

      if (error instanceof TypeError) {
        setMessage(
          'Cannot connect to the backend. Check that Spring Boot is running on port 9090 and check the browser Console for CORS errors.'
        )
      } else {
        setMessage(error.message || 'Login failed.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-section">
      <div className="container narrow">
        <p className="eyebrow">AUTHORIZED ACCESS</p>

        <h1>Admin Login</h1>

        <p>Sign in to manage CampusCare complaints.</p>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            placeholder="Enter admin username"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="Enter admin password"
            required
          />

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {message && (
          <div className="notice" role="alert">
            {message}
          </div>
        )}

        <p className="back-link">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </main>
  )
}
