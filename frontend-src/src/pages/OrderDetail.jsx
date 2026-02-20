import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error al cargar pedido:', error);
      alert('No se pudo cargar el pedido');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/orders')} className="btn-hacker-outline mb-8 flex items-center gap-2">
        <ArrowLeftIcon className="h-5 w-5" />
        VOLVER
      </button>

      <div className="card-hacker mb-6">
        <h1 className="text-4xl font-cyber font-bold text-hacker-red text-glow mb-4">
          {`<PEDIDO #${order.id}/>`}
        </h1>
        <p className="text-gray-400 font-mono mb-1">
          Fecha: <span className="text-white">{new Date(order.created_at).toLocaleString()}</span>
        </p>
        <p className="text-gray-400 font-mono mb-1">
          Estado: <span className="text-green-500 uppercase">{order.status}</span>
        </p>
        <p className="text-gray-400 font-mono">
          Total: <span className="text-hacker-red font-bold">${Number(order.total_amount).toFixed(2)} MXN</span>
        </p>
      </div>

      <div className="space-y-4">
        {order.items?.map((item) => (
          <div key={item.id} className="card-hacker">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-white font-bold text-lg">{item.product?.name}</p>
                <p className="text-gray-400 font-mono text-sm">{item.product?.category?.name}</p>
              </div>

              <div className="text-right font-mono text-sm">
                <p className="text-gray-300">Cantidad: {item.quantity}</p>
                <p className="text-gray-300">Precio unitario: ${Number(item.unit_price).toFixed(2)}</p>
                <p className="text-hacker-red font-bold text-base">Subtotal: ${Number(item.subtotal).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
