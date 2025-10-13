import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hace scroll al inicio cada vez que cambia la ruta (React Router DOM).
 */
export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Evita animación en cambios de ruta para que no "salte"
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  return null;
}