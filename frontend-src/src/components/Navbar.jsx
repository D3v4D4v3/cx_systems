import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout, isVendor } = useAuth();
  const { getCartCount } = useCart();
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
                <>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-hacker-red transition-colors font-bold uppercase tracking-wide"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders-management"
                    className="text-white hover:text-hacker-red transition-colors font-bold uppercase tracking-wide"
                  >
                    Pedidos
                  </Link>
                </>
              )}

              {user && !isVendor() && (
                <Link
                  to="/orders"
                  className="text-white hover:text-hacker-red transition-colors font-bold uppercase tracking-wide"
                >
                  Mis Pedidos
                </Link>
              )}

              {user && !isVendor() && (
                <Link to="/cart" className="relative">
                  <ShoppingCartIcon className="h-6 w-6 text-white hover:text-hacker-red transition-colors" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-hacker-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {getCartCount()}
                    </span>
                  )}
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
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="btn-hacker-outline text-sm px-4 py-1">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="btn-hacker text-sm px-4 py-1">
                    Registrarse
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