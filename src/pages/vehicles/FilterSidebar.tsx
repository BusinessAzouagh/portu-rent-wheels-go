
import { useLanguage } from "@/i18n/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FilterSidebarProps {
    filters: {
        brand: string;
        transmission: string;
        color: string;
    };
    uniqueColors: string[];
    handleFilterChange: (key: string, value: string) => void;
    resetFilters: () => void;
}

const FilterSidebar = ({
    filters,
    uniqueColors,
    handleFilterChange,
    resetFilters,
}: FilterSidebarProps) => {
    const { t } = useLanguage();

    const getColorTranslation = (colorKey: string) => {
        // Extract the color key from the translation path (e.g., "vehicles.colors.black" -> "black")
        const colorName = colorKey.split('.').pop();
        return t(`vehicles.colors.${colorName}` as any);
    };

    return (
        <div className="md:w-1/4 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                    <Filter size={20} className="mr-2"/>
                    {t('vehicles.filters')}
                </h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                >
                    {t('vehicles.resetFilters')}
                </Button>
            </div>

            <div className="space-y-6">
                {/* Brand Filter */}
                <div className="space-y-2">
                    <Label htmlFor="brand">{t('vehicles.brand')}</Label>
                    <Input
                        id="brand"
                        placeholder={t('vehicles.searchBrand')}
                        value={filters.brand}
                        onChange={(e) => handleFilterChange("brand", e.target.value)}
                    />
                </div>

                {/* Transmission Filter */}
                <div className="space-y-2">
                    <Label htmlFor="transmission">{t('vehicles.transmission')}</Label>
                    <Select
                        value={filters.transmission}
                        onValueChange={(value) => handleFilterChange("transmission", value)}
                    >
                        <SelectTrigger id="transmission">
                            <SelectValue placeholder={t('vehicles.allTypes')}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('vehicles.allTypes')}</SelectItem>
                            <SelectItem value="vehicles.transmissions.manual">{t('vehicles.transmissions.manual')}</SelectItem>
                            <SelectItem value="vehicles.transmissions.automatic">{t('vehicles.transmissions.automatic')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Color Filter */}
                <div className="space-y-2">
                    <Label htmlFor="color">{t('vehicles.color')}</Label>
                    <Select
                        value={filters.color}
                        onValueChange={(value) => handleFilterChange("color", value)}
                    >
                        <SelectTrigger id="color">
                            <SelectValue placeholder={t('vehicles.allColors')}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('vehicles.allColors')}</SelectItem>
                            {uniqueColors.map(colorKey => (
                                <SelectItem key={colorKey} value={colorKey}>{getColorTranslation(colorKey)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
