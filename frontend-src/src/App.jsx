import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import OrdersManagement from './pages/OrdersManagement';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

// Rutas protegidas: ProtectedRoute para rutas que requieren autenticación (con opciones para restringir a vendedores o clientes), y GuestRoute para rutas que solo pueden acceder usuarios no autenticados
const ProtectedRoute = ({ children, vendorOnly = false, clientOnly = false }) => {
  const { user, loading, isVendor, isClient } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (vendorOnly && !isVendor()) {
    return <Navigate to="/products" />;
  }

  if (clientOnly && !isClient()) {
    return <Navigate to="/products" />;
  }

  return children;
};

// Ruta para usuarios no autenticados: si el usuario está autenticado, redirige a /products; si no, muestra el contenido de la ruta (por ejemplo, login o register)
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/products" />;
  }

  return children;
};

// Componente principal de la aplicación: envuelve el contenido con los proveedores de autenticación y carrito, y define las rutas de la aplicación
function AppContent() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute vendorOnly>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders-management"
              element={
                <ProtectedRoute vendorOnly>
                  <OrdersManagement />
                </ProtectedRoute>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute clientOnly>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute clientOnly>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute clientOnly>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute clientOnly>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Componente principal de la aplicación: envuelve el contenido con los proveedores de autenticación y carrito, y define las rutas de la aplicación
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;