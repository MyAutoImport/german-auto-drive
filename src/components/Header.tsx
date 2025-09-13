import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Car, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navId = "primary-navigation";

  const scrollToTop = () => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Stock", href: "/stock" },
    { name: "Servicios", href: "/#servicios" },
    { name: "Contacto", href: "/#contacto" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#"))
      return location.pathname === "/" && location.hash === href.substring(1);
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            aria-label="MyAutoImport, ir al inicio"
            className="flex items-center space-x-2"
            onClick={scrollToTop}
          >
            <Car className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold text-foreground">MyAutoImport</span>
          </Link>

          {/* Navegación escritorio */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center space-x-8"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-primary underline-offset-4 ${
                    active ? "text-primary underline decoration-primary/60" : "text-muted-foreground"
                  }`}
                  onClick={
                    item.name === "Stock" || item.name === "Inicio" ? scrollToTop : undefined
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Contacto (escritorio) */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
            <a
              href="tel:+34641338743"
              aria-label="Llamar al +34 641 338 743"
              className="flex items-center space-x-1 hover:text-primary transition-colors underline underline-offset-4 decoration-primary/60"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>+34 641 338 743</span>
            </a>
            <a
              href="mailto:info.myautoimport@gmail.com"
              aria-label="Enviar correo a info.myautoimport@gmail.com"
              className="flex items-center space-x-1 hover:text-primary transition-colors underline underline-offset-4 decoration-primary/60"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>info.myautoimport@gmail.com</span>
            </a>
          </div>

          {/* Botón menú móvil */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-controls={navId}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Navegación móvil */}
        <nav id={navId} aria-label="Navegación móvil" className="md:hidden" hidden={!isMenuOpen}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary underline-offset-4 ${
                    active ? "text-primary underline decoration-primary/60" : "text-muted-foreground"
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (item.name === "Stock" || item.name === "Inicio") scrollToTop();
                  }}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="px-3 py-2 space-y-2 text-sm text-muted-foreground border-t border-border mt-2 pt-4">
              <a
                href="tel:+34641338743"
                aria-label="Llamar al +34 641 338 743"
                className="flex items-center space-x-2 hover:text-primary transition-colors underline underline-offset-4 decoration-primary/60"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>+34 641 338 743</span>
              </a>
              <a
                href="mailto:info.myautoimport@gmail.com"
                aria-label="Enviar correo a info.myautoimport@gmail.com"
                className="flex items-center space-x-2 hover:text-primary transition-colors underline underline-offset-4 decoration-primary/60 break-all"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>info.myautoimport@gmail.com</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
