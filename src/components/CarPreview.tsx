import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Fuel, Settings, Eye, AlertTriangle } from "lucide-react";
import { Car, CarRow, toUiCar } from "@/lib/api";
import { calcSavings, EUR0 } from "@/lib/money";
import { getStatusVariant, getStatusClassName } from "@/lib/utils";
import { toCarSlug } from "@/lib/slug";
import { normalizeImages } from "@/lib/normalizeImages";

// Fallbacks por marca (por si falta image_url en BD)
import bmwFallback from "@/assets/bmw-m3.jpg";
import mercFallback from "@/assets/mercedes-c-class.jpg";
import audiFallback from "@/assets/audi-a4.jpg";

function brandFallback(brand?: string) {
  if (!brand) return mercFallback;
  const b = brand.toLowerCase();
  if (b.includes("bmw")) return bmwFallback;
  if (b.includes("audi")) return audiFallback;
  return mercFallback;
}

export default function CarPreview() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch("/api/cars-list");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rawItems: CarRow[] = Array.isArray(data) ? data : data?.cars ?? [];
        const items: Car[] = rawItems.map(toUiCar);
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

  // Subir arriba tras navegar a cualquier ruta (detalle, etc.)
  const scrollTopAfterNav = () => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  // Subir arriba al ir a /stock (y si ya estás en /stock, evita re-navegar)
  const handleGoStock = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const alreadyInStock = window.location.pathname === "/stock";
    if (alreadyInStock) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
    }
  };

  // 3 más recientes (por id desc)
  const top3 = useMemo(() => {
    const sorted = [...cars].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    return sorted.slice(0, 3);
  }, [cars]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Un vistazo a nuestro{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">stock</span>
          </h2>
          <p className="text-muted-foreground mt-2">Los últimos vehículos añadidos.</p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-16">Cargando vehículos…</div>
        ) : err ? (
          <div className="flex items-center justify-center gap-2 text-red-500 py-16">
            <AlertTriangle className="h-5 w-5" />
            <span>Hubo un problema al cargar el preview. {err}</span>
          </div>
        ) : top3.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            Aún no hay vehículos en el stock.
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {top3.map((car) => {
                const images = normalizeImages(car.imageUrl);
                const img = images.length > 0 ? images[0] : brandFallback(car.brand);
                const { amount } = calcSavings(car.oldPrice, car.price);
                const showSaving = amount > 0;

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
                        {car.year && (
                          <Badge variant="secondary" className="bg-background/90 text-foreground">
                            {car.year}
                          </Badge>
                        )}
                        <Badge
                          variant={getStatusVariant(car.status)}
                          className={getStatusClassName(car.status)}
                        >
                          {car.status ?? "Disponible"}
                        </Badge>
                      </div>
                      {showSaving && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-primary text-primary-foreground">
                            Ahorro {EUR0.format(amount)}
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
                              €{(car.price ?? 0).toLocaleString()}
                            </div>
                            {showSaving && (
                              <div className="text-sm text-muted-foreground line-through">
                                {EUR0.format(car.oldPrice)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {car.km ? `${car.km.toLocaleString()} km` : "—"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Fuel className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{car.fuel ?? "—"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{car.transmission ?? "—"}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {/* Ver detalles: navega + scroll top */}
                        <Link
                          to={`/coche/${car.slug || toCarSlug(car.brand, car.model)}`}
                          className="flex-1"
                          onClick={scrollTopAfterNav}
                          aria-label={`Ver detalles de ${car.brand} ${car.model}`}
                        >
                          <Button variant="outline" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </Button>
                        </Link>

                        {/* Ver stock: navega + scroll top (o solo scroll si ya estás en /stock) */}
                        <Link to="/stock" onClick={handleGoStock} className="flex-1" aria-label="Ver stock">
                          <Button className="w-full bg-gradient-primary text-primary-foreground">
                            Ver stock
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA global: Ver TODO el stock */}
            <div className="mt-10 flex justify-center">
              <Link to="/stock" onClick={handleGoStock} aria-label="Ver todo el stock">
                <Button className="px-6 bg-gradient-primary text-primary-foreground">
                  Ver todo el stock
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
