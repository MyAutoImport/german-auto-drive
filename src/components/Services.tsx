import { ShieldCheck, Car, Wrench, Timer, Globe, Handshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Compra segura",
    desc: "Transparencia total, historial verificado y garantía incluida en todos los vehículos.",
  },
  {
    icon: Globe,
    title: "Importación desde Alemania",
    desc: "Nos encargamos de la búsqueda, negociación, trámites y transporte puerta a puerta.",
  },
  {
    icon: Car,
    title: "Modelos premium",
    desc: "Stock curado de BMW, Mercedes y Audi con el mejor estado y kilometraje.",
  },
  {
    icon: Wrench,
    title: "Inspección técnica",
    desc: "Revisión de 120 puntos y mantenimiento al día antes de la entrega.",
  },
  {
    icon: Timer,
    title: "Proceso ágil",
    desc: "Plazos claros y comunicación constante durante todo el proceso.",
  },
  {
    icon: Handshake,
    title: "Asesoría integral",
    desc: "Te ayudamos a elegir el coche ideal según tu presupuesto y necesidades.",
  },
];

const Services = () => {
  return (
    <section
      aria-labelledby="servicios-heading"
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <header className="text-center max-w-3xl mx-auto mb-14">
          <h2
            id="servicios-heading"
            className="text-4xl md:text-5xl font-bold text-foreground"
          >
            Servicios que <span className="bg-gradient-primary bg-clip-text text-transparent">te facilitan</span> la compra
          </h2>
          <p className="text-muted-foreground mt-4">
            Nos ocupamos de todo para que disfrutes de tu coche sin complicaciones.
          </p>
        </header>

        <div
          role="list"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              role="listitem"
              aria-label={title}
              className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm focus-within:ring-2 focus-within:ring-primary"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/40"
                >
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                  <p className="text-muted-foreground mt-2">{desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
