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
    <nav className="bg-white shadow-sm border-b border-gray-100 py-3 px-3 md:px-8 sticky top-0 z-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
        
        {/* Logo - Stays left, sizes down on small screens */}
        <Link to="/" className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 tracking-tight whitespace-nowrap">
          JOB<span className="text-gray-800">BOARD</span>
        </Link>
        
        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <Link 
            to="/" 
            className="text-[13px] sm:text-sm md:text-base text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap"
          >
            Explore
          </Link>
          
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              {user.role === 'employer' && (
                <Link 
                  to="/employer-dashboard" 
                  className="text-[12px] sm:text-sm md:text-base text-orange-600 font-semibold border-b-2 border-orange-100 hover:border-orange-400 transition-colors whitespace-nowrap"
                >
                  Post Job
                </Link>
              )}
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 text-[12px] sm:text-sm md:text-base rounded-md transition-all shadow-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Link 
                to="/login" 
                className="text-[13px] sm:text-sm md:text-base text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-[12px] sm:text-sm md:text-base rounded-md shadow-sm font-medium transition-all whitespace-nowrap"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;