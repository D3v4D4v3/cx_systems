import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error al cargar producto:', error);
      alert('Producto no encontrado');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <button
        onClick={() => navigate('/products')}
        className="btn-hacker-outline mb-8 flex items-center gap-2"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        VOLVER
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="card-hacker">
          <div className="relative h-96 bg-hacker-gray overflow-hidden">
            {product.image ? (
              <img
                src={`/storage/${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl text-hacker-red opacity-50">
                  {'</>'}
                </span>
              </div>
            )}
          </div>
        </div>

        <div>
          
          <p className="text-sm text-hacker-red font-mono mb-2 uppercase tracking-wider">
            {product.category?.name}
          </p>

          <h1 className="text-4xl font-cyber font-bold text-white mb-4">
            {product.name}
          </h1>

          <div className="mb-6">
            <span className="text-5xl font-bold text-hacker-red text-glow">
              ${product.price}
            </span>
            <span className="text-gray-400 font-mono text-xl ml-3">
              MXN
            </span>
          </div>

          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-green-500 font-mono font-bold">
                ✓ EN STOCK ({product.stock} disponibles)
              </p>
            ) : (
              <p className="text-hacker-red font-mono font-bold">
                ✗ SIN STOCK
              </p>
            )}
          </div>

          <div className="card-hacker mb-6">
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
              Descripción
            </h3>
            <p className="text-gray-300 font-mono leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-gray-400 font-mono text-sm">
              Vendido por: <span className="text-hacker-red">{product.vendor?.name}</span>
            </p>
          </div>

        </div>
      </div>

      <div className="mt-12 p-4 bg-hacker-black border border-hacker-red/20 rounded font-mono text-xs text-green-500">
        <p>{'> '} Product ID: {product.id}</p>
        <p>{'> '} SKU: {product.slug}</p>
        <p>{'> '} Status: {product.is_active ? 'ACTIVE' : 'INACTIVE'}</p>
      </div>
    </div>
  );
};

export default ProductDetail;