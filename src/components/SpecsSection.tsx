import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TechnicalSpecs from "./TechnicalSpecs";

interface SpecsSectionProps {
  car: any;
  collapsible?: boolean;
}

export default function SpecsSection({ car, collapsible = false }: SpecsSectionProps) {
  const [open, setOpen] = useState(!collapsible);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Especificaciones técnicas</CardTitle>
          {collapsible && (
            <Button
              variant="outline"
              onClick={() => setOpen(v => !v)}
              className="text-sm"
            >
              {open ? 'Ocultar especificaciones' : 'Mostrar especificaciones técnicas'}
            </Button>
          )}
        </div>
      </CardHeader>
      {open && (
        <CardContent>
          <TechnicalSpecs car={car} />
        </CardContent>
      )}
    </Card>
  );
}