import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
      setTotal(0);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data.cart);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const clearCart = async () => {
    const currentCartItems = [...cart];

    setCart([]);
    setTotal(0);

    try {
      if (currentCartItems.length === 0) {
        return { success: true };
      }

      const deleteResults = await Promise.allSettled(
        currentCartItems.map((item) => api.delete(`/cart/${item.id}`))
      );

      const hasErrors = deleteResults.some((result) => result.status === 'rejected');

      if (hasErrors) {
        await fetchCart();
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

  const getCartCount = () => cart.reduce((acc, item) => acc + item.quantity, 0);

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
