import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Fuel, Calendar, Settings, Eye } from "lucide-react";
import { Link } from "react-router-dom";

import bmwImage from "@/assets/bmw-m3.jpg";
import mercedesImage from "@/assets/mercedes-c-class.jpg";
import audiImage from "@/assets/audi-a4.jpg";

const CarPreview = () => {
  const featuredCars = [
    {
      id: 1,
      brand: "BMW",
      model: "M3 Competition",
      year: 2022,
      price: 65000,
      originalPrice: 75000,
      image: bmwImage,
      fuel: "Gasolina",
      transmission: "Automático",
      km: 25000,
      features: ["Pack M", "Harman Kardon", "Navegación", "Cuero"]
    },
    {
      id: 2,
      brand: "Mercedes-Benz",
      model: "C 220d AMG",
      year: 2023,
      price: 42000,
      originalPrice: 52000,
      image: mercedesImage,
      fuel: "Diésel",
      transmission: "Automático",
      km: 18000,
      features: ["AMG Line", "MBUX", "LED", "Parktronic"]
    },
    {
      id: 3,
      brand: "Audi",
      model: "A4 S-Line",
      year: 2022,
      price: 38000,
      originalPrice: 45000,
      image: audiImage,
      fuel: "Gasolina",
      transmission: "S-Tronic",
      km: 22000,
      features: ["Virtual Cockpit", "Quattro", "S-Line", "Matrix LED"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Vehículos
            <span className="bg-gradient-primary bg-clip-text text-transparent"> destacados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Una selección de los mejores vehículos alemanes disponibles para importación inmediata.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden bg-card border-border hover:shadow-card-dark transition-all duration-300 group">
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {car.year}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-primary text-primary-foreground">
                    Ahorro €{(car.originalPrice - car.price).toLocaleString()}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {car.brand} {car.model}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-primary">
                        €{car.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground line-through">
                        €{car.originalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Car Details */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{car.km.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{car.fuel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{car.transmission}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {car.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link to={`/coche/${car.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalles
                    </Button>
                  </Link>
                  <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
                    Consultar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/stock">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-premium">
              Ver todo el stock
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CarPreview;