
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  label: string;
  value: number | string;
}

const StatCard = ({ icon: Icon, iconColor, iconBgColor, label, value }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center p-4">
        <div className={`p-2 ${iconBgColor} rounded-full mr-4`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
