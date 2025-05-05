
import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  selected = false,
  onClick 
}: ServiceCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${selected ? 'border-primary border-2' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="mb-4 text-primary flex justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </CardContent>
    </Card>
  );
};
