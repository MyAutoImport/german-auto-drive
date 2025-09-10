import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Car, Phone, Mail, MapPin } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carType: "",
    budget: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Enviamos al endpoint /api/contact (Resend + Supabase)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle_type: formData.carType,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      toast({
        title: "¡Consulta enviada!",
        description: "Nos pondremos en contacto contigo en las próximas 24 horas.",
      });

      // Limpiamos el formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        carType: "",
        budget: "",
        message: "",
      });
    } catch (err: any) {
      toast({
        title: "No se pudo enviar",
        description: err?.message || "Inténtalo de nuevo en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-steel">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Listo para encontrar tu
            <span className="bg-gradient-primary bg-clip-text text-transparent"> coche ideal</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cuéntanos qué buscas y te ayudaremos a encontrar el vehículo perfecto en el mercado alemán.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <Car className="mr-3 h-6 w-6 text-primary" />
                Solicita tu cotización
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      name="full_name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carType">Tipo de vehículo</Label>
                    <Select
                      value={formData.carType}
                      onValueChange={(value) => handleChange("carType", value)}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedán</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="coupe">Coupé / Deportivo</SelectItem>
                        <SelectItem value="station">Familiar</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto aproximado</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => handleChange("budget", value)}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Selecciona un rango" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20-30k">€20,000 - €30,000</SelectItem>
                        <SelectItem value="30-50k">€30,000 - €50,000</SelectItem>
                        <SelectItem value="50-70k">€50,000 - €70,000</SelectItem>
                        <SelectItem value="70k+">€70,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje (opcional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Cuéntanos más detalles sobre lo que buscas..."
                    className="bg-background/50 min-h-[120px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-premium"
                >
                  {isLoading ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar consulta
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Información de contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Teléfono</div>
                      <div className="text-muted-foreground">+34 123 456 789</div>
                      <div className="text-sm text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <div className="text-muted-foreground">info@autoimport.es</div>
                      <div className="text-sm text-muted-foreground">Respuesta en 24h</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Oficina</div>
                      <div className="text-muted-foreground">
                        Calle Principal 123
                        <br />
                        28001 Madrid, España
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">¿Por qué elegirnos?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>15 años de experiencia</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>Más de 500 coches importados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>Garantía en todos los vehículos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    <span>Proceso 100% transparente</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
