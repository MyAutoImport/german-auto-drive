import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaPrivacidad = () => {
  useEffect(() => {
    document.title = "Política de Privacidad | MyAutoImport";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Política de Privacidad de MyAutoImport. Información sobre el tratamiento de datos personales y derechos del usuario.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-12 space-y-6 text-gray-200">
        <h1 className="text-3xl font-semibold text-foreground mb-8">Política de Privacidad</h1>
        
        <section id="responsable" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Responsable del tratamiento</h2>
          <p>
            <strong>Responsable:</strong> MyAutoImport (rellenar datos sociales cuando estén disponibles).
          </p>
          <p>
            <strong>Contacto:</strong> info.myautoimport@gmail.com
          </p>
        </section>

        <section id="finalidades" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Finalidades del tratamiento</h2>
          <p>Los datos personales que nos proporcione serán tratados con las siguientes finalidades:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gestionar solicitudes de información y presupuestos</li>
            <li>Contacto comercial y seguimiento de consultas</li>
            <li>Analítica web para mejorar nuestros servicios</li>
            <li>Medidas de seguridad y prevención de fraude</li>
          </ul>
        </section>

        <section id="base-juridica" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Base jurídica</h2>
          <p>El tratamiento de sus datos se basa en:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consentimiento del interesado para el envío de comunicaciones</li>
            <li>Ejecución de medidas precontractuales solicitadas por el usuario</li>
            <li>Interés legítimo en la seguridad y prevención de fraude</li>
          </ul>
        </section>

        <section id="conservacion" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Conservación de datos</h2>
          <p>
            Sus datos serán conservados mientras dure la relación comercial y el tiempo necesario 
            para cumplir con las obligaciones legales aplicables.
          </p>
        </section>

        <section id="destinatarios" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Destinatarios</h2>
          <p>
            Sus datos podrán ser comunicados a proveedores de servicios (hosting, email, analítica) 
            que actúan como encargados del tratamiento bajo contrato que garantiza la confidencialidad 
            y seguridad de la información.
          </p>
        </section>

        <section id="derechos" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Derechos del usuario</h2>
          <p>Puede ejercer los siguientes derechos:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acceso a sus datos personales</li>
            <li>Rectificación de datos inexactos</li>
            <li>Supresión de sus datos</li>
            <li>Oposición al tratamiento</li>
            <li>Limitación del tratamiento</li>
            <li>Portabilidad de sus datos</li>
          </ul>
          <p>
            <strong>Contacto para ejercer derechos:</strong> info.myautoimport@gmail.com
          </p>
        </section>

        <section id="transferencias" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Transferencias internacionales</h2>
          <p>
            Solo se realizarán transferencias internacionales cuando sea requerido por el proveedor 
            de servicios, garantizando en todo caso las medidas de seguridad adecuadas mediante 
            Cláusulas Contractuales Tipo (SCC) o países con decisión de adecuación del Espacio 
            Económico Europeo.
          </p>
        </section>

        <section id="cookies" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Cookies</h2>
          <p>
            Para información sobre el uso de cookies, consulte nuestra Política de Cookies 
            (disponible cuando esté implementada).
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidad;