import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/products');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-cyber font-bold text-hacker-red text-glow mb-2">
            {'<ACCESS/>'}
          </h1>
          <p className="text-gray-400 font-mono">Inicia sesión en CX Systems</p>
        </div>

        <div className="card-hacker">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-hacker-red/10 border border-hacker-red text-hacker-red px-4 py-3 rounded font-mono text-sm">
                {error}
              </div>
            )}

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
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-hacker"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-hacker disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'ACCEDIENDO...' : 'INICIAR SESIÓN'}
            </button>

            <div className="mt-4 p-4 bg-hacker-gray/50 border border-hacker-red/20 rounded">
              <p className="text-xs font-mono text-gray-400 mb-2">Acceso rápido:</p>
              <div className="space-y-1 text-xs font-mono">
                <p className="text-hacker-red">Vendedor: admin@cxsystems.com / password</p>
                <p className="text-green-500">Cliente: cliente@test.com / password</p>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 font-mono text-sm">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-hacker-red hover:underline font-bold">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-hacker-black border border-hacker-red/20 rounded font-mono text-xs text-green-500">
          <p className="animate-pulse">{'> '} Conectando al sistema...</p>
          <p className="opacity-70">{'> '} Estado: ESPERANDO CREDENCIALES</p>
        </div>
      </div>
    </div>
  );
};

export default Login;