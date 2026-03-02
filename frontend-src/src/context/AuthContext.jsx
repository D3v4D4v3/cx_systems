import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Proveedor de autenticación que envuelve la aplicación y proporciona estado y funciones de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); // Estado para indicar si estamos verificando el token al cargar la aplicación

  // Al montar: verifica el token contra el servidor para no confiar ciegamente en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false); // No hay token, no hay usuario
      return;
    }

    // Verificar token con el servidor para obtener datos actualizados del usuario
    api.get('/me')
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      })
      .catch(() => {
        // Token inválido o expirado: limpiar sesión
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      })
      .finally(() => setLoading(false)); // Cualquiera sea el resultado, ya no estamos cargando
  }, []);

  // Función para iniciar sesión: envía credenciales, recibe token y datos del usuario
  const login = useCallback(async (email, password) => {
    try {
      const { data } = await api.post('/login', { email, password }); // Envía credenciales al backend
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al iniciar sesión',
      };
    }
  }, []);

  // Función para registrarse: envía datos del nuevo usuario, recibe token y datos del usuario registrado
  const register = useCallback(async (userData) => {
    try {
      const { data } = await api.post('/register', userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al registrarse',
      };
    }
  }, []);

  // Función para cerrar sesión: llama al endpoint de logout y limpia el estado local
  const logout = useCallback(async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      // Si falla la petición igual limpiamos localmente
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  const isVendor = useCallback(() => user?.role_id === 1, [user]);
  const isClient = useCallback(() => user?.role_id === 2, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isVendor, isClient }}>
      {children} 
    </AuthContext.Provider>
  );
};