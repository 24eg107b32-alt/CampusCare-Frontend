
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Home from './Home.jsx'
import StudentDashboard from './StudentDashboard.jsx'
import SubmitComplaint from './SubmitComplaint.jsx'
import TrackComplaint from './TrackComplaint.jsx'
import AdminLogin from './AdminLogin.jsx'
import AdminDashboard from './AdminDashboard.jsx'

function ProtectedAdmin() {
  const token = sessionStorage.getItem('campuscareAdminToken')

  return token
    ? <AdminDashboard />
    : <Navigate to="/admin-login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/submit-complaint" element={<SubmitComplaint />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
