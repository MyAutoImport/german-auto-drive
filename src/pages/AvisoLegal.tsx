import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AvisoLegal = () => {
  useEffect(() => {
    document.title = "Aviso Legal | MyAutoImport";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Aviso Legal de MyAutoImport. Información legal sobre el titular, condiciones de uso y propiedad intelectual del sitio web.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="page-with-header-gap container mx-auto max-w-3xl px-4 pb-16 space-y-6 text-gray-200">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8">Aviso Legal</h1>
        
        <section id="identificacion" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Identificación del titular</h2>
          <p>
            <strong>Denominación social:</strong> MyAutoImport (pendiente de completar razón social y NIF)
          </p>
          <p>
            <strong>Domicilio social:</strong> Calle Principal 123, 28001 Madrid, España
          </p>
          <p>
            <strong>Email:</strong> info.myautoimport@gmail.com<br />
            <strong>Teléfono:</strong> +34 641 338 743
          </p>
        </section>

        <section id="condiciones-uso" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Condiciones de uso del sitio web</h2>
          <p>
            El acceso y uso de este sitio web implica la aceptación plena de las presentes 
            condiciones de uso. Si no está de acuerdo con alguna de ellas, debe abstenerse 
            de utilizar este sitio.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>El usuario se compromete a hacer un uso correcto del sitio web</li>
            <li>Queda prohibido el uso del sitio para actividades ilícitas o lesivas</li>
            <li>No está permitido introducir virus o código malicioso</li>
            <li>Está prohibido intentar acceder a áreas restringidas del sistema</li>
          </ul>
        </section>

        <section id="enlaces-terceros" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Enlaces de terceros</h2>
          <p>
            Este sitio web puede contener enlaces a sitios web de terceros. MyAutoImport 
            no tiene control sobre estos sitios y no se hace responsable de su contenido, 
            política de privacidad o prácticas.
          </p>
          <p>
            La inclusión de enlaces no implica endorsement o aprobación del contenido 
            enlazado por parte de MyAutoImport.
          </p>
        </section>

        <section id="exencion-responsabilidad" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Exención de responsabilidad</h2>
          <p>
            MyAutoImport se esfuerza por mantener la información del sitio web actualizada 
            y libre de errores, pero no puede garantizar la exactitud, actualidad o 
            completitud de toda la información.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No se garantiza la disponibilidad continua del sitio web</li>
            <li>Los precios y disponibilidad están sujetos a cambios sin previo aviso</li>
            <li>Las imágenes de vehículos pueden no corresponder exactamente al stock actual</li>
            <li>Se excluye la responsabilidad por daños derivados del uso del sitio</li>
          </ul>
        </section>

        <section id="propiedad-intelectual-legal" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Propiedad intelectual e industrial</h2>
          <p>
            Todos los elementos del sitio web, incluyendo pero no limitado a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Textos, gráficos, imágenes, iconos y fotografías</li>
            <li>Código fuente, estructura, navegación y diseño</li>
            <li>Marcas, nombres comerciales y signos distintivos</li>
            <li>Cualquier otro elemento susceptible de protección</li>
          </ul>
          <p>
            Son propiedad exclusiva de MyAutoImport o de sus licenciantes, y están 
            protegidos por las leyes españolas e internacionales sobre propiedad 
            intelectual e industrial.
          </p>
        </section>

        <section id="modificaciones" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Modificaciones</h2>
          <p>
            MyAutoImport se reserva el derecho de modificar, en cualquier momento 
            y sin previo aviso, las condiciones de uso del sitio web, así como 
            su diseño, contenidos y funcionalidades.
          </p>
          <p>
            Las modificaciones entrarán en vigor desde el momento de su publicación 
            en el sitio web.
          </p>
        </section>

        <section id="legislacion" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Legislación aplicable y jurisdicción</h2>
          <p>
            Las presentes condiciones de uso se rigen por la legislación española. 
            Para cualquier controversia que pudiera derivarse del acceso o uso de 
            este sitio web, las partes se someten expresamente a los Juzgados y 
            Tribunales de Madrid.
          </p>
        </section>

        <section id="contacto-legal" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Información de contacto</h2>
          <p>
            Para cualquier consulta relacionada con este aviso legal o el uso 
            del sitio web, puede ponerse en contacto con nosotros a través de:
          </p>
          <p>
            <strong>Email:</strong> info.myautoimport@gmail.com<br />
            <strong>Teléfono:</strong> +34 641 338 743<br />
            <strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 18:00
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AvisoLegal;