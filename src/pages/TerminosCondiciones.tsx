import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TerminosCondiciones = () => {
  useEffect(() => {
    document.title = "Términos y Condiciones | MyAutoImport";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Términos y Condiciones de uso de MyAutoImport. Condiciones generales para nuestros servicios de importación de vehículos.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="page-with-header-gap container mx-auto max-w-3xl px-4 pb-16 space-y-6 text-gray-200">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8">Términos y Condiciones</h1>
        
        <section id="objeto" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Objeto del sitio y servicios</h2>
          <p>
            MyAutoImport es una empresa especializada en la importación de vehículos alemanes, 
            ofreciendo servicios de gestión integral para la adquisición de automóviles 
            premium desde Alemania.
          </p>
          <p>
            Nuestros servicios incluyen la búsqueda, evaluación, compra, gestión documental 
            y transporte de vehículos seleccionados según las especificaciones del cliente.
          </p>
        </section>

        <section id="proceso" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Proceso de solicitud y condiciones generales</h2>
          <p>
            El proceso de importación se inicia con una consulta por parte del cliente, 
            seguida de una búsqueda personalizada y la presentación de opciones disponibles.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Las consultas de información son gratuitas y sin compromiso</li>
            <li>Los presupuestos se proporcionan según disponibilidad del mercado alemán</li>
            <li>El proceso de importación requiere la firma de un contrato específico</li>
            <li>Los plazos de entrega son estimados y pueden variar según el vehículo</li>
          </ul>
        </section>

        <section id="precios" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Precios y ofertas</h2>
          <p>
            Los precios mostrados en el sitio web son orientativos y están sujetos a 
            disponibilidad del mercado alemán. Las ofertas no son vinculantes hasta 
            la confirmación escrita por parte de MyAutoImport.
          </p>
          <p>
            Los precios finales incluyen todos los gastos de importación, gestión 
            documental e IVA, salvo que se indique lo contrario de forma expresa.
          </p>
        </section>

        <section id="cancelaciones" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Cancelaciones y modificaciones</h2>
          <p>
            Las condiciones de cancelación y modificación se especificarán en el 
            contrato particular de cada importación.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Las consultas pueden cancelarse en cualquier momento sin coste</li>
            <li>Las modificaciones de pedidos confirmados pueden conllevar gastos adicionales</li>
            <li>La cancelación de importaciones en curso se regirá por las condiciones contractuales</li>
          </ul>
        </section>

        <section id="responsabilidad" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Responsabilidad</h2>
          <p>
            MyAutoImport actúa como intermediario en el proceso de importación, 
            gestionando todos los aspectos logísticos y documentales necesarios.
          </p>
          <p>
            Nuestra responsabilidad se limita a los servicios contratados, excluyendo 
            daños indirectos o lucro cesante, salvo dolo o negligencia grave.
          </p>
        </section>

        <section id="propiedad-intelectual" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Propiedad intelectual</h2>
          <p>
            Todos los contenidos del sitio web, incluyendo textos, imágenes, diseños y código, 
            son propiedad de MyAutoImport y están protegidos por las leyes de propiedad 
            intelectual e industrial.
          </p>
          <p>
            Queda prohibida la reproducción, distribución o comunicación pública sin 
            autorización expresa.
          </p>
        </section>

        <section id="ley-aplicable" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Ley aplicable y jurisdicción</h2>
          <p>
            Estos términos y condiciones se rigen por la legislación española. 
            Para la resolución de cualquier controversia, las partes se someten 
            a los juzgados y tribunales de Madrid, renunciando expresamente a 
            cualquier otro fuero que pudiera corresponderles.
          </p>
        </section>

        <section id="contacto-terminos" className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Contacto</h2>
          <p>
            Para cualquier consulta relacionada con estos términos y condiciones, 
            puede contactarnos en:
          </p>
          <p>
            <strong>Email:</strong> info.myautoimport@gmail.com<br />
            <strong>Teléfono:</strong> +34 641 338 743
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TerminosCondiciones;