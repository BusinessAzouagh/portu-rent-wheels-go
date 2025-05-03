
import { useLanguage } from "@/i18n/LanguageContext";
import { languageOptions, Language } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "default" | "admin";
  onlyIcon?: boolean;
}

const LanguageSelector = ({ variant = "default", onlyIcon = false }: LanguageSelectorProps) => {
  const { language, setLanguage, t } = useLanguage();
  
  const currentLanguage = languageOptions.find(lang => lang.code === language);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={variant === "admin" ? "w-full justify-start" : ""}
        >
          <Globe className="h-4 w-4 mr-2" />
          {!onlyIcon && <span>{currentLanguage?.name || t('admin.language')}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => setLanguage(option.code)}
            className={language === option.code ? "bg-muted" : ""}
          >
            <span className={language === option.code ? "font-medium" : ""}>
              {option.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
