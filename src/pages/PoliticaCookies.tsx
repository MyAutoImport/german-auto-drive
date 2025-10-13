import { useEffect } from "react";
import LegalLayout from "@/components/legal/LegalLayout";
import { COMPANY, LAST_UPDATED } from "@/lib/legal";

const PoliticaCookies = () => {
  useEffect(() => {
    document.title = "Política de Cookies | MyAutoImport";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Política de Cookies de MyAutoImport. Información sobre tipos de cookies, finalidades, duración y cómo gestionar sus preferencias.');
    }
  }, []);

  return (
    <LegalLayout>
      <div className="space-y-8 text-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Política de Cookies</h1>
        <p className="text-muted-foreground mb-8">Última actualización: {LAST_UPDATED}</p>
        
        {/* Índice */}
        <nav className="bg-muted/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Índice</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#que-son" className="text-primary hover:underline">1. ¿Qué son las cookies?</a></li>
            <li><a href="#tipos" className="text-primary hover:underline">2. Tipos de cookies que utilizamos</a></li>
            <li><a href="#tabla" className="text-primary hover:underline">3. Cookies específicas</a></li>
            <li><a href="#consentimiento" className="text-primary hover:underline">4. Consentimiento y configuración</a></li>
            <li><a href="#navegadores" className="text-primary hover:underline">5. Configuración en navegadores</a></li>
            <li><a href="#contacto" className="text-primary hover:underline">6. Contacto</a></li>
          </ul>
        </nav>

        <section id="que-son" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">1. ¿Qué son las cookies?</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, 
              smartphone, tablet) cuando visita nuestro sitio web. Estas cookies nos permiten recordar 
              información sobre su visita y preferencias.
            </p>
            <p>
              Las cookies pueden ser <strong>propias</strong> (establecidas por {COMPANY.name}) o de 
              <strong>terceros</strong> (establecidas por otros servicios que utilizamos).
            </p>
          </div>
        </section>

        <section id="tipos" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">2. Tipos de cookies que utilizamos</h2>
          <div className="space-y-4">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-3">🔧 Cookies Técnicas/Necesarias</h3>
              <p className="mb-3">Son imprescindibles para el funcionamiento del sitio web y no pueden ser desactivadas.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Gestión de sesiones y preferencias del usuario</li>
                <li>Funcionamiento del carrito de consultas</li>
                <li>Recordar configuración de cookies</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Base legal:</strong> Interés legítimo (funcionamiento del sitio)
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-500 mb-3">📊 Cookies Analíticas</h3>
              <p className="mb-3">Nos ayudan a entender cómo los visitantes interactúan con el sitio web.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Estadísticas de uso y navegación</li>
                <li>Páginas más visitadas</li>
                <li>Tiempo de permanencia</li>
                <li>Análisis de rendimiento del sitio</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Base legal:</strong> Consentimiento del usuario<br />
                <strong>Duración:</strong> 26 meses (configurable)
              </p>
            </div>
          </div>
        </section>

        <section id="tabla" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">3. Cookies específicas</h2>
          <div className="bg-card p-6 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4">Nombre</th>
                  <th className="text-left py-2 px-4">Propósito</th>
                  <th className="text-left py-2 px-4">Duración</th>
                  <th className="text-left py-2 px-4">Titular</th>
                  <th className="text-left py-2 px-4">Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">cookie_consent</td>
                  <td className="py-2 px-4">Recordar preferencias de cookies</td>
                  <td className="py-2 px-4">6 meses</td>
                  <td className="py-2 px-4">{COMPANY.name}</td>
                  <td className="py-2 px-4">Técnica</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">session_id</td>
                  <td className="py-2 px-4">Gestión de sesión del usuario</td>
                  <td className="py-2 px-4">Sesión</td>
                  <td className="py-2 px-4">{COMPANY.name}</td>
                  <td className="py-2 px-4">Técnica</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-4 font-mono">_ga</td>
                  <td className="py-2 px-4">Analítica web (Google Analytics)</td>
                  <td className="py-2 px-4">2 años</td>
                  <td className="py-2 px-4">Google</td>
                  <td className="py-2 px-4">Analítica</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono">X</td>
                  <td className="py-2 px-4">X (pendiente de definir según implementación)</td>
                  <td className="py-2 px-4">X</td>
                  <td className="py-2 px-4">X</td>
                  <td className="py-2 px-4">X</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-muted-foreground mt-4">
              * Esta tabla se actualizará según las cookies efectivamente implementadas en el sitio web.
            </p>
          </div>
        </section>

        <section id="consentimiento" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">4. Consentimiento y configuración</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>
              Al acceder a nuestro sitio web por primera vez, aparecerá un banner informativo 
              sobre el uso de cookies donde podrá:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Aceptar todas:</strong> Autoriza el uso de todas las cookies</li>
              <li><strong>Rechazar no esenciales:</strong> Solo permite cookies técnicas necesarias</li>
              <li><strong>Configurar:</strong> Personaliza qué tipos de cookies acepta</li>
            </ul>
            <div className="mt-4 p-4 bg-primary/10 rounded border-l-4 border-primary">
              <p><strong>¿Cómo cambiar sus preferencias?</strong></p>
              <p>Puede modificar o revocar su consentimiento en cualquier momento:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Usando el enlace "Configurar cookies" en el pie de página</li>
                <li>Borrando las cookies desde la configuración de su navegador</li>
                <li>Contactando con nosotros en: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="navegadores" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">5. Configuración en navegadores</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>También puede gestionar las cookies directamente desde su navegador:</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2">Chrome</h3>
                <p className="text-sm text-muted-foreground">
                  Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Firefox</h3>
                <p className="text-sm text-muted-foreground">
                  Preferencias → Privacidad y seguridad → Cookies y datos del sitio
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Safari</h3>
                <p className="text-sm text-muted-foreground">
                  Preferencias → Privacidad → Gestionar datos de sitios web
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Edge</h3>
                <p className="text-sm text-muted-foreground">
                  Configuración → Cookies y permisos del sitio → Cookies y datos del sitio
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-500/10 rounded border-l-4 border-amber-500">
              <p><strong>Atención:</strong> Deshabilitar ciertas cookies puede afectar al funcionamiento del sitio web.</p>
            </div>
          </div>
        </section>

        <section id="contacto" className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">6. Más información y contacto</h2>
          <div className="bg-card p-6 rounded-lg space-y-4">
            <p>Para más información sobre cookies y protección de datos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Agencia Española de Protección de Datos (AEPD):</strong> 
                <a href="https://www.aepd.es/es/guias/guia-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  Guía sobre cookies
                </a>
              </li>
              <li>
                <strong>Iniciativa Europea sobre Cookies:</strong> 
                <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  aboutcookies.org
                </a>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-muted/20 rounded">
              <p><strong>Contacto para consultas sobre cookies:</strong></p>
              <p>Email: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
              <p>Teléfono: <a href={`tel:${COMPANY.phone}`} className="text-primary hover:underline">{COMPANY.phone}</a></p>
            </div>
          </div>
        </section>

        <section className="bg-muted/10 p-6 rounded-lg mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Páginas relacionadas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/politica-de-privacidad" className="text-primary hover:underline">Política de Privacidad</a>
            <a href="/terminos-y-condiciones" className="text-primary hover:underline">Términos y Condiciones</a>
            <a href="/aviso-legal" className="text-primary hover:underline">Aviso Legal</a>
          </div>
        </section>

        <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t border-border">
          <p>Última actualización: {LAST_UPDATED}</p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default PoliticaCookies;