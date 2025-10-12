import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EquipmentPanelProps {
  equipment: string[];
  features: string[];
}

function normalizeFeatures(features?: string[] | string | null): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features.filter(Boolean);
  return features.split(",").map(s => s.trim()).filter(Boolean);
}

export default function EquipmentPanel({ equipment, features }: EquipmentPanelProps) {
  const normalizedFeatures = normalizeFeatures(features);
  
  // Don't render if no equipment or features
  if (!equipment?.length && !normalizedFeatures?.length) return null;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Equipamiento incluido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {normalizedFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
          {equipment.map((item, index) => (
            <div key={`eq-${index}`} className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}