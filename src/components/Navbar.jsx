import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">JOB<span className="text-gray-800">BOARD</span></Link>
      
      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Explore Jobs</Link>
        {user ? (
          <>
            {user.role === 'employer' && (
              <Link to="/employer-dashboard" className="text-gray-600 hover:text-blue-600 font-medium text-orange-600">Post a Job</Link>
            )}
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
