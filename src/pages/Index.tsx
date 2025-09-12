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
    // Solo actuamos en la home
    if (location.pathname !== "/") return;

    const hash = location.hash?.replace("#", "");
    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    // Offset dinámico según la altura real del header + margen
    const header = document.querySelector("header") as HTMLElement | null;
    const HEADER_OFFSET = (header?.offsetHeight ?? 72) + 8;

    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        {/* Sección Servicios con ancla y offset extra para header fijo */}
        <section id="servicios" className="scroll-mt-[80px]">
          <Services />
        </section>

        <CarPreview />
        <Testimonials />

        {/* Sección Contacto con ancla y offset extra para header fijo */}
        <section id="contacto" className="scroll-mt-[80px]">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
