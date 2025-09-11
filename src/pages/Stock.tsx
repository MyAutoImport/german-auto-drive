import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Search,
  Fuel,
  Calendar,
  Settings,
  Eye,
  SlidersHorizontal,
  AlertTriangle,
} from "lucide-react";

// Imágenes fallback por si la BD no trae image_url
import bmwFallback from "@/assets/bmw-m3.jpg";
import mercFallback from "@/assets/mercedes-c-class.jpg";
import audiFallback from "@/assets/audi-a4.jpg";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  original_price?: number | null;
  image_url?: string | null;
  fuel?: string | null;
  transmission?: string | null;
  km?: number | null;
  status?: string | null;
  features?: string[] | string | null; // puede llegar como array o string
};

function normalizeFeatures(features?: string[] | string | null): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features.filter(Boolean);
  return features
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function brandFallback(brand?: string) {
  if (!brand) return mercFallback;
  const b = brand.toLowerCase();
  if (b.includes("bmw")) return bmwFallback;
  if (b.includes("audi")) return audiFallback;
  return mercFallback;
}

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch("/api/cars-list", { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items: Car[] = Array.isArray(data) ? data : data?.cars ?? [];
        if (alive) setCars(items);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Error al cargar los coches");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filteredCars = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return cars.filter((car) => {
      const matchesSearch =
        !term ||
        `${car.brand ?? ""} ${car.model ?? ""}`.toLowerCase().includes(term);

      const matchesBrand = !brandFilter || car.brand === brandFilter;

      const price = Number(car.price || 0);
      const matchesPrice =
        !priceFilter ||
        (priceFilter === "0-30k" && price <= 30000) ||
        (priceFilter === "30-50k" && price > 30000 && price <= 50000) ||
        (priceFilter === "50-70k" && price > 50000 && price <= 70000) ||
        (priceFilter === "70k+" && price > 70000);

      return matchesSearch && matchesBrand && matchesPrice;
    });
  }, [cars, searchTerm, brandFilter, priceFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-steel">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestro{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Stock
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explora nuestra selección completa de vehículos alemanes
              disponibles para importación inmediata.
            </p>
          </div>

          {/* Buscador + Botón Filtros (abre Sheet) */}
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

              {/* === Drawer / Sheet de Filtros === */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" className="flex items-center gap-2 md:w-auto">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtros
                  </Button>
                </SheetTrigger>

                {/* Panel lateral */}
                <SheetContent side="right" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>Ajusta tu búsqueda</SheetDescription>
                  </SheetHeader>

                  {/* Contenido de filtros */}
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Marca
                      </label>
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

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Precio
                      </label>
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

                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSearchTerm("");
                          setBrandFilter("");
                          setPriceFilter("");
                        }}
                      >
                        Limpiar filtros
                      </Button>
                      <Button className="flex-1">Aplicar filtros</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              {/* === /Sheet === */}
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-muted-foreground py-16">
              Cargando vehículos…
            </div>
          ) : err ? (
            <div className="flex items-center justify-center gap-2 text-red-500 py-16">
              <AlertTriangle className="h-5 w-5" />
              <span>Hubo un problema al cargar el stock. {err}</span>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Mostrando {filteredCars.length} de {cars.length} vehículos
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car) => {
                  const img =
                    car.image_url && car.image_url.trim().length > 5
                      ? car.image_url
                      : brandFallback(car.brand);

                  const original =
                    typeof car.original_price === "number"
                      ? car.original_price
                      : undefined;

                  const ahorro =
                    original && car.price ? Math.max(original - car.price, 0) : 0;

                  const features = normalizeFeatures(car.features);

                  return (
                    <Card
                      key={car.id}
                      className="overflow-hidden bg-card border-border hover:shadow-card-dark transition-all duration-300 group"
                    >
                      <div className="relative">
                        <img
                          src={img}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge variant="secondary" className="bg-background/90 text-foreground">
                            {car.year ?? "----"}
                          </Badge>
                          <Badge
                            variant={
                              car.status === "Disponible"
                                ? "default"
                                : car.status === "Reservado"
                                ? "outline"
                                : "secondary"
                            }
                            className={car.status === "Disponible" ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            {car.status ?? "Disponible"}
                          </Badge>
                        </div>
                        {ahorro > 0 && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-gradient-primary text-primary-foreground">
                              Ahorro €{ahorro.toLocaleString()}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {car.brand} {car.model}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-3xl font-bold text-primary">
                                €{Number(car.price || 0).toLocaleString()}
                              </div>
                              {original && (
                                <div className="text-sm text-muted-foreground line-through">
                                  €{original.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Car Details */}
                        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {(car.km ?? 0).toLocaleString()} km
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Fuel className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {car.fuel ?? "—"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {car.transmission ?? "—"}
                            </span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{features.length - 3} más
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
                  );
                })}
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stock;
