import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout, isVendor } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <div className="scanner-line"></div>
      
      <nav className="bg-hacker-dark border-b-2 border-hacker-red shadow-lg shadow-hacker-red/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-cyber font-bold text-hacker-red text-glow">
                {'<CX/>'}
              </span>
              <span className="text-xl font-cyber text-white hidden md:block">
                SYSTEMS
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link 
                to="/products" 
                className="text-white hover:text-hacker-red transition-colors font-bold uppercase tracking-wide"
              >
                Productos
              </Link>

              {user && isVendor() && (
                <Link 
                  to="/dashboard" 
                  className="text-white hover:text-hacker-red transition-colors font-bold uppercase tracking-wide"
                >
                  Dashboard
                </Link>
              )}

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-5 w-5 text-hacker-red" />
                    <span className="text-white font-mono text-sm">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-hacker-outline text-sm px-4 py-1"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="btn-hacker-outline text-sm px-4 py-1">
                    Login
                  </Link>
                  <Link to="/register" className="btn-hacker text-sm px-4 py-1">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;