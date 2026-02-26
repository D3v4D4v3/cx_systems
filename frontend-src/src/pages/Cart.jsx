import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';
import { getProductImageUrl } from '../utils/imageUrl';

const Cart = () => {
  const { cart, total, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = async (cartId, currentQuantity, delta) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 1) return;
    await updateQuantity(cartId, newQuantity);
  };

  const handleRemove = async (cartId) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    await removeFromCart(cartId);
  };

  const handleClear = async () => {
    if (!confirm('¿Estás seguro de vaciar el carrito?')) return;
    await clearCart();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-4">
          {'<CARRITO/>'}
        </h1>
        <p className="text-gray-400 font-mono">Revisa tus productos antes de proceder al pago</p>
      </div>

      {cart.length === 0 ? (
        <div className="card-hacker text-center py-12">
          <p className="text-gray-400 font-mono text-xl mb-6">Tu carrito está vacío</p>
          <button onClick={() => navigate('/products')} className="btn-hacker">
            IR A PRODUCTOS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-end">
              <button onClick={handleClear} className="btn-hacker-outline text-sm">
                VACIAR CARRITO
              </button>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="card-hacker">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-hacker-gray flex-shrink-0">
                    {item.product?.image ? (
                      <img
                        src={getProductImageUrl(item.product.image)}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl text-hacker-red opacity-50">{'</>'}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">{item.product?.name}</h3>
                    <p className="text-gray-400 font-mono text-sm mb-2">{item.product?.category?.name}</p>
                    <p className="text-hacker-red font-bold text-xl">${item.product?.price} MXN</p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-hacker-red hover:text-white font-mono text-sm"
                    >
                      ELIMINAR
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        className="bg-hacker-gray text-white w-8 h-8 font-bold hover:bg-hacker-red transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        className="bg-hacker-gray text-white w-8 h-8 font-bold hover:bg-hacker-red transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card-hacker h-fit">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6 uppercase tracking-wider">Resumen</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400 font-mono">
                <span>Productos:</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-mono">
                <span>Unidades:</span>
                <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div className="border-t border-hacker-red/30 pt-3">
                <div className="flex justify-between text-white font-bold text-xl">
                  <span>TOTAL:</span>
                  <span className="text-hacker-red text-glow">${Number(total).toFixed(2)} MXN</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/checkout')} className="w-full btn-hacker text-lg py-3">
              PROCEDER AL PAGO
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full btn-hacker-outline text-sm py-2 mt-3"
            >
              SEGUIR COMPRANDO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
