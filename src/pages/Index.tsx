import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CarPreview from "@/components/CarPreview";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        {/* Sección Servicios con offset para header fijo */}
        <section id="servicios" className="scroll-mt-[72px]">
          <Services />
        </section>

        <CarPreview />
        <Testimonials />

        {/* Sección Contacto con offset para header fijo */}
        <section id="contacto" className="scroll-mt-[72px]">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
