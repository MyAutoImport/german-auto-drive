import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-cars.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Coches alemanes premium"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-dark opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* ↑ Añadimos padding-top para separar del header */}
        <div className="max-w-4xl mx-auto pt-28 md:pt-36 lg:pt-44">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">Especialistas en importación alemana</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Importamos tu
            <span className="bg-gradient-primary bg-clip-text text-transparent"> coche alemán</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Encuentra el vehículo perfecto en Alemania. Nos encargamos de todo el proceso de importación 
            para que solo tengas que disfrutar de tu nuevo coche.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "Precios más bajos",
              "Mayor variedad",
              "Gestión completa",
              "Garantía incluida"
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/stock">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-premium">
                Ver Stock Disponible
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-border hover:bg-secondary">
              Solicitar Cotización
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/20">
            {[
              { number: "500+", label: "Coches importados" },
              { number: "98%", label: "Clientes satisfechos" },
              { number: "15", label: "Años de experiencia" },
              { number: "24/7", label: "Atención al cliente" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
