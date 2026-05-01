import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployerDashboard from './pages/EmployerDashboard';
import ApplicantDashboard from './pages/ApplicantDashboard';
import Profile from './pages/Profile'; // Day 5 ka profile page
import { AuthProvider, useAuth } from './context/AuthContext';

// --- Protected Route Component ---
// Ye check karega ke user login hai ya nahi, aur usaka role kya hai
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Employer Only Routes */}
            <Route 
              path="/employer-dashboard" 
              element={
                <PrivateRoute role="employer">
                  <EmployerDashboard />
                </PrivateRoute>
              } 
            />

            {/* Applicant Only Routes */}
            <Route 
              path="/applicant-dashboard" 
              element={
                <PrivateRoute role="applicant">
                  <ApplicantDashboard />
                </PrivateRoute>
              } 
            />

            {/* Common Protected Route */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />

            {/* Fallback for 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
