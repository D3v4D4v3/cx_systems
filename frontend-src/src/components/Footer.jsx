const Footer = () => {
  return (
    <footer className="bg-hacker-dark border-t-2 border-hacker-red mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-2xl font-cyber font-bold text-hacker-red text-glow mb-4">
              {'<CX/> SYSTEMS'}
            </h3>
            <p className="text-gray-400 font-mono text-sm">
              Tu tienda gaming de confianza. Hardware y periféricos de última generación.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
              Enlaces
            </h4>
            <ul className="space-y-2 text-gray-400 font-mono text-sm">
              <li className="hover:text-hacker-red transition-colors cursor-pointer">
                Sobre Nosotros
              </li>
              <li className="hover:text-hacker-red transition-colors cursor-pointer">
                Términos y Condiciones
              </li>
              <li className="hover:text-hacker-red transition-colors cursor-pointer">
                Política de Privacidad
              </li>
              <li className="hover:text-hacker-red transition-colors cursor-pointer">
                Contacto
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-2 text-gray-400 font-mono text-sm">
              <li>Email: support@cxsystems.com</li>
              <li>Tel: +52 981 123 4567</li>
              <li>Campeche, México</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hacker-red/30 mt-8 pt-6 text-center">
          <p className="text-gray-500 font-mono text-sm">
            &copy; 2026 CX Systems. Desarrollado por hackers, para gamers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;