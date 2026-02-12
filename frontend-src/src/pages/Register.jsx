import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    const result = await register(formData);

    if (result.success) {
      navigate('/products');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-cyber font-bold text-hacker-red text-glow mb-2">
            {'<REGISTER/>'}
          </h1>
          <p className="text-gray-400 font-mono">Únete a CX Systems</p>
        </div>

        <div className="card-hacker">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-hacker-red/10 border border-hacker-red text-hacker-red px-4 py-3 rounded font-mono text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="user@cxsystems.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="9999999999"
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="Campeche, México"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-hacker disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'REGISTRANDO...' : 'CREAR CUENTA'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 font-mono text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-hacker-red hover:underline font-bold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-hacker-black border border-hacker-red/20 rounded font-mono text-xs text-green-500">
          <p className="animate-pulse">{'> '} Nuevo usuario detectado...</p>
          <p className="opacity-70">{'> '} Estado: ESPERANDO DATOS</p>
        </div>
      </div>
    </div>
  );
};

export default Register;