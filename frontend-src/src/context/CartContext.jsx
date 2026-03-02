import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Proveedor del carrito que envuelve la aplicación y proporciona estado y funciones relacionadas con el carrito de compras
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false); // Estado para indicar si estamos cargando el carrito
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart(); // Carga el carrito al montar si hay un usuario autenticado
    } else {
      setCart([]);
      setTotal(0);
    }
  }, [user]);

  // Función para cargar el carrito desde el backend
  const fetchCart = async () => {
    if (!user) return;

    try {
      setLoading(true); // Indicamos que estamos cargando el carrito
      const response = await api.get('/cart'); 
      setCart(response.data.cart);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un producto al carrito
  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/cart', { product_id: productId, quantity });
      await fetchCart();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al agregar al carrito',
      };
    }
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = async (cartId, quantity) => {
    try {
      await api.put(`/cart/${cartId}`, { quantity });
      await fetchCart();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al actualizar cantidad',
      };
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);
      await fetchCart();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al eliminar del carrito',
      };
    }
  };

  // Función para vaciar el carrito completamente
  const clearCart = async () => {
    const currentCartItems = [...cart]; // Guardamos el estado actual del carrito por si necesitamos revertirlo

    setCart([]);
    setTotal(0);

    try {
      if (currentCartItems.length === 0) {
        return { success: true };
      }

      const deleteResults = await Promise.allSettled(
        currentCartItems.map((item) => api.delete(`/cart/${item.id}`)) // Intentamos eliminar cada item del carrito
      );

      const hasErrors = deleteResults.some((result) => result.status === 'rejected'); // Verificamos si alguna eliminación falló

      if (hasErrors) {
        await fetchCart(); // Si hubo errores, recargamos el carrito para revertir el estado a lo que realmente hay en el backend
      }

      return { success: true };
    } catch (error) {
      await fetchCart();
      return {
        success: false,
        error: error.response?.data?.message || 'Error al vaciar el carrito',
      };
    }
  };

  // Función para obtener el conteo total de items en el carrito
  const getCartCount = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  // Proporcionamos el estado y las funciones del carrito a través del contexto
  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
