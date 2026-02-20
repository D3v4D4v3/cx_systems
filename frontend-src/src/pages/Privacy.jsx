const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-8">
          {'<POLÍTICA DE PRIVACIDAD/>'}
        </h1>

        <div className="card-hacker space-y-6 text-gray-300 font-mono text-sm leading-relaxed">
          <p className="text-base">
            Última actualización: 19 de febrero de 2026
          </p>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. INFORMACIÓN QUE RECOPILAMOS</h2>
            <p className="mb-2">Recopilamos la siguiente información cuando utiliza nuestros servicios:</p>
            
            <h3 className="text-white font-bold mt-4 mb-2">Información Personal:</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Dirección de envío</li>
              <li>Información de pago (procesada de forma segura)</li>
            </ul>

            <h3 className="text-white font-bold mt-4 mb-2">Información Técnica:</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Dirección IP</li>
              <li>Tipo de navegador</li>
              <li>Sistema operativo</li>
              <li>Páginas visitadas y tiempo de navegación</li>
              <li>Cookies y tecnologías similares</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. USO DE LA INFORMACIÓN</h2>
            <p>Utilizamos su información para:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Procesar y enviar sus pedidos</li>
              <li>Comunicarnos con usted sobre su cuenta y pedidos</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Personalizar su experiencia de compra</li>
              <li>Enviar ofertas y promociones (con su consentimiento)</li>
              <li>Prevenir fraudes y garantizar la seguridad</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. PROTECCIÓN DE DATOS</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información 
              personal contra acceso no autorizado, alteración, divulgación o destrucción:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Cifrado SSL/TLS para todas las transacciones</li>
              <li>Servidores seguros con certificados actualizados</li>
              <li>Acceso restringido a datos personales</li>
              <li>Monitoreo continuo de seguridad</li>
              <li>Backups regulares de información</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. COMPARTIR INFORMACIÓN</h2>
            <p className="mb-2">No vendemos ni alquilamos su información personal. Podemos compartir sus datos con:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <span className="text-white font-bold">Proveedores de servicios:</span> Empresas de envío, 
                procesadores de pago, proveedores de hosting
              </li>
              <li>
                <span className="text-white font-bold">Autoridades legales:</span> Cuando sea requerido por ley 
                o para proteger nuestros derechos
              </li>
              <li>
                <span className="text-white font-bold">Socios comerciales:</span> Con su consentimiento explícito
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. COOKIES</h2>
            <p>
              Utilizamos cookies para mejorar su experiencia de navegación. Las cookies son pequeños 
              archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio.
            </p>
            <p className="mt-2">Puede configurar su navegador para rechazar cookies, pero esto puede 
            afectar algunas funcionalidades del sitio.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. SUS DERECHOS</h2>
            <p>De acuerdo con la Ley Federal de Protección de Datos Personales, usted tiene derecho a:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar datos incorrectos o incompletos</li>
              <li>Cancelar sus datos cuando sean inadecuados o excesivos</li>
              <li>Oponerse al tratamiento de sus datos para fines específicos</li>
              <li>Revocar su consentimiento en cualquier momento</li>
            </ul>
            <p className="mt-2">
              Para ejercer estos derechos, contáctenos a:{' '}
              <a href="mailto:privacidad@cxsystems.com" className="text-hacker-red hover:underline">
                privacidad@cxsystems.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. RETENCIÓN DE DATOS</h2>
            <p>
              Conservamos su información personal durante el tiempo necesario para cumplir con los 
              propósitos descritos en esta política, a menos que la ley requiera o permita un período 
              de retención más prolongado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. MENORES DE EDAD</h2>
            <p>
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente 
              información de menores sin el consentimiento de sus padres o tutores legales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. CAMBIOS A ESTA POLÍTICA</h2>
            <p>
              Podemos actualizar esta política de privacidad periódicamente. Le notificaremos de 
              cualquier cambio importante publicando la nueva política en esta página y actualizando 
              la fecha de "última actualización".
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. CONTACTO</h2>
            <p>
              Si tiene preguntas sobre esta política de privacidad o el tratamiento de sus datos 
              personales, contáctenos:
            </p>
            <div className="ml-4 mt-2 space-y-1">
              <p>
                Email:{' '}
                <a href="mailto:privacidad@cxsystems.com" className="text-hacker-red hover:underline">
                  privacidad@cxsystems.com
                </a>
              </p>
              <p>Teléfono: +52 981 123 4567</p>
              <p>Dirección: Campeche, México</p>
            </div>
          </section>

          <div className="bg-hacker-red/10 border border-hacker-red rounded p-4 mt-8">
            <p className="text-white font-bold mb-2">
              Compromiso de Seguridad
            </p>
            <p className="text-gray-400">
              En CX Systems, la protección de su información personal es nuestra prioridad. 
              Implementamos las mejores prácticas de seguridad de la industria para mantener 
              sus datos seguros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
