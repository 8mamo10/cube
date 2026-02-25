import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { UserRole } from '@stamp-card/shared';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={[UserRole.CUSTOMER]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={[UserRole.STAFF, UserRole.ADMIN]}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
