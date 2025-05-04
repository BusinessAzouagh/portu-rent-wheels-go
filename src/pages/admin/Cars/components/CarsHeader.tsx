
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface CarsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CarsHeader = ({ searchTerm, onSearchChange }: CarsHeaderProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">{t('admin.cars')}</h1>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('admin.search')}
            className="pl-8 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Link to="/admin/cars/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t('admin.addVehicle')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CarsHeader;
