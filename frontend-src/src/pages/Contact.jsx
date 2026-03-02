import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Función para manejar cambios en los campos del formulario y actualizar el estado formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario: construye un enlace mailto con los datos del formulario y redirige al cliente de correo
  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:support@cxsystems.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-8">
          {'<CONTACTO/>'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-hacker space-y-6">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6">
              INFORMACIÓN DE CONTACTO
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <EnvelopeIcon className="h-6 w-6 text-hacker-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold mb-1">Email</h3>
                  <a
                    href="mailto:support@cxsystems.com"
                    className="text-gray-400 hover:text-hacker-red transition-colors font-mono"
                  >
                    support@cxsystems.com
                  </a>
                  <p className="text-gray-500 text-sm mt-1">
                    Respuesta en menos de 24 horas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <PhoneIcon className="h-6 w-6 text-hacker-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold mb-1">Teléfono</h3>
                  <a
                    href="tel:+529811234567"
                    className="text-gray-400 hover:text-hacker-red transition-colors font-mono"
                  >
                    +52 981 123 4567
                  </a>
                  <p className="text-gray-500 text-sm mt-1">
                    Lun - Vie: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPinIcon className="h-6 w-6 text-hacker-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold mb-1">Ubicación</h3>
                  <p className="text-gray-400 font-mono">
                    Campeche, México
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Envíos a toda la República Mexicana
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-hacker-red/10 border border-hacker-red rounded p-4 mt-6">
              <h3 className="text-white font-bold mb-2">Horarios de Atención</h3>
              <div className="text-gray-400 font-mono text-sm space-y-1">
                <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                <p>Sábados: 10:00 AM - 2:00 PM</p>
                <p className="text-hacker-red">Domingos: Cerrado</p>
              </div>
            </div>

            <div className="border-t border-hacker-red/30 pt-6">
              <h3 className="text-white font-bold mb-3">Soporte Técnico</h3>
              <p className="text-gray-400 font-mono text-sm mb-3">
                ¿Necesitas ayuda con la instalación de algún componente o tienes dudas técnicas?
              </p>
              <a
                href="mailto:soporte@cxsystems.com"
                className="text-hacker-red hover:underline font-mono text-sm"
              >
                soporte@cxsystems.com
              </a>
            </div>
          </div>

          <div className="card-hacker">
            <h2 className="text-2xl font-cyber font-bold text-white mb-6">
              ENVÍANOS UN MENSAJE
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Asunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-hacker"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-mono text-sm mb-2 uppercase tracking-wider">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-hacker resize-none"
                  rows="5"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
              </div>

              <button type="submit" className="w-full btn-hacker">
                ENVIAR MENSAJE
              </button>

              <p className="text-gray-500 text-xs font-mono text-center">
                Al enviar este formulario, se abrirá tu cliente de correo electrónico
              </p>
            </form>
          </div>
        </div>

        <div className="card-hacker mt-8">
          <h2 className="text-2xl font-cyber font-bold text-white mb-6">
            PREGUNTAS FRECUENTES
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-bold mb-2">¿Cuál es el tiempo de envío?</h3>
              <p className="text-gray-400 font-mono text-sm">
                Manejamos envíos de 24-48 horas en la península de Yucatán. Para el resto del país, 
                el tiempo puede variar entre 3-5 días hábiles.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">¿Tienen garantía los productos?</h3>
              <p className="text-gray-400 font-mono text-sm">
                Sí, todos nuestros productos cuentan con garantía de fabricante de 12 meses. 
                Algunos productos seleccionados tienen garantía extendida.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">¿Puedo recoger mi pedido en tienda?</h3>
              <p className="text-gray-400 font-mono text-sm">
                Por el momento solo manejamos envíos a domicilio. Contáctanos para casos especiales.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">¿Aceptan devoluciones?</h3>
              <p className="text-gray-400 font-mono text-sm">
                Sí, dentro de los primeros 7 días posteriores a la compra, siempre que el producto 
                esté en su empaque original y sin uso. Consulta nuestra política de devoluciones completa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
