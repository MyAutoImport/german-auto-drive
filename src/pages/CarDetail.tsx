import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Fuel, 
  Calendar, 
  Settings, 
  Gauge,
  Shield,
  Car,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Star
} from "lucide-react";

import bmwImage from "@/assets/bmw-m3.jpg";
import mercedesImage from "@/assets/mercedes-c-class.jpg";
import audiImage from "@/assets/audi-a4.jpg";

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Mock data - en una app real vendría de una API
  const carData: Record<string, {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    originalPrice: number;
    image: string;
    fuel: string;
    transmission: string;
    km: number;
    power: string;
    color: string;
    doors: number;
    seats: number;
    features: string[];
    description: string;
    specs: Record<string, string>;
    status: string;
  }> = {
    "1": {
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
      power: "510 CV",
      color: "Negro Carbono",
      doors: 4,
      seats: 5,
      features: [
        "Pack M Performance",
        "Sistema de sonido Harman Kardon",
        "Navegación BMW Live Cockpit Professional",
        "Asientos de cuero M",
        "Suspensión M adaptativa",
        "Frenos M compound",
        "Llantas M de 19\"",
        "Techo solar panorámico"
      ],
      description: "El BMW M3 Competition representa la máxima expresión de la deportividad alemana. Con su motor de 6 cilindros biturbo de 3.0 litros que desarrolla 510 CV, este sedán deportivo ofrece prestaciones excepcionales manteniendo la elegancia y practicidad de un vehículo de uso diario.",
      specs: {
        "Motor": "3.0L 6 cilindros biturbo",
        "Potencia": "510 CV / 650 Nm",
        "Aceleración": "0-100 km/h en 3.9s",
        "Velocidad máxima": "250 km/h (limitada)",
        "Consumo": "10.8L/100km (combinado)",
        "Emisiones CO2": "246 g/km",
        "Tracción": "Trasera",
        "Caja de cambios": "Automática 8 velocidades"
      },
      status: "Disponible"
    },
    "2": {
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
      power: "200 CV",
      color: "Plata Iridio",
      doors: 4,
      seats: 5,
      features: [
        "Paquete AMG Line",
        "MBUX con pantalla de 11.9\"",
        "Luces LED High Performance",
        "Parktronic con cámara 360°",
        "Asientos deportivos AMG",
        "Volante deportivo AMG",
        "Llantas AMG de 18\"",
        "Climatizador automático THERMOTRONIC"
      ],
      description: "El Mercedes-Benz Clase C 220d AMG Line combina la eficiencia del motor diésel con el diseño deportivo AMG. Este elegante sedán ofrece tecnología de vanguardia, confort superior y la calidad característica de Mercedes-Benz.",
      specs: {
        "Motor": "2.0L 4 cilindros turbodiésel",
        "Potencia": "200 CV / 440 Nm",
        "Aceleración": "0-100 km/h en 7.3s",
        "Velocidad máxima": "240 km/h",
        "Consumo": "5.4L/100km (combinado)",
        "Emisiones CO2": "142 g/km",
        "Tracción": "Trasera",
        "Caja de cambios": "9G-TRONIC automática"
      },
      status: "Disponible"
    },
    "3": {
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
      power: "190 CV",
      color: "Blanco Glaciar",
      doors: 4,
      seats: 5,
      features: [
        "Virtual Cockpit Plus de 12.3\"",
        "Quattro tracción integral",
        "Paquete S-Line exterior e interior",
        "Faros Matrix LED",
        "MMI Navigation Plus",
        "Asientos deportivos S",
        "Llantas de aleación 18\"",
        "Climatizador automático tri-zona"
      ],
      description: "El Audi A4 S-Line representa la perfecta combinación entre elegancia, tecnología y deportividad. Con tracción quattro y el refinado motor TFSI, ofrece una experiencia de conducción superior en todas las condiciones.",
      specs: {
        "Motor": "2.0L 4 cilindros TFSI",
        "Potencia": "190 CV / 320 Nm",
        "Aceleración": "0-100 km/h en 7.3s",
        "Velocidad máxima": "237 km/h",
        "Consumo": "6.9L/100km (combinado)",
        "Emisiones CO2": "157 g/km",
        "Tracción": "Quattro (integral)",
        "Caja de cambios": "S-Tronic 7 velocidades"
      },
      status: "En tránsito"
    }
  };

  const car = carData[id as string];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "¡Consulta enviada!",
        description: "Nos pondremos en contacto contigo en las próximas 24 horas.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setIsLoading(false);
    }, 1000);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Vehículo no encontrado</h1>
            <p className="text-muted-foreground mb-8">El vehículo que buscas no existe o ha sido retirado del stock.</p>
            <Link to="/stock">
              <Button>Volver al stock</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/stock" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al stock
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Car Image and Basic Info */}
            <div>
              <div className="relative mb-6">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute top-6 left-6 flex gap-3">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {car.year}
                  </Badge>
                  <Badge 
                    variant={car.status === "Disponible" ? "default" : "secondary"}
                    className={car.status === "Disponible" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {car.status}
                  </Badge>
                </div>
                <div className="absolute top-6 right-6">
                  <Badge className="bg-gradient-primary text-primary-foreground">
                    Ahorro €{(car.originalPrice - car.price).toLocaleString()}
                  </Badge>
                </div>
              </div>

              {/* Basic Specs */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="mr-3 h-5 w-5 text-primary" />
                    Especificaciones básicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Kilómetros</div>
                        <div className="font-semibold">{car.km.toLocaleString()} km</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Fuel className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Combustible</div>
                        <div className="font-semibold">{car.fuel}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Transmisión</div>
                        <div className="font-semibold">{car.transmission}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Gauge className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Potencia</div>
                        <div className="font-semibold">{car.power}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Car Details and Contact Form */}
            <div>
              {/* Car Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {car.brand} {car.model}
                </h1>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold text-primary">
                      €{car.price.toLocaleString()}
                    </div>
                    <div className="text-lg text-muted-foreground line-through">
                      €{car.originalPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-sm text-muted-foreground">Vehículo premium</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </div>

              {/* Contact Form */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-primary" />
                    Solicitar información
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Me interesa este vehículo, por favor envíenme más información..."
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
                    >
                      {isLoading ? (
                        "Enviando..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Solicitar información
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Specs */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Especificaciones técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(car.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Equipamiento incluido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {car.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warranty and Service */}
          <div className="mt-12">
            <Card className="bg-gradient-steel border-border/30">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Garantía extendida</h3>
                    <p className="text-muted-foreground">Todos nuestros vehículos incluyen garantía de 12 meses</p>
                  </div>
                  <div>
                    <Car className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Inspección completa</h3>
                    <p className="text-muted-foreground">Verificación técnica de 120 puntos antes de la entrega</p>
                  </div>
                  <div>
                    <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Soporte 24/7</h3>
                    <p className="text-muted-foreground">Atención al cliente disponible en todo momento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetail;