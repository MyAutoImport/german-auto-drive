import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Settings, Check } from 'lucide-react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
}

const STORAGE_KEY = 'cookie-consent-v1';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
  });

  useEffect(() => {
    // Check if consent already exists
    const existingConsent = localStorage.getItem(STORAGE_KEY);
    if (!existingConsent) {
      // Delay showing banner slightly for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const saveConsent = (consent: CookieConsent) => {
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    
    // Set cookie for server-side detection (6 months)
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 6);
    const cookieValue = consent.analytics ? 'accepted' : 'rejected';
    document.cookie = `cookie_consent=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    
    setIsVisible(false);
    setShowSettings(false);
    
    // Here you would integrate with your analytics service
    if (consent.analytics) {
      // Enable analytics (e.g., Google Analytics, etc.)
      console.log('Analytics cookies enabled');
    } else {
      // Disable analytics
      console.log('Analytics cookies disabled');
    }
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ necessary: true, analytics: false });
  };

  const handleSaveSettings = () => {
    saveConsent(preferences);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-lg shadow-lg p-6">
          {!showSettings ? (
            // Main banner
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  🍪 Uso de Cookies
                </h3>
                <p className="text-sm text-muted-foreground">
                  Utilizamos cookies para mejorar su experiencia de navegación, realizar análisis de uso 
                  y personalizar el contenido. Las cookies técnicas son necesarias para el funcionamiento 
                  del sitio web.{' '}
                  <a 
                    href="/politica-de-cookies" 
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Más información
                  </a>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Configurar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectNonEssential}
                >
                  Solo necesarias
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Aceptar todas
                </Button>
              </div>
            </div>
          ) : (
            // Settings panel
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Configuración de Cookies
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Necessary cookies */}
                <div className="flex items-start justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      Cookies Técnicas (Necesarias)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Imprescindibles para el funcionamiento del sitio web. 
                      No se pueden desactivar.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 ml-3" />
                  </div>
                </div>

                {/* Analytics cookies */}
                <div className="flex items-start justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      Cookies Analíticas
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Nos ayudan a entender cómo los visitantes interactúan con el sitio web 
                      recopilando información de forma anónima.
                    </p>
                  </div>
                  <div className="flex items-center ml-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences(prev => ({
                            ...prev,
                            analytics: e.target.checked
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handleRejectNonEssential}
                  className="flex-1"
                >
                  Solo necesarias
                </Button>
                <Button
                  onClick={handleSaveSettings}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Guardar configuración
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}