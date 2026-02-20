import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, total, clearCart, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'payment' | 'processing'
  const [paymentMethods, setPaymentMethods] = useState([]);
  
  const [formData, setFormData] = useState({
    shipping_address: user?.address || '',
    phone: user?.phone || '',
    notes: '',
  });

  const [paymentData, setPaymentData] = useState({
    card_number: '',
    card_holder: '',
    expiry_date: '',
    cvv: '',
    payment_method: 'credit_card',
  });

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const response = await api.get('/payment/methods');
        setPaymentMethods(response.data.methods);
      } catch (err) {
        console.error('Error al cargar métodos de pago:', err);
      }
    };
    loadPaymentMethods();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPaymentStep('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setPaymentStep('processing');

    try {
      const paymentResponse = await api.post('/payment/process', {
        amount: total,
        ...paymentData,
      });

      if (!paymentResponse.data.success) {
        throw new Error(paymentResponse.data.message);
      }

      await api.post('/orders', {
        ...formData,
        payment_id: paymentResponse.data.payment_id,
        payment_method: paymentData.payment_method,
      });

      alert('¡Pago procesado y pedido creado exitosamente!');
      await clearCart();
      await fetchCart();
      navigate('/orders');
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Error al procesar el pago');
      setPaymentStep('payment');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card-hacker text-center py-12">
          <p className="text-gray-400 font-mono text-xl mb-6">No hay productos en el carrito</p>
          <button onClick={() => navigate('/products')} className="btn-hacker">
            IR A PRODUCTOS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-4">
          {'<CHECKOUT/>'}
        </h1>
        <p className="text-gray-400 font-mono">
          {paymentStep === 'form' && 'Paso 1: Datos de entrega'}
          {paymentStep === 'payment' && 'Paso 2: Pasarela de pago (SIMULADA)'}
          {paymentStep === 'processing' && 'Procesando pago...'}
        </p>
      </div>

      {paymentStep === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card-hacker">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6 uppercase tracking-wider">
              Datos de entrega
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">Dirección</label>
                <input
                  type="text"
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="Calle, número, ciudad"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="+52..."
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">Notas (Opcional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-hacker resize-none"
                  rows="3"
                  placeholder="Instrucciones especiales..."
                />
              </div>

              <button type="submit" className="w-full btn-hacker">
                CONTINUAR AL PAGO
              </button>
            </form>
          </div>

          <div className="card-hacker">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6 uppercase tracking-wider">Resumen</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm font-mono">
                  <span className="text-gray-400">{item.product.name} x{item.quantity}</span>
                  <span className="text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-hacker-red/30 pt-4">
              <div className="flex justify-between text-xl font-cyber font-bold">
                <span className="text-white">TOTAL:</span>
                <span className="text-hacker-red">${total.toFixed(2)} MXN</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentStep === 'payment' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card-hacker">
            <div className="bg-hacker-red/10 border border-hacker-red text-hacker-red px-4 py-3 rounded font-mono text-sm mb-6">
              <p className="font-bold mb-2">PASARELA DE PAGO SIMULADA (MOCK)</p>
              <p className="text-xs">Esta es una simulación educativa. Tarjetas que terminan en número PAR = aprobadas, IMPAR = rechazadas.</p>
              <p className="text-xs mt-1">Ejemplo aprobado: 4532015112830366</p>
            </div>

            <h2 className="text-2xl font-cyber font-bold text-white mb-6 uppercase tracking-wider">Datos de pago</h2>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {error && (
                <div className="bg-hacker-red/10 border border-hacker-red text-hacker-red px-4 py-3 rounded font-mono text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">Número de Tarjeta</label>
                <input
                  type="text"
                  name="card_number"
                  value={paymentData.card_number}
                  onChange={handlePaymentChange}
                  className="input-hacker"
                  placeholder="4532015112830366"
                  maxLength="16"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">Titular</label>
                <input
                  type="text"
                  name="card_holder"
                  value={paymentData.card_holder}
                  onChange={handlePaymentChange}
                  className="input-hacker"
                  placeholder="JUAN PEREZ"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">Vencimiento</label>
                  <input
                    type="text"
                    name="expiry_date"
                    value={paymentData.expiry_date}
                    onChange={handlePaymentChange}
                    className="input-hacker"
                    placeholder="12/25"
                    maxLength="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    className="input-hacker"
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => setPaymentStep('form')} className="btn-hacker-outline flex-1" disabled={loading}>
                  VOLVER
                </button>
                <button type="submit" disabled={loading} className="btn-hacker flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'PROCESANDO...' : `PAGAR $${total.toFixed(2)} MXN`}
                </button>
              </div>
            </form>
          </div>

          <div className="card-hacker">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6 uppercase tracking-wider">Resumen</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm font-mono">
                  <span className="text-gray-400">{item.product.name} x{item.quantity}</span>
                  <span className="text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-hacker-red/30 pt-4">
              <div className="flex justify-between text-xl font-cyber font-bold">
                <span className="text-white">TOTAL:</span>
                <span className="text-hacker-red">${total.toFixed(2)} MXN</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentStep === 'processing' && (
        <div className="card-hacker text-center py-12">
          <div className="animate-spin h-16 w-16 border-4 border-hacker-red border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-white font-mono text-xl mb-2">Procesando pago...</p>
          <p className="text-gray-400 font-mono text-sm">Por favor espera un momento</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
