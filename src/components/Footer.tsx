import { Link } from "react-router-dom";
import { Car, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">AutoImport</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Especialistas en importación de vehículos alemanes con más de 15 años de experiencia 
              en el sector automovilístico.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/stock" className="text-muted-foreground hover:text-primary transition-colors">
                  Stock
                </Link>
              </li>
              <li>
                <a href="/#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/#contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground">Importación BMW</span>
              </li>
              <li>
                <span className="text-muted-foreground">Importación Mercedes</span>
              </li>
              <li>
                <span className="text-muted-foreground">Importación Audi</span>
              </li>
              <li>
                <span className="text-muted-foreground">Gestión documental</span>
              </li>
              <li>
                <span className="text-muted-foreground">Transporte especializado</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <a href="tel:+34123456789" className="text-muted-foreground hover:text-primary transition-colors">
                    +34 123 456 789
                  </a>
                  <div className="text-sm text-muted-foreground">Lun-Vie: 9:00-18:00</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <a href="mailto:info@autoimport.es" className="text-muted-foreground hover:text-primary transition-colors">
                  info@autoimport.es
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-muted-foreground">
                  <div>Calle Principal 123</div>
                  <div>28001 Madrid, España</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 AutoImport. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Aviso Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;