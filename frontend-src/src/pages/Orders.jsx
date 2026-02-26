import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-4">
          {'<MIS PEDIDOS/>'}
        </h1>
        <p className="text-gray-400 font-mono">Historial de compras realizadas</p>
      </div>

      {orders.length === 0 ? (
        <div className="card-hacker text-center py-12">
          <p className="text-gray-400 font-mono text-xl mb-6">Aún no tienes pedidos</p>
          <Link to="/products" className="btn-hacker inline-block">
            IR A PRODUCTOS
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card-hacker">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-hacker-red font-mono text-sm">Pedido #{order.id}</p>
                  <p className="text-white font-bold text-xl">${Number(order.total).toFixed(2)} MXN</p>
                  <p className="text-gray-400 font-mono text-sm">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-gray-300 font-mono text-sm mb-2">
                    Items: <span className="text-white">{order.items_count}</span>
                  </p>
                  <p className="text-green-500 font-mono text-sm mb-3 uppercase">{order.status}</p>
                  <Link to={`/orders/${order.id}`} className="btn-hacker-outline text-sm px-4 py-2 inline-block">
                    VER DETALLE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
