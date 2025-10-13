import { useEffect } from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { COMPANY, LAST_UPDATED } from "@/lib/legal";

const AvisoLegal = () => {
  useEffect(() => {
    document.title = "Aviso Legal | MyAutoImport";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Aviso Legal de MyAutoImport. Información sobre el titular, condiciones de uso, propiedad intelectual y limitación de responsabilidad.');
    }
  }, []);

  return (
    <LegalLayout>
      <div className="space-y-8 text-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Aviso Legal</h1>
        <p className="text-muted-foreground mb-8">Última actualización: {LAST_UPDATED}</p>
        
        {/* Índice */}
        <nav className="bg-muted/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Índice</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#identificacion" className="text-primary hover:underline">1. Identificación del titular</a></li>
            <li><a href="#condiciones-uso" className="text-primary hover:underline">2. Condiciones de uso</a></li>
            <li><a href="#enlaces-terceros" className="text-primary hover:underline">3. Enlaces de terceros</a></li>
            <li><a href="#exencion" className="text-primary hover:underline">4. Exención de responsabilidad</a></li>
            <li><a href="#precios-iva" className="text-primary hover:underline">5. Precios e IVA</a></li>
            <li><a href="#propiedad-intelectual" className="text-primary hover:underline">6. Propiedad intelectual</a></li>
            <li><a href="#modificaciones" className="text-primary hover:underline">7. Modificaciones</a></li>
            <li><a href="#legislacion" className="text-primary hover:underline">8. Legislación aplicable</a></li>
          </ul>
        </nav>

        <section id="identificacion" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">1. Identificación del titular</h2>
          <div className="bg-card p-6 rounded-lg space-y-3">
            <p><strong>Denominación social:</strong> {COMPANY.name}</p>
            <p><strong>NIF/CIF:</strong> {COMPANY.nif}</p>
            <p><strong>Domicilio social:</strong> {COMPANY.address}, {COMPANY.city}, {COMPANY.country}</p>
            <p><strong>Email:</strong> <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
            <p><strong>Teléfono:</strong> <a href={`tel:${COMPANY.phone}`} className="text-primary hover:underline">{COMPANY.phone}</a></p>
            <p><strong>Datos registrales:</strong> {COMPANY.registry}</p>
            <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 18:00</p>
          </div>
        </section>

        <section id="condiciones-uso" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">2. Condiciones de uso del sitio web</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>El acceso y uso de este sitio web implica la aceptación plena de las presentes condiciones de uso. Si no está de acuerdo con alguna de ellas, debe abstenerse de utilizar este sitio.</p>
            <p><strong>Obligaciones del usuario:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hacer un uso correcto y lícito del sitio web</li>
              <li>No utilizar el sitio para actividades ilícitas o lesivas de derechos e intereses de terceros</li>
              <li>No introducir virus, código malicioso o cualquier elemento que pueda dañar el sistema</li>
              <li>No intentar acceder a áreas restringidas del sistema sin autorización</li>
              <li>No realizar actividades que puedan sobrecargar o inutilizar el funcionamiento del sitio</li>
            </ul>
          </div>
        </section>

        <section id="enlaces-terceros" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">3. Enlaces de terceros</h2>
          <div className="bg-card p-6 rounded-lg">
            <p>Este sitio web puede contener enlaces a sitios web de terceros. {COMPANY.name} no tiene control sobre estos sitios y no se hace responsable de:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Su contenido, política de privacidad o prácticas</li>
              <li>La disponibilidad o funcionamiento de dichos sitios</li>
              <li>Los daños que puedan derivarse de su uso</li>
            </ul>
            <p className="mt-4">La inclusión de enlaces no implica aprobación, patrocinio o recomendación por nuestra parte.</p>
          </div>
        </section>

        <section id="exencion" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">4. Exención de responsabilidad</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>{COMPANY.name} se esfuerza por mantener la información actualizada y libre de errores, pero no puede garantizar la exactitud, actualidad o completitud de toda la información.</p>
            <p><strong>Limitaciones específicas:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No garantizamos la disponibilidad continua del sitio web</li>
              <li>Errores tipográficos o inexactitudes en descripciones</li>
              <li>Disponibilidad de stock sujeta a cambios sin previo aviso</li>
              <li>Las imágenes pueden no corresponder exactamente al vehículo específico disponible</li>
              <li>Información técnica sujeta a verificación en cada caso particular</li>
            </ul>
          </div>
        </section>

        <section id="precios-iva" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">5. Precios e IVA</h2>
          <div className="bg-card p-6 rounded-lg space-y-3">
            <p><strong>Precios mostrados:</strong> Los precios son orientativos y pueden no incluir todos los costes asociados</p>
            <p><strong>IVA:</strong> Salvo que se indique expresamente lo contrario, los precios no incluyen IVA ni otros impuestos aplicables</p>
            <p><strong>Gastos adicionales:</strong> Pueden aplicarse gastos de gestión, transporte, homologación u otros según cada caso</p>
            <p><strong>Confirmación:</strong> Los precios definitivos se confirmarán en el presupuesto personalizado</p>
          </div>
        </section>

        <section id="propiedad-intelectual" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">6. Propiedad intelectual e industrial</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>Todos los elementos del sitio web son propiedad exclusiva de {COMPANY.name} o de sus licenciantes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Textos, gráficos, imágenes, iconos y fotografías</li>
              <li>Código fuente, estructura, navegación y diseño web</li>
              <li>Marcas, nombres comerciales y signos distintivos</li>
              <li>Logotipos, combinaciones de colores y elementos de diseño</li>
              <li>Cualquier otro elemento susceptible de protección</li>
            </ul>
            <p className="mt-4"><strong>Prohibiciones:</strong> Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación sin autorización previa y por escrito.</p>
          </div>
        </section>

        <section id="modificaciones" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">7. Modificaciones</h2>
          <div className="bg-card p-6 rounded-lg">
            <p>{COMPANY.name} se reserva el derecho de modificar en cualquier momento y sin previo aviso:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Las condiciones de uso del sitio web</li>
              <li>El diseño, contenidos y funcionalidades</li>
              <li>La estructura y organización del sitio</li>
            </ul>
            <p className="mt-4">Las modificaciones entrarán en vigor desde el momento de su publicación.</p>
          </div>
        </section>

        <section id="legislacion" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">8. Legislación aplicable y jurisdicción</h2>
          <div className="bg-card p-6 rounded-lg">
            <p><strong>Ley aplicable:</strong> Las presentes condiciones se rigen por la legislación española.</p>
            <p><strong>Jurisdicción:</strong> Para cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten expresamente a los Juzgados y Tribunales de Madrid, renunciando a cualquier otro fuero.</p>
            <p><strong>Idioma:</strong> En caso de discrepancia entre versiones idiomáticas, prevalecerá la versión en español.</p>
          </div>
        </section>

        <section className="bg-muted/10 p-6 rounded-lg mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Páginas relacionadas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/politica-de-privacidad" className="text-primary hover:underline">Política de Privacidad</a>
            <a href="/terminos-y-condiciones" className="text-primary hover:underline">Términos y Condiciones</a>
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

export default AvisoLegal;