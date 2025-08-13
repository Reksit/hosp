import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AmbulanceDriverDashboard from './pages/AmbulanceDriverDashboard';
import HospitalAdminDashboard from './pages/HospitalAdminDashboard';
import DoctorNurseDashboard from './pages/DoctorNurseDashboard';
import LandingPage from './pages/LandingPage';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? (
          user?.role === 'ambulance_driver' ? <Navigate to="/ambulance-dashboard" /> :
          user?.role === 'hospital_admin' ? <Navigate to="/admin-dashboard" /> :
          user?.role === 'doctor' || user?.role === 'nurse' ? <Navigate to="/doctor-dashboard" /> :
          <LandingPage />
        ) : <LandingPage />
      } />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/ambulance-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['ambulance_driver']}>
            <AmbulanceDriverDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['hospital_admin']}>
            <HospitalAdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/doctor-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['doctor', 'nurse']}>
            <DoctorNurseDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;