import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CarPreview from "@/components/CarPreview";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Actúa únicamente en la home
    if (location.pathname !== "/") return;

    const hash = location.hash?.replace("#", "");
    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    // Ajusta este offset si tu header tiene otra altura
    const HEADER_OFFSET = 72;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top: y, behavior: "smooth" });
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        {/* Sección Servicios con ancla */}
        <section id="servicios">
          <Services />
        </section>

        <CarPreview />
        <Testimonials />

        {/* Sección Contacto con ancla */}
        <section id="contacto">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
