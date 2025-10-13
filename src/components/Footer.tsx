import { Link } from "react-router-dom";
import { Car, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  return (
    <footer role="contentinfo" className="bg-charcoal border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Info compañía */}
          <div>
            <Link
              to="/"
              aria-label="MyAutoImport, ir al inicio"
              className="flex items-center space-x-2 mb-6"
              onClick={scrollToTop}
            >
              <Car className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="text-xl font-bold text-foreground">MyAutoImport</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Especialistas en importación de vehículos alemanes con más de 15 años de experiencia
              en el sector automovilístico.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook de MyAutoImport"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Instagram de MyAutoImport"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="YouTube de MyAutoImport"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces del sitio">
            <h3 className="text-lg font-semibold text-foreground mb-6">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  aria-label="Ir al inicio"
                  className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50"
                  onClick={scrollToTop}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/stock"
                  aria-label="Ver stock"
                  className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50"
                  onClick={scrollToTop}
                >
                  Stock
                </Link>
              </li>
              <li>
                <Link
                  to="/#servicios"
                  aria-label="Ver servicios"
                  className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  to="/#contacto"
                  aria-label="Ir a contacto"
                  className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li><span className="text-muted-foreground">Importación BMW</span></li>
              <li><span className="text-muted-foreground">Importación Mercedes</span></li>
              <li><span className="text-muted-foreground">Importación Audi</span></li>
              <li><span className="text-muted-foreground">Gestión documental</span></li>
              <li><span className="text-muted-foreground">Transporte especializado</span></li>
            </ul>
          </div>

          {/* Contacto */}
          <address className="not-italic">
            <h3 className="text-lg font-semibold text-foreground mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <a
                    href="tel:+34641338743"
                    aria-label="Llamar al +34 641 338 743"
                    className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/60"
                  >
                    +34 641 338 743
                  </a>
                  <div className="text-sm text-muted-foreground">Lun-Vie: 9:00-18:00</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                <a
                  href="mailto:info.myautoimport@gmail.com"
                  aria-label="Enviar correo a info.myautoimport@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/60"
                >
                  info.myautoimport@gmail.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                <div className="text-muted-foreground">
                  <div>Calle Principal 123</div>
                  <div>28001 Madrid, España</div>
                </div>
              </div>
            </div>
          </address>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MyAutoImport. Todos los derechos reservados.
            </div>
            <nav aria-label="Documentación legal">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <li>
                  <Link
                    to="/politica-de-privacidad"
                    className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50"
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terminos-y-condiciones"
                    className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50"
                  >
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aviso-legal"
                    className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50"
                  >
                    Aviso Legal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/politica-de-cookies"
                    className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50"
                  >
                    Política de Cookies
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
