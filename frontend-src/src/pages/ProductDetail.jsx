import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const getProductImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('/images/') || image.startsWith('/storage/')) return image;
  if (image.startsWith('images/')) return `/${image}`;
  return `/storage/${image}`;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

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

  const handleAddToCart = async () => {
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      navigate('/login');
      return;
    }

    const result = await addToCart(product.id, quantity);
    if (result.success) {
      alert('Producto agregado al carrito');
      navigate('/cart');
      return;
    }

    alert(result.error);
  };

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
                src={getProductImageUrl(product.image)}
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

          {product.stock > 0 && user && user.role_id !== 1 && (
            <div className="card-hacker mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white font-mono text-sm uppercase tracking-wider">Cantidad:</span>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-hacker-gray text-white w-10 h-10 font-bold text-xl hover:bg-hacker-red transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white font-bold text-xl w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="bg-hacker-gray text-white w-10 h-10 font-bold text-xl hover:bg-hacker-red transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-hacker flex items-center justify-center gap-2 text-lg py-3"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                AGREGAR AL CARRITO
              </button>
            </div>
          )}

          {!user && (
            <div className="card-hacker bg-hacker-red/10 border-hacker-red">
              <p className="text-white font-mono text-center">
                <a href="/login" className="text-hacker-red hover:underline font-bold">Inicia sesión</a>{' '}
                para comprar este producto
              </p>
            </div>
          )}

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