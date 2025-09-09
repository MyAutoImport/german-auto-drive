import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  FileCheck, 
  Truck, 
  Shield, 
  Euro, 
  Clock,
  Users,
  Award
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Search,
      title: "Búsqueda personalizada",
      description: "Encontramos el vehículo exacto que buscas en el mercado alemán con las mejores condiciones."
    },
    {
      icon: FileCheck,
      title: "Gestión documental",
      description: "Nos encargamos de toda la documentación, registros y trámites necesarios para la importación."
    },
    {
      icon: Truck,
      title: "Transporte seguro",
      description: "Transporte especializado desde Alemania hasta tu ubicación con seguro completo incluido."
    },
    {
      icon: Shield,
      title: "Garantía extendida",
      description: "Todos nuestros vehículos incluyen garantía y verificación técnica completa."
    }
  ];

  const advantages = [
    {
      icon: Euro,
      title: "Ahorro significativo",
      description: "Hasta 30% menos que el precio en España"
    },
    {
      icon: Clock,
      title: "Proceso rápido",
      description: "15-20 días desde la compra hasta entrega"
    },
    {
      icon: Users,
      title: "Equipo experto",
      description: "15 años de experiencia en importación"
    },
    {
      icon: Award,
      title: "Calidad garantizada",
      description: "Vehículos verificados y certificados"
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-gradient-steel">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Cómo funciona nuestro
            <span className="bg-gradient-primary bg-clip-text text-transparent"> servicio</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un proceso simple y transparente que te permitirá obtener tu coche alemán sin complicaciones.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={service.title} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 shadow-card-dark">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">{index + 1}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advantages */}
        <div className="bg-card/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/30">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            ¿Por qué importar desde Alemania?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-xl mb-4">
                  <advantage.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h4>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;