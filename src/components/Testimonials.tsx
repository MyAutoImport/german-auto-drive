import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Martínez",
      location: "Madrid",
      car: "BMW X3",
      rating: 5,
      text: "Increíble servicio. Me ayudaron a encontrar exactamente lo que buscaba y el proceso fue transparente desde el primer día. Ahorré más de 8.000€ comparado con España.",
      avatar: "CM",
    },
    {
      name: "Ana Rodríguez",
      location: "Barcelona",
      car: "Mercedes C-Class",
      rating: 5,
      text: "Profesionales de confianza. Se encargaron de todo y el coche llegó en perfectas condiciones. Definitivamente recomendaría sus servicios.",
      avatar: "AR",
    },
    {
      name: "Miguel González",
      location: "Valencia",
      car: "Audi Q5",
      rating: 5,
      text: "Excelente atención al cliente. Siempre estuvieron disponibles para resolver mis dudas y el resultado superó mis expectativas. Muy satisfecho con la compra.",
      avatar: "MG",
    },
    {
      name: "Laura Fernández",
      location: "Sevilla",
      car: "BMW Serie 3",
      rating: 5,
      text: "Rápido, eficiente y confiable. En solo 3 semanas tenía mi coche en casa. El equipo es muy profesional y te mantienen informado en todo momento.",
      avatar: "LF",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Lo que dicen nuestros
            <span className="bg-gradient-primary bg-clip-text text-transparent"> clientes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Más de 500 clientes satisfechos han confiado en nosotros para importar su coche alemán ideal.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-card-dark transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary mb-4" />

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4" aria-label={`${testimonial.rating} de 5 estrellas`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    <div className="text-xs text-primary">{testimonial.car}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-steel rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Coches entregados</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfacción cliente</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground">Valoración media</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15</div>
              <div className="text-muted-foreground">Años experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
