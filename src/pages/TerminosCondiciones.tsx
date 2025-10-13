import { useEffect } from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { COMPANY, LAST_UPDATED } from "@/lib/legal";

const TerminosCondiciones = () => {
  useEffect(() => {
    document.title = "Términos y Condiciones | MyAutoImport";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Términos y Condiciones de MyAutoImport. Condiciones de uso para servicios de intermediación e importación de vehículos desde Alemania.');
    }
  }, []);

  return (
    <LegalLayout>
      <div className="space-y-8 text-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Términos y Condiciones</h1>
        <p className="text-muted-foreground mb-8">Última actualización: {LAST_UPDATED}</p>
        
        {/* Índice */}
        <nav className="bg-muted/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Índice</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#naturaleza" className="text-primary hover:underline">1. Naturaleza del servicio</a></li>
            <li><a href="#proceso" className="text-primary hover:underline">2. Proceso de solicitud y presupuesto</a></li>
            <li><a href="#plazos" className="text-primary hover:underline">3. Plazos y disponibilidad</a></li>
            <li><a href="#ahorro" className="text-primary hover:underline">4. Cálculo del ahorro</a></li>
            <li><a href="#garantias" className="text-primary hover:underline">5. Garantías</a></li>
            <li><a href="#reservas" className="text-primary hover:underline">6. Reservas y devoluciones</a></li>
            <li><a href="#responsabilidad" className="text-primary hover:underline">7. Responsabilidad y fuerza mayor</a></li>
            <li><a href="#ley-aplicable" className="text-primary hover:underline">8. Ley aplicable y jurisdicción</a></li>
          </ul>
        </nav>

        <section id="naturaleza" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">1. Naturaleza del servicio</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>
              <strong>IMPORTANTE:</strong> {COMPANY.name} NO es un e-commerce de venta directa de vehículos. 
              Somos una empresa de <strong>intermediación y gestión</strong> especializada en la importación de vehículos desde Alemania.
            </p>
            <p>Nuestros servicios incluyen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Búsqueda y localización de vehículos en el mercado alemán</li>
              <li>Evaluación técnica y documental de vehículos</li>
              <li>Gestión integral del proceso de importación</li>
              <li>Tramitación de documentación y homologaciones</li>
              <li>Coordinar transporte especializado</li>
              <li>Asesoría durante todo el proceso</li>
            </ul>
          </div>
        </section>

        <section id="proceso" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">2. Proceso de solicitud y presupuesto</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>El proceso se desarrolla de la siguiente manera:</p>
            <ol className="list-decimal pl-6 space-y-3">
              <li><strong>Consulta inicial:</strong> El cliente solicita información sobre un vehículo específico o sus preferencias</li>
              <li><strong>Búsqueda:</strong> Localizamos opciones en el mercado alemán según los criterios</li>
              <li><strong>Presentación de opciones:</strong> Proporcionamos información detallada y presupuesto</li>
              <li><strong>Confirmación:</strong> El cliente confirma su interés y firmamos contrato específico</li>
              <li><strong>Gestión integral:</strong> Nos encargamos de todo el proceso de importación</li>
            </ol>
            <div className="mt-4 p-4 bg-primary/10 rounded border-l-4 border-primary">
              <p><strong>Importante:</strong> Las consultas de información son gratuitas y sin compromiso hasta la firma del contrato específico.</p>
            </div>
          </div>
        </section>

        <section id="plazos" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">3. Plazos y disponibilidad</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>Los plazos son estimados y están sujetos a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Disponibilidad del vehículo en el mercado alemán</li>
              <li>Tiempos de gestión documental y homologación</li>
              <li>Disponibilidad de transporte especializado</li>
              <li>Procesos aduaneros e inspecciones técnicas</li>
            </ul>
            <p><strong>Plazo orientativo:</strong> Entre 2-6 semanas desde la confirmación del pedido, pudiendo variar según circunstancias específicas del vehículo y documentación requerida.</p>
          </div>
        </section>

        <section id="ahorro" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">4. Cálculo del ahorro</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>Cuando mostramos un "Ahorro" en nuestras ofertas, este se calcula:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respecto al <strong>PVP oficial nuevo</strong> del fabricante para ese modelo y año</li>
              <li>Respecto al <strong>precio anterior</strong> del propio anuncio (cuando aplique)</li>
              <li>Considerando el <strong>precio de mercado</strong> de vehículos similares en España</li>
            </ul>
            <div className="mt-4 p-4 bg-amber-500/10 rounded border-l-4 border-amber-500">
              <p><strong>Advertencia:</strong> El ahorro puede variar según las condiciones del mercado, opciones del vehículo, y costes adicionales que puedan surgir durante el proceso de importación.</p>
            </div>
          </div>
        </section>

        <section id="garantias" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">5. Garantías</h2>
          <div className="bg-card p-6 rounded-lg">
            <p><strong>Garantías aplicables:</strong> X (pendiente de definir según el tipo de vehículo y acuerdos con proveedores alemanes)</p>
            <p><strong>Cobertura:</strong> Según las condiciones específicas de cada vehículo y fabricante</p>
            <p><strong>Validez en España:</strong> Gestionamos el reconocimiento de garantías del fabricante cuando aplique</p>
          </div>
        </section>

        <section id="reservas" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">6. Reservas y devoluciones</h2>
          <div className="bg-card p-6 rounded-lg">
            <p><strong>Reservas:</strong> X (condiciones específicas según el contrato de cada importación)</p>
            <p><strong>Devoluciones:</strong> X (política específica según las circunstancias de cada caso)</p>
            <p><strong>Derecho de desistimiento:</strong> Aplicable según la legislación de consumo cuando proceda</p>
          </div>
        </section>

        <section id="responsabilidad" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">7. Responsabilidad y fuerza mayor</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>{COMPANY.name} actúa como intermediario especializado, limitando su responsabilidad a los servicios de gestión contratados.</p>
            <p><strong>Limitaciones de responsabilidad:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Excluimos responsabilidad por daños indirectos o lucro cesante</li>
              <li>No nos responsabilizamos de retrasos por causas ajenas a nuestro control</li>
              <li>La responsabilidad máxima se limita al importe de los servicios contratados</li>
            </ul>
            <p><strong>Fuerza mayor:</strong> No seremos responsables por incumplimientos debidos a casos fortuitos, fuerza mayor, huelgas, o circunstancias excepcionales.</p>
          </div>
        </section>

        <section id="ley-aplicable" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">8. Ley aplicable y jurisdicción</h2>
          <div className="bg-card p-6 rounded-lg">
            <p><strong>Legislación:</strong> Estos términos se rigen por la legislación española.</p>
            <p><strong>Jurisdicción:</strong> Para la resolución de controversias, las partes se someten a los juzgados y tribunales de Madrid, España.</p>
            <p><strong>Idioma:</strong> En caso de discrepancia entre versiones en diferentes idiomas, prevalecerá la versión en español.</p>
          </div>
        </section>

        <section className="bg-muted/10 p-6 rounded-lg mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Páginas relacionadas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/politica-de-privacidad" className="text-primary hover:underline">Política de Privacidad</a>
            <a href="/aviso-legal" className="text-primary hover:underline">Aviso Legal</a>
            <a href="/politica-de-cookies" className="text-primary hover:underline">Política de Cookies</a>
          </div>
        </section>

        <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t border-border">
          <p>Última actualización: {LAST_UPDATED}</p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default TerminosCondiciones;