import { useEffect } from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { COMPANY, PROCESSORS, LAST_UPDATED } from "@/lib/legal";

const PoliticaPrivacidad = () => {
  useEffect(() => {
    document.title = "Política de Privacidad | MyAutoImport";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Política de Privacidad de MyAutoImport según RGPD. Información sobre tratamiento de datos, finalidades, derechos del usuario y contacto para ejercerlos.');
    }
  }, []);

  return (
    <LegalLayout>
      <div className="space-y-8 text-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Política de Privacidad</h1>
        <p className="text-muted-foreground mb-8">Última actualización: {LAST_UPDATED}</p>
        
        {/* Índice */}
        <nav className="bg-muted/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Índice</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#responsable" className="text-primary hover:underline">1. Responsable del tratamiento</a></li>
            <li><a href="#finalidades" className="text-primary hover:underline">2. Finalidades del tratamiento</a></li>
            <li><a href="#base-juridica" className="text-primary hover:underline">3. Base jurídica</a></li>
            <li><a href="#conservacion" className="text-primary hover:underline">4. Conservación de datos</a></li>
            <li><a href="#destinatarios" className="text-primary hover:underline">5. Destinatarios</a></li>
            <li><a href="#transferencias" className="text-primary hover:underline">6. Transferencias internacionales</a></li>
            <li><a href="#derechos" className="text-primary hover:underline">7. Derechos del usuario</a></li>
            <li><a href="#menores" className="text-primary hover:underline">8. Menores de edad</a></li>
            <li><a href="#decisiones" className="text-primary hover:underline">9. Decisiones automatizadas</a></li>
            <li><a href="#cookies" className="text-primary hover:underline">10. Cookies</a></li>
          </ul>
        </nav>

        <section id="responsable" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">1. Responsable del tratamiento</h2>
          <div className="bg-card p-6 rounded-lg space-y-3">
            <p><strong>Denominación:</strong> {COMPANY.name}</p>
            <p><strong>NIF:</strong> {COMPANY.nif}</p>
            <p><strong>Domicilio:</strong> {COMPANY.address}, {COMPANY.city}, {COMPANY.country}</p>
            <p><strong>Email:</strong> {COMPANY.email}</p>
            <p><strong>Teléfono:</strong> {COMPANY.phone}</p>
            <p><strong>Datos registrales:</strong> {COMPANY.registry}</p>
          </div>
        </section>

        <section id="finalidades" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">2. Finalidades del tratamiento</h2>
          <p className="mb-4">Los datos personales que nos proporcione serán tratados con las siguientes finalidades:</p>
          <ul className="list-disc pl-6 space-y-3 bg-card p-6 rounded-lg">
            <li>Gestionar solicitudes de información y presupuestos sobre importación de vehículos</li>
            <li>Contacto comercial y seguimiento de consultas e intereses del cliente</li>
            <li>Analítica web para mejorar nuestros servicios y experiencia de usuario</li>
            <li>Medidas de seguridad y prevención de fraude en las operaciones</li>
            <li>Cumplimiento de obligaciones legales aplicables al sector</li>
          </ul>
        </section>

        <section id="base-juridica" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">3. Base jurídica</h2>
          <p className="mb-4">El tratamiento de sus datos se basa en:</p>
          <ul className="list-disc pl-6 space-y-3 bg-card p-6 rounded-lg">
            <li><strong>Consentimiento (Art. 6.1.a RGPD):</strong> Para el envío de comunicaciones comerciales</li>
            <li><strong>Ejecución de medidas precontractuales (Art. 6.1.b RGPD):</strong> Cuando nos solicite información o presupuestos</li>
            <li><strong>Interés legítimo (Art. 6.1.f RGPD):</strong> Para seguridad, prevención de fraude y analítica web</li>
            <li><strong>Obligación legal (Art. 6.1.c RGPD):</strong> Para cumplir con normativas fiscales y mercantiles cuando aplique</li>
          </ul>
        </section>

        <section id="conservacion" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">4. Conservación de datos</h2>
          <div className="bg-card p-6 rounded-lg space-y-3">
            <p><strong>Consultas y leads:</strong> 12 meses desde la última interacción</p>
            <p><strong>Datos de facturación:</strong> 5 años (obligación legal fiscal)</p>
            <p><strong>Analítica web:</strong> 26 meses (configurable según preferencias de cookies)</p>
            <p><strong>General:</strong> Mientras dure la relación comercial y el tiempo necesario para cumplir con las obligaciones legales aplicables</p>
          </div>
        </section>

        <section id="destinatarios" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">5. Destinatarios</h2>
          <p className="mb-4">Sus datos podrán ser comunicados a los siguientes encargados del tratamiento:</p>
          <div className="space-y-4">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="font-semibold mb-2">{PROCESSORS.supabase.name}</h3>
              <p><strong>Finalidad:</strong> {PROCESSORS.supabase.purpose}</p>
              <p><strong>Ubicación:</strong> {PROCESSORS.supabase.location}</p>
              <p><strong>Contrato DPA:</strong> {PROCESSORS.supabase.dpa}</p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="font-semibold mb-2">{PROCESSORS.emailProvider.name}</h3>
              <p><strong>Finalidad:</strong> {PROCESSORS.emailProvider.purpose}</p>
              <p><strong>Ubicación:</strong> {PROCESSORS.emailProvider.location}</p>
              <p><strong>Contrato DPA:</strong> {PROCESSORS.emailProvider.dpa}</p>
            </div>
          </div>
        </section>

        <section id="transferencias" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">6. Transferencias internacionales</h2>
          <div className="bg-card p-6 rounded-lg">
            <p>Solo se realizarán transferencias internacionales cuando sea requerido por el proveedor de servicios, garantizando en todo caso las medidas de seguridad adecuadas mediante:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Cláusulas Contractuales Tipo (SCC) aprobadas por la Comisión Europea</li>
              <li>Países con decisión de adecuación del Espacio Económico Europeo</li>
              <li>Otras garantías apropiadas reconocidas por el RGPD</li>
            </ul>
          </div>
        </section>

        <section id="derechos" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">7. Derechos del usuario</h2>
          <p className="mb-4">Conforme al RGPD, puede ejercer los siguientes derechos:</p>
          <div className="bg-card p-6 rounded-lg space-y-3">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> Obtener información sobre sus datos personales</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
              <li><strong>Supresión:</strong> Eliminar sus datos cuando no sean necesarios</li>
              <li><strong>Oposición:</strong> Oponerse al tratamiento en determinadas circunstancias</li>
              <li><strong>Limitación:</strong> Restringir el tratamiento en ciertos casos</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
            </ul>
            <div className="mt-4 p-4 bg-primary/10 rounded border-l-4 border-primary">
              <p><strong>¿Cómo ejercer sus derechos?</strong></p>
              <p>Contacte con nosotros en: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
              <p>Incluya copia de su DNI/NIE para verificar su identidad.</p>
            </div>
            <div className="mt-4 p-4 bg-muted/20 rounded">
              <p><strong>Reclamaciones:</strong> Puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD): <a href="https://www.aepd.es/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a></p>
            </div>
          </div>
        </section>

        <section id="menores" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">8. Menores de edad</h2>
          <div className="bg-card p-6 rounded-lg">
            <p>Nuestros servicios no están dirigidos a menores de 14 años. No recogemos intencionadamente datos personales de menores sin el consentimiento de sus padres o tutores legales.</p>
          </div>
        </section>

        <section id="decisiones" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">9. Decisiones automatizadas</h2>
          <div className="bg-card p-6 rounded-lg">
            <p>No realizamos tratamientos que impliquen decisiones automatizadas, incluida la elaboración de perfiles, que produzcan efectos jurídicos o le afecten significativamente.</p>
          </div>
        </section>

        <section id="cookies" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">10. Cookies</h2>
          <div className="bg-card p-6 rounded-lg">
            <p>Para información detallada sobre el uso de cookies en nuestro sitio web, consulte nuestra <a href="/politica-de-cookies" className="text-primary hover:underline">Política de Cookies</a>.</p>
          </div>
        </section>

        <section className="bg-muted/10 p-6 rounded-lg mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Páginas relacionadas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/terminos-y-condiciones" className="text-primary hover:underline">Términos y Condiciones</a>
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

export default PoliticaPrivacidad;