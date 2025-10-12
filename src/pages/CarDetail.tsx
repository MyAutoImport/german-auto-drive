import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EquipmentPanel from "@/components/EquipmentPanel";
import SpecsSection from "@/components/SpecsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Car, CarRow, toUiCar } from "@/lib/api";
import { calcSavings, EUR0 } from "@/lib/money";
import { getStatusVariant, getStatusClassName } from "@/lib/utils";
import { submitLead } from "@/lib/lead";
import { toCarSlug } from "@/lib/slug";
import {
  ArrowLeft, Fuel, Calendar, Settings, Gauge, Shield,
  Car as CarIcon, Phone, Mail, Send, Star,
  AlertTriangle, ChevronLeft, ChevronRight,
} from "lucide-react";

import bmwFallback from "@/assets/bmw-m3.jpg";
import mercFallback from "@/assets/mercedes-c-class.jpg";
import audiFallback from "@/assets/audi-a4.jpg";

function normalizeFeatures(features?: string[] | string | null): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features.filter(Boolean);
  return features.split(",").map(s => s.trim()).filter(Boolean);
}
function brandFallback(brand?: string) {
  if (!brand) return mercFallback;
  const b = brand.toLowerCase();
  if (b.includes("bmw")) return bmwFallback;
  if (b.includes("audi")) return audiFallback;
  return mercFallback;
}

/** Normaliza image_url a array de URLs (tolerante a JSON string, comas, saltos de línea, etc.) */
function toImageArray(v: unknown, fallback: string): string[] {
  if (Array.isArray(v)) {
    const arr = (v as unknown[]).map(String).map(s => s.trim()).filter(Boolean);
    return arr.length ? arr : [fallback];
  }
  if (typeof v === "string") {
    const s = v.trim();
    if (s.startsWith("[") && s.endsWith("]")) {
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) {
          const arr = parsed.map(String).map(x => x.trim()).filter(Boolean);
          if (arr.length) return arr;
        }
      } catch { /* seguimos */ }
    }
    const urls = s.match(/https?:\/\/[^\s"'\\\],)]+/g) ?? [];
    if (urls.length) return urls;
    const parts = s.split(",").map(x => x.replace(/^"|"$/g, "").trim()).filter(Boolean);
    if (parts.length) return parts;
  }
  return [fallback];
}

