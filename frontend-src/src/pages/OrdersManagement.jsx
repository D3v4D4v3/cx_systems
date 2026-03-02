import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const OrdersManagement = () => {
  const { user, isVendor } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    if (!isVendor()) {
      navigate('/products');
      return;
    }
    fetchOrders();
  }, []);

  // Función para cargar los pedidos del sistema desde el backend: muestra un spinner de carga mientras se obtiene la información, y maneja errores mostrando un mensaje en la consola
  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/all/list');
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar el estado de un pedido: envía una petición PATCH al backend con el nuevo estado, muestra una alerta con el resultado, recarga la lista de pedidos, y si el pedido actualizado es el que se está viendo en el modal de detalle, cierra el modal para evitar mostrar información desactualizada
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      alert('Estado del pedido actualizado');
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
        setShowDetailModal(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error al actualizar estado');
    }
  };

  // Función para mostrar el detalle de un pedido: envía una petición GET al backend para obtener la información completa del pedido seleccionado, y si se obtiene correctamente, muestra un modal con los detalles del pedido. Si hay un error al cargar el detalle, muestra una alerta con el mensaje de error.
  const viewOrderDetail = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      setSelectedOrder(response.data.order);
      setShowDetailModal(true);
    } catch (error) {
      alert('Error al cargar detalles del pedido');
    }
  };

  // Función para obtener la clase de color correspondiente al estado del pedido: define un objeto con los colores para cada estado, y devuelve el color correspondiente al estado recibido como argumento, o un color gris por defecto si el estado no está definido
  const getStatusColor = (status) => {
    const colors = {
      pendiente: 'text-yellow-500',
      procesando: 'text-blue-500',
      enviado: 'text-purple-500',
      entregado: 'text-green-500',
      cancelado: 'text-red-500',
    };
    return colors[status] || 'text-gray-400';
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-4">
          {'<GESTIÓN DE PEDIDOS/>'}
        </h1>
        <p className="text-gray-400 font-mono">
          Administración de todos los pedidos del sistema
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="card-hacker text-center py-12">
          <p className="text-gray-400 font-mono">No hay pedidos registrados</p>
        </div>
      ) : (
        <div className="card-hacker">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-hacker-red/30">
                <tr className="text-left">
                  <th className="pb-4 text-white font-mono text-sm uppercase">ID</th>
                  <th className="pb-4 text-white font-mono text-sm uppercase">Cliente</th>
                  <th className="pb-4 text-white font-mono text-sm uppercase">Total</th>
                  <th className="pb-4 text-white font-mono text-sm uppercase">Estado</th>
                  <th className="pb-4 text-white font-mono text-sm uppercase">Fecha</th>
                  <th className="pb-4 text-white font-mono text-sm uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-hacker-red/10">
                    <td className="py-4 text-gray-400 font-mono">#{order.id}</td>
                    <td className="py-4 text-white font-mono">
                      {order.user?.name || 'Usuario desconocido'}
                      <br />
                      <span className="text-xs text-gray-500">{order.user?.email}</span>
                    </td>
                    <td className="py-4 text-hacker-red font-bold">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="py-4">
                      <span className={`font-mono text-sm uppercase font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400 font-mono text-sm">
                      {new Date(order.created_at).toLocaleDateString('es-MX')}
                    </td>
                    <td className="py-4 space-x-2">
                      <button
                        onClick={() => viewOrderDetail(order.id)}
                        className="text-hacker-red hover:text-white transition-colors font-mono text-sm uppercase"
                      >
                        Ver Detalle
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="input-hacker text-xs py-1"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="procesando">Procesando</option>
                        <option value="enviado">Enviado</option>
                        <option value="entregado">Entregado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de detalle */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="card-hacker max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-cyber font-bold text-white">
                  PEDIDO #{selectedOrder.id}
                </h2>
                <p className="text-gray-400 font-mono text-sm mt-1">
                  Cliente: {selectedOrder.user?.name} ({selectedOrder.user?.email})
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm font-mono mb-1">Estado</p>
                  <p className={`font-bold text-lg uppercase ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-mono mb-1">Total</p>
                  <p className="text-hacker-red font-bold text-xl">
                    ${Number(selectedOrder.total).toFixed(2)} MXN
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-mono mb-1">Dirección de envío</p>
                <p className="text-white font-mono">{selectedOrder.shipping_address || 'No especificada'}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-mono mb-1">Teléfono</p>
                <p className="text-white font-mono">{selectedOrder.phone || 'No especificado'}</p>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-gray-500 text-sm font-mono mb-1">Notas</p>
                  <p className="text-white font-mono">{selectedOrder.notes}</p>
                </div>
              )}

              {selectedOrder.payment_id && (
                <div>
                  <p className="text-gray-500 text-sm font-mono mb-1">ID de Pago</p>
                  <p className="text-white font-mono text-sm">{selectedOrder.payment_id}</p>
                </div>
              )}

              <div>
                <h3 className="text-white font-bold text-lg mb-4 font-cyber">PRODUCTOS</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b border-hacker-red/20 pb-3">
                      <div className="flex-1">
                        <p className="text-white font-mono">{item.product?.name}</p>
                        <p className="text-gray-400 text-sm font-mono">
                          Cantidad: {item.quantity} × ${Number(item.unit_price).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-hacker-red font-bold">
                        ${Number(item.subtotal).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 btn-hacker-outline"
                >
                  CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
