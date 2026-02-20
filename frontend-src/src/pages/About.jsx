const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-8">
          {'<SOBRE NOSOTROS/>'}
        </h1>

        <div className="card-hacker space-y-6 text-gray-300 font-mono leading-relaxed">
          <p className="text-lg">
            <span className="text-hacker-red font-bold">CX Systems</span> es tu destino premium para hardware gaming y componentes de alta gama en México. 
            Fundada por entusiastas de la tecnología y gamers profesionales, nuestra misión es proporcionar 
            acceso a los mejores productos del mercado con precios competitivos y servicio excepcional.
          </p>

          <h2 className="text-2xl font-cyber font-bold text-white mt-8 mb-4">NUESTRA HISTORIA</h2>
          <p>
            Desde 2026, hemos estado al servicio de la comunidad gamer en Campeche y todo México. 
            Comenzamos como una pequeña tienda especializada en periféricos gaming y hemos crecido 
            hasta convertirnos en uno de los distribuidores más confiables de hardware especializado 
            en la región.
          </p>

          <h2 className="text-2xl font-cyber font-bold text-white mt-8 mb-4">¿POR QUÉ ELEGIRNOS?</h2>
          <ul className="space-y-3 list-disc list-inside">
            <li>
              <span className="text-hacker-red font-bold">Productos Originales:</span> Trabajamos directamente 
              con fabricantes y distribuidores autorizados.
            </li>
            <li>
              <span className="text-hacker-red font-bold">Garantía Extendida:</span> Todos nuestros productos 
              cuentan con garantía de 12 meses.
            </li>
            <li>
              <span className="text-hacker-red font-bold">Envío Rápido:</span> Entregas en 24-48 horas en toda 
              la península de Yucatán.
            </li>
            <li>
              <span className="text-hacker-red font-bold">Precios Competitivos:</span> Las mejores ofertas sin 
              comprometer la calidad.
            </li>
          </ul>

          <h2 className="text-2xl font-cyber font-bold text-white mt-8 mb-4">NUESTRA VISIÓN</h2>
          <p>
            Convertirnos en la tienda de referencia para gamers y profesionales de tecnología en México, 
            ofreciendo no solo productos, sino una experiencia de compra integral que incluya contenido 
            educativo y una comunidad activa de entusiastas.
          </p>

          <div className="bg-hacker-red/10 border border-hacker-red rounded p-6 mt-8">
            <p className="text-white font-bold text-xl mb-2">
              {'> '} System.println("Únete a la revolución gaming");
            </p>
            <p className="text-gray-400">
              Construye tu setup perfecto con nosotros. Cada componente ha sido cuidadosamente 
              seleccionado por expertos para garantizar el máximo rendimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
