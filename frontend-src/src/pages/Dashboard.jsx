import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, isVendor } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image: null,
  });

  useEffect(() => {
    if (!isVendor()) {
      navigate('/products');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data.data);
      const categoriesResponse = await api.get('/categories');
      setCategories(categoriesResponse.data.categories);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductFormChange = (e) => {
    if (e.target.name === 'image') {
      setProductForm({ ...productForm, image: e.target.files[0] });
    } else {
      setProductForm({ ...productForm, [e.target.name]: e.target.value });
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(productForm).forEach(key => {
      if (productForm[key]) {
        formData.append(key, productForm[key]);
      }
    });

    try {
      if (editingProduct) {
        await api.post(`/products/${editingProduct.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Producto actualizado exitosamente');
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Producto creado exitosamente');
      }
      
      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image: null,
      });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al guardar producto');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category_id,
      image: null,
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await api.delete(`/products/${productId}`);
      alert('Producto eliminado exitosamente');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al eliminar producto');
    }
  };

  const getProductImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }

    if (image.startsWith('/images/') || image.startsWith('/storage/')) {
      return image;
    }

    if (image.startsWith('images/')) {
      return `/${image}`;
    }

    return `/storage/${image}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="mb-8">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-4">
          {'<DASHBOARD/>'}
        </h1>
        <p className="text-gray-400 font-mono">
          Panel de administración - Bienvenido {user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card-hacker text-center">
          <ShoppingBagIcon className="h-12 w-12 text-hacker-red mx-auto mb-3" />
          <p className="text-gray-400 font-mono text-sm mb-1">Total Productos</p>
          <p className="text-4xl font-bold text-white">{products.length}</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-cyber font-bold text-white">
                  Mis Productos
                </h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      description: '',
                      price: '',
                      stock: '',
                      category_id: '',
                      image: null,
                    });
                    setShowProductModal(true);
                  }}
                  className="btn-hacker flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  NUEVO PRODUCTO
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="card-hacker">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-hacker-gray flex-shrink-0">
                        {product.image ? (
                          <img
                            src={getProductImageUrl(product.image)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-3xl text-hacker-red opacity-50">
                              {'</>'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 font-mono text-sm mb-2">
                          {product.category?.name}
                        </p>
                        <p className="text-hacker-red font-bold text-xl">
                          ${product.price} MXN
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 bg-hacker-gray hover:bg-blue-600 transition-colors"
                            title="Editar"
                          >
                            <PencilIcon className="h-5 w-5 text-white" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 bg-hacker-gray hover:bg-hacker-red transition-colors"
                            title="Eliminar"
                          >
                            <TrashIcon className="h-5 w-5 text-white" />
                          </button>
                        </div>

                        <p className="text-gray-400 font-mono text-sm">
                          Stock: <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                            {product.stock}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      )}

      {showProductModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="card-hacker max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6">
              {editingProduct ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-white font-mono text-sm mb-2">Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  className="input-hacker"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2">Descripción *</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  className="input-hacker resize-none"
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-mono text-sm mb-2">Precio *</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                    className="input-hacker"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-mono text-sm mb-2">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleProductFormChange}
                    className="input-hacker"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2">Categoría *</label>
                <select
                  name="category_id"
                  value={productForm.category_id}
                  onChange={handleProductFormChange}
                  className="input-hacker"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2">
                  Imagen {!editingProduct && '*'}
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleProductFormChange}
                  className="input-hacker"
                  accept="image/*"
                  required={!editingProduct}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 btn-hacker">
                  {editingProduct ? 'ACTUALIZAR' : 'CREAR PRODUCTO'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 btn-hacker-outline"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;