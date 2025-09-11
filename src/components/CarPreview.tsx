import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Fuel, Settings, Eye, AlertTriangle } from "lucide-react";

// Fallbacks por marca (por si falta image_url en BD)
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
  km?: number | null;
  fuel?: string | null;
  transmission?: string | null;
  status?: string | null;
  created_at?: string | null;
  features?: string[] | string | null;
};

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

  // 3 más “recientes” (por created_at si existe; si no, por id desc)
  const top3 = useMemo(() => {
    const sorted = [...cars].sort((a, b) => {
      const aKey = a.created_at ? Date.parse(a.created_at) : a.id ?? 0;
      const bKey = b.created_at ? Date.parse(b.created_at) : b.id ?? 0;
      return bKey - aKey;
    });
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
          <p className="text-muted-foreground mt-2">
            Los últimos vehículos añadidos.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-16">
            Cargando vehículos…
          </div>
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
                const img =
                  car.image_url && car.image_url.trim().length > 5
                    ? car.image_url
                    : brandFallback(car.brand);
                const original =
                  typeof car.original_price === "number" ? car.original_price : undefined;
                const ahorro =
                  original && car.price ? Math.max(original - car.price, 0) : 0;

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
                          className={
                            car.status === "Disponible" ? "bg-green-600 hover:bg-green-700" : ""
                          }
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

                      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {(car.km ?? 0).toLocaleString()} km
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
                        <Link to={`/coche/${car.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </Button>
                        </Link>
                        <Link to="/stock" className="flex-1">
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
              <Link to="/stock">
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
