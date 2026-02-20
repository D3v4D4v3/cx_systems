const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-cyber font-bold text-hacker-red text-glow mb-8">
          {'<TÉRMINOS Y CONDICIONES/>'}
        </h1>

        <div className="card-hacker space-y-6 text-gray-300 font-mono text-sm leading-relaxed">
          <p className="text-base">
            Última actualización: 19 de febrero de 2026
          </p>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. ACEPTACIÓN DE TÉRMINOS</h2>
            <p>
              Al acceder y utilizar CX Systems ("el Sitio"), usted acepta estar sujeto a estos 
              Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, 
              no debe utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. USO DEL SITIO</h2>
            <p>Usted se compromete a:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Proporcionar información precisa y actualizada al registrarse</li>
              <li>Mantener la confidencialidad de su cuenta y contraseña</li>
              <li>No utilizar el sitio para fines ilegales o no autorizados</li>
              <li>No interferir con el funcionamiento normal del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. PRODUCTOS Y PRECIOS</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Todos los precios están expresados en pesos mexicanos (MXN)</li>
              <li>Los precios pueden cambiar sin previo aviso</li>
              <li>Nos reservamos el derecho de limitar las cantidades de compra</li>
              <li>Las imágenes son referenciales y pueden diferir del producto real</li>
              <li>La disponibilidad de stock está sujeta a cambios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. PROCESO DE COMPRA</h2>
            <p>
              Al realizar un pedido, usted acepta que la confirmación del pedido constituye una 
              oferta de compra. Nos reservamos el derecho de aceptar o rechazar cualquier pedido 
              por cualquier motivo. En caso de rechazo, se le notificará y se reembolsará el pago.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. ENVÍOS</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Tiempos de entrega estimados: 24-48 horas (puede variar según ubicación)</li>
              <li>Los gastos de envío se calcularán al momento de la compra</li>
              <li>No nos hacemos responsables por demoras causadas por paqueterías</li>
              <li>Es responsabilidad del cliente verificar el paquete al recibirlo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. GARANTÍAS Y DEVOLUCIONES</h2>
            <p>
              Todos los productos cuentan con garantía de fabricante de 12 meses. Las devoluciones 
              se aceptan dentro de los primeros 7 días posteriores a la compra, siempre que el 
              producto esté en su empaque original, sin uso y con todos sus accesorios.
            </p>
            <p className="mt-2 text-hacker-red">
              No se aceptan devoluciones de productos dañados por mal uso o instalación incorrecta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. PROPIEDAD INTELECTUAL</h2>
            <p>
              Todo el contenido del sitio, incluyendo textos, gráficos, logos, imágenes y software, 
              es propiedad de CX Systems o sus proveedores de contenido y está protegido por las 
              leyes de propiedad intelectual de México.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. LIMITACIÓN DE RESPONSABILIDAD</h2>
            <p>
              CX Systems no será responsable por daños indirectos, incidentales, especiales o 
              consecuentes derivados del uso o la imposibilidad de usar nuestros productos o servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. MODIFICACIONES</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
              entrarán en vigor inmediatamente después de su publicación en el sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. CONTACTO</h2>
            <p>
              Para preguntas sobre estos términos, contáctenos en:{' '}
              <a href="mailto:legal@cxsystems.com" className="text-hacker-red hover:underline">
                legal@cxsystems.com
              </a>
            </p>
          </section>

          <div className="bg-hacker-red/10 border border-hacker-red rounded p-4 mt-8">
            <p className="text-white font-bold">
              Al continuar usando nuestro sitio, usted acepta estos términos y condiciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
