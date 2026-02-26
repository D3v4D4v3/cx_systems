import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { getProductImageUrl } from '../utils/imageUrl';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Leer categoría de URL al cargar
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Cargar categorías solo una vez al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  // Cargar productos cuando cambian los filtros
  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedCategory) params.append('category_id', selectedCategory);
      params.append('sort_by', sortBy);
      params.append('sort_order', sortBy === 'price' ? 'asc' : 'desc');

      const response = await api.get(`/products?${params}`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    const result = await addToCart(productId, 1);
    if (result.success) {
      alert('Producto agregado al carrito');
      return;
    }

    alert(result.error);
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="mb-8">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-4">
          {'<PRODUCTOS/>'}
        </h1>
        <p className="text-gray-400 font-mono">
          Explora nuestro catálogo de hardware gaming premium
        </p>
      </div>

      <div className="card-hacker mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-hacker pl-10"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-hacker"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-hacker"
          >
            <option value="created_at">Más recientes</option>
            <option value="price">Precio (menor a mayor)</option>
            <option value="name">Nombre (A-Z)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 font-mono text-lg">
            No se encontraron productos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card-hacker group">

              <div className="relative h-48 bg-hacker-gray mb-4 overflow-hidden">
                {product.image ? (
                  <img
                    src={getProductImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl text-hacker-red opacity-50">
                      {'</>'}
                    </span>
                  </div>
                )}

                {product.stock > 0 ? (
                  <span className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
                    STOCK: {product.stock}
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 bg-hacker-red text-white text-xs font-bold px-2 py-1 rounded">
                    SIN STOCK
                  </span>
                )}
              </div>

              <p className="text-xs text-hacker-red font-mono mb-2 uppercase">
                {product.category?.name}
              </p>

              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 min-h-[56px]">
                {product.name}
              </h3>

              <p className="text-gray-400 font-mono text-sm mb-4 line-clamp-2 min-h-[40px]">
                {product.description}
              </p>

              <div className="mb-4">
                <span className="text-3xl font-bold text-hacker-red">
                  ${product.price}
                </span>
                <span className="text-gray-400 font-mono text-sm ml-2">
                  MXN
                </span>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/products/${product.id}`}
                  className="flex-1 btn-hacker-outline text-center text-sm py-2"
                >
                  VER DETALLES
                </Link>

                {user && user.role_id !== 1 && product.stock > 0 && (
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="btn-hacker px-4 py-2"
                    title="Agregar al carrito"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-4 bg-hacker-black border border-hacker-red/20 rounded font-mono text-xs text-green-500">
        <p className="animate-pulse">{'> '} Productos cargados: {products.length}</p>
        <p className="opacity-70">{'> '} Categorías disponibles: {categories.length}</p>
      </div>
    </div>
  );
};

export default Products;