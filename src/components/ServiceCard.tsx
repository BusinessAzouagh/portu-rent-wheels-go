
import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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

export default ServiceCard;
