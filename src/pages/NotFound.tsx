import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Button>
          </Link>
          <Link to="/stock">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Stock
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
