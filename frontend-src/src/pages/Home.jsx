import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, CpuChipIcon, TvIcon } from '@heroicons/react/24/outline';
import api from '../api/axios';

const Home = () => {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadProductCount = async () => {
      try {
        const response = await api.get('/products?per_page=1');
        if (isMounted) {
          setProductCount(response.data?.total || 0);
        }
      } catch (error) {
        console.error('Error al cargar el total de productos:', error);
      }
    };

    loadProductCount();

    const intervalId = setInterval(loadProductCount, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-screen">
      
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hacker-red/10 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-cyber font-bold text-hacker-red text-glow mb-6 animate-pulse">
              {'<CX SYSTEMS/>'}
            </h1>
            <p className="text-2xl md:text-3xl font-mono text-white mb-8">
              LA TIENDA GAMING QUE TODOS RECOMIENDAN
            </p>
            <p className="text-lg text-gray-400 font-mono mb-12 max-w-2xl mx-auto">
              Hardware de élite, periféricos profesionales y componentes de última generación. 
              Construye tu setup definitivo con nosotros.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-hacker text-lg px-8 py-3">
                VER PRODUCTOS
              </Link>
              <Link to="/register" className="btn-hacker-outline text-lg px-8 py-3">
                REGISTRARSE
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(rgba(255, 0, 0, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 0, 0, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </section>

      <section className="py-20 bg-hacker-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-cyber font-bold text-center text-hacker-red text-glow mb-12">
            {'<CATEGORÍAS/>'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <Link to="/products?category=2" className="card-hacker text-center group cursor-pointer">
              <div className="mb-4 flex justify-center">
                <CpuChipIcon className="h-16 w-16 text-hacker-red group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-cyber font-bold text-white mb-3">
                COMPONENTES PC
              </h3>
              <p className="text-gray-400 font-mono text-sm">
                RAM DDR5, procesadores Intel/AMD, tarjetas gráficas RTX 40 series
              </p>
            </Link>

            <Link to="/products?category=1" className="card-hacker text-center group cursor-pointer">
              <div className="mb-4 flex justify-center">
                <ShoppingBagIcon className="h-16 w-16 text-hacker-red group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-cyber font-bold text-white mb-3">
                PERIFÉRICOS
              </h3>
              <p className="text-gray-400 font-mono text-sm">
                Mouse, teclados mecánicos, audífonos gaming de marcas premium
              </p>
            </Link>

            <Link to="/products?category=3" className="card-hacker text-center group cursor-pointer">
              <div className="mb-4 flex justify-center">
                <TvIcon className="h-16 w-16 text-hacker-red group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-cyber font-bold text-white mb-3">
                MONITORES
              </h3>
              <p className="text-gray-400 font-mono text-sm">
                Monitores gaming 144Hz+, OLED, 4K, ultra-wide y curvas
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="card-hacker max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-cyber font-bold text-hacker-red text-glow mb-6">
              {'<ÚNETE AL SISTEMA/>'}
            </h2>
            <p className="text-xl text-gray-300 font-mono mb-8">
              Regístrate ahora y obtén acceso a ofertas exclusivas y lanzamientos anticipados
            </p>
            <Link to="/register" className="btn-hacker text-lg px-8 py-3 inline-block">
              CREAR CUENTA AHORA
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-hacker-black border-t-2 border-hacker-red/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto font-mono text-sm">
            <p className="text-green-500 mb-2">{'> '} Estado del Sistema: <span className="text-hacker-red animate-pulse">EN LÍNEA</span></p>
            <p className="text-green-500 mb-2">{'> '} Productos Disponibles: <span className="text-white">{productCount}</span></p>
            <p className="text-green-500 mb-2">{'> '} Tiempo de Entrega: <span className="text-white">24-48hrs</span></p>
            <p className="text-green-500">{'> '} Garantia: <span className="text-white">12 meses</span></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;