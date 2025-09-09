import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Fuel, 
  Calendar, 
  Settings, 
  Eye, 
  SlidersHorizontal 
} from "lucide-react";
import { Link } from "react-router-dom";

import bmwImage from "@/assets/bmw-m3.jpg";
import mercedesImage from "@/assets/mercedes-c-class.jpg";
import audiImage from "@/assets/audi-a4.jpg";

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const allCars = [
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
      features: ["Pack M", "Harman Kardon", "Navegación", "Cuero"],
      status: "Disponible"
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
      features: ["AMG Line", "MBUX", "LED", "Parktronic"],
      status: "Disponible"
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
      features: ["Virtual Cockpit", "Quattro", "S-Line", "Matrix LED"],
      status: "En tránsito"
    },
    {
      id: 4,
      brand: "BMW",
      model: "X5 xDrive30d",
      year: 2023,
      price: 58000,
      originalPrice: 68000,
      image: bmwImage,
      fuel: "Diésel",
      transmission: "Automático",
      km: 15000,
      features: ["xDrive", "Harman Kardon", "Techo panorámico", "Asientos ventilados"],
      status: "Disponible"
    },
    {
      id: 5,
      brand: "Mercedes-Benz",
      model: "E 350d 4MATIC",
      year: 2022,
      price: 48000,
      originalPrice: 58000,
      image: mercedesImage,
      fuel: "Diésel",
      transmission: "9G-Tronic",
      km: 28000,
      features: ["4MATIC", "Burmester", "Air Body Control", "MBUX"],
      status: "Disponible"
    },
    {
      id: 6,
      brand: "Audi",
      model: "Q7 55 TFSI",
      year: 2023,
      price: 72000,
      originalPrice: 85000,
      image: audiImage,
      fuel: "Gasolina",
      transmission: "Tiptronic",
      km: 12000,
      features: ["Quattro", "Virtual Cockpit Plus", "B&O", "Air suspension"],
      status: "Reservado"
    }
  ];

  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = !brandFilter || car.brand === brandFilter;
    const matchesPrice = !priceFilter || 
      (priceFilter === "0-30k" && car.price <= 30000) ||
      (priceFilter === "30-50k" && car.price > 30000 && car.price <= 50000) ||
      (priceFilter === "50-70k" && car.price > 50000 && car.price <= 70000) ||
      (priceFilter === "70k+" && car.price > 70000);
    
    return matchesSearch && matchesBrand && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-steel">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestro <span className="bg-gradient-primary bg-clip-text text-transparent">Stock</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explora nuestra selección completa de vehículos alemanes disponibles para importación inmediata.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por marca o modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-border/50">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Marca</label>
                    <Select value={brandFilter} onValueChange={setBrandFilter}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Todas las marcas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas las marcas</SelectItem>
                        <SelectItem value="BMW">BMW</SelectItem>
                        <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                        <SelectItem value="Audi">Audi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Precio</label>
                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Todos los precios" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos los precios</SelectItem>
                        <SelectItem value="0-30k">Hasta €30,000</SelectItem>
                        <SelectItem value="30-50k">€30,000 - €50,000</SelectItem>
                        <SelectItem value="50-70k">€50,000 - €70,000</SelectItem>
                        <SelectItem value="70k+">Más de €70,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setBrandFilter("");
                        setPriceFilter("");
                      }}
                      className="w-full"
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Mostrando {filteredCars.length} de {allCars.length} vehículos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden bg-card border-border hover:shadow-card-dark transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {car.year}
                    </Badge>
                    <Badge 
                      variant={car.status === "Disponible" ? "default" : car.status === "En tránsito" ? "secondary" : "outline"}
                      className={car.status === "Disponible" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {car.status}
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
                    {car.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {car.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{car.features.length - 3} más
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link to={`/coche/${car.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </Button>
                    </Link>
                    <Button 
                      className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                      disabled={car.status === "Reservado"}
                    >
                      {car.status === "Reservado" ? "Reservado" : "Consultar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-4">
                No se encontraron vehículos con los filtros aplicados
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setBrandFilter("");
                  setPriceFilter("");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stock;