const CarDetail = () => {
  const { param } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Determine if param is numeric (ID) or slug
  const isNumericId = param && /^\d+$/.test(param);
  const carId = isNumericId ? Number(param) : null;
  const carSlug = !isNumericId ? param : null;

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  // estado del carrusel (hook debe ir antes de cualquier return)
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!param) return;
    
    let alive = true;
    (async () => {
      try {
        setLoading(true); 
        setErr(null);
        setCar(null);
        
        const res = await fetch(`/api/car-detail?idOrSlug=${encodeURIComponent(param)}`);
        const data = await res.json();
        
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Coche no encontrado");
          }
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        
        // Handle redirect response from API
        if (data.redirect) {
          navigate(data.redirect, { replace: true });
          return;
        }
        
        if (alive) {
          const carData: Car = toUiCar(data);
          setCar(carData);
        }
      } catch (e: any) {
        if (alive) setErr(e?.message || "Error al cargar el coche");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    
    return () => { alive = false; };
  }, [param, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const form = new FormData(e.currentTarget as HTMLFormElement);
      const payload = {
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        phone: String(form.get('phone') || ''),
        message: String(form.get('message') || '') || `Interesado en ${car?.brand} ${car?.model}`,
        source: `car/${car?.id}`,
      };
      
      await submitLead(payload);
      toast({ title: "¡Consulta enviada!", description: "Nos pondremos en contacto contigo en las próximas 24 horas." });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error('Error submitting lead:', err);
      toast({ 
        title: "Error al enviar consulta", 
        description: (err as Error)?.message || "Ha ocurrido un error. Por favor, inténtalo de nuevo.", 
        variant: "destructive" 
      });
    } finally { 
      setIsSending(false); 
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center text-muted-foreground">Cargando vehículo…</div>
        <Footer />
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16 flex items-center justify-center gap-2 text-red-500">
          <AlertTriangle className="h-5 w-5" />
          <span>Hubo un problema al cargar el vehículo. {err}</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Vehículo no encontrado</h1>
            <p className="text-muted-foreground mb-8">El vehículo que buscas no existe o ha sido retirado del stock.</p>
            <Link to="/stock"><Button>Volver al stock</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // IMÁGENES
  const fallbackImg = brandFallback(car.brand);
  const images = toImageArray(car.imageUrl as any, fallbackImg);
  const safeIdx = Math.min(Math.max(idx, 0), images.length - 1);
  const currentImg = images[safeIdx];
  const goPrev = () => setIdx(i => (i <= 0 ? images.length - 1 : i - 1));
  const goNext = () => setIdx(i => (i >= images.length - 1 ? 0 : i + 1));

  const { amount } = calcSavings(car.oldPrice, car.price);
  const showSaving = amount > 0;
  const features = car.features ?? [];

  // Use existing specs or create basic ones from individual fields
  const specs: Record<string, string> = {};
  if (car.specs && Object.keys(car.specs).length > 0) {
    // Use existing specs from database
    Object.entries(car.specs).forEach(([key, value]) => {
      specs[key] = String(value);
    });
  } else {
    // Create basic specs from individual fields
    if (car.fuel) specs.Motor = car.fuel;
    if (car.powerCv) specs["Potencia (CV)"] = `${car.powerCv} CV`;
    if (car.km) specs.Kilómetros = `${car.km.toLocaleString()} km`;
    if (car.transmission) specs.Transmisión = car.transmission;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/stock" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al stock
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="relative mb-6">
                <img src={currentImg} alt={`${car.brand} ${car.model}`} className="w-full h-96 object-cover rounded-2xl" />
                <div className="absolute top-6 left-6 flex gap-3">
                  {car.year && <Badge variant="secondary" className="bg-background/90 text-foreground">{car.year}</Badge>}
                  <Badge variant={getStatusVariant(car.status)} className={getStatusClassName(car.status)}>
                    {car.status ?? "Disponible"}
                  </Badge>
                </div>
                {showSaving && (
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-gradient-primary text-primary-foreground">Ahorro {EUR0.format(amount)}</Badge>
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button type="button" onClick={goPrev} aria-label="Anterior" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 p-2 text-white">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button type="button" onClick={goNext} aria-label="Siguiente" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 p-2 text-white">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIdx(i)}
                          aria-label={`Ir a imagen ${i + 1}`}
                          className={`h-2.5 w-2.5 rounded-full ${i === safeIdx ? "bg-white" : "bg-white/50 hover:bg-white/70"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <Card className="bg-card border-border">
                <CardHeader><CardTitle className="flex items-center"><CarIcon className="mr-3 h-5 w-5 text-primary" />Especificaciones básicas</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div><div className="text-sm text-muted-foreground">Kilómetros</div><div className="font-semibold">{car.km ? `${car.km.toLocaleString()} km` : "—"}</div></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Fuel className="h-5 w-5 text-muted-foreground" />
                      <div><div className="text-sm text-muted-foreground">Combustible</div><div className="font-semibold">{car.fuel ?? "—"}</div></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      <div><div className="text-sm text-muted-foreground">Transmisión</div><div className="font-semibold">{car.transmission ?? "—"}</div></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Gauge className="h-5 w-5 text-muted-foreground" />
                      <div><div className="text-sm text-muted-foreground">Potencia (CV)</div><div className="font-semibold">{car.powerCv ? `${car.powerCv} CV` : "—"}</div></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">{car.brand} {car.model}</h1>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold text-primary">€{(car.price ?? 0).toLocaleString()}</div>
                    {showSaving && <div className="text-lg text-muted-foreground line-through">{EUR0.format(car.oldPrice)}</div>}
                  </div>
                  {car.badges.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="text-sm text-muted-foreground">{car.badges[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {car.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Descripción</h3>
                  <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                </div>
              )}

              <Card className="bg-card border-border">
                <CardHeader><CardTitle className="flex items-center"><Mail className="mr-3 h-5 w-5 text-primary" />Solicitar información</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Me interesa este vehículo, por favor envíenme más información..." className="resize-none" rows={3} />
                    </div>
                    <Button type="submit" disabled={isSending} className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground">
                      {isSending ? "Enviando..." : (<><Send className="mr-2 h-4 w-4" />Solicitar información</>)}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <section aria-label="Detalles del vehículo" className="mt-16 flex flex-col gap-6">
            <EquipmentPanel equipment={car.equipment} features={features} />
            <SpecsSection car={car} collapsible />
          </section>

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
                    <CarIcon className="h-12 w-12 text-primary mx-auto mb-4" />
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
