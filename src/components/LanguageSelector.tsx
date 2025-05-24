
import { useLanguage } from "@/i18n/LanguageContext";
import { languageOptions, Language } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSelectorProps {
  variant?: "default" | "admin";
  onlyIcon?: boolean;
}

const LanguageSelector = ({ variant = "default", onlyIcon = false }: LanguageSelectorProps) => {
  const { language, setLanguage, t } = useLanguage();
  
  const currentLanguage = languageOptions.find(lang => lang.code === language);
  
  // Get the flag for each language
  const getLanguageFlag = (code: Language) => {
    switch (code) {
      case 'fr':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" className="mr-2">
                <rect width="7" height="15" fill="#0055A4"/>
                <rect x="7" width="6" height="15" fill="#FFFFFF"/>
                <rect x="13" width="7" height="15" fill="#EF4135"/>
               </svg>;
      case 'en':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" className="mr-2">
                <rect width="20" height="15" fill="#FFFFFF"/>
                <rect y="0" width="20" height="2" fill="#C8102E"/>
                <rect y="4" width="20" height="2" fill="#C8102E"/>
                <rect y="8" width="20" height="2" fill="#C8102E"/>
                <rect y="12" width="20" height="3" fill="#C8102E"/>
                <rect x="0" y="0" width="8" height="8" fill="#012169"/>
                <path d="M0 0L8 8M8 0L0 8" stroke="white" strokeWidth="1"/>
                <path d="M0 0L8 8" stroke="#C8102E" strokeWidth="0.5"/>
                <path d="M8 0L0 8" stroke="#C8102E" strokeWidth="0.5"/>
                <path d="M4 0V8M0 4H8" stroke="white" strokeWidth="2"/>
                <path d="M4 0V8M0 4H8" stroke="#C8102E" strokeWidth="1"/>
              </svg>;
      case 'es':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" className="mr-2">
                <rect width="20" height="15" fill="#FFC400"/>
                <rect y="3" width="20" height="9" fill="#C60B1E"/>
               </svg>;
      case 'ar':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" className="mr-2">
                <rect width="20" height="15" fill="#C1272D"/>
                <path d="M10 4L11.1756 7.52786H14.8532L11.8388 9.69427L13.0144 13.2221L10 11.0557L6.98557 13.2221L8.16116 9.69427L5.14683 7.52786H8.82437L10 4Z" fill="#006233"/>
               </svg>;
      case 'nl':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" className="mr-2">
                <rect width="20" height="5" fill="#AE1C28"/>
                <rect y="5" width="20" height="5" fill="#FFFFFF"/>
                <rect y="10" width="20" height="5" fill="#21468B"/>
               </svg>;
      case 'de':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" className="mr-2">
                <rect width="20" height="5" fill="#000000"/>
                <rect y="5" width="20" height="5" fill="#DD0000"/>
                <rect y="10" width="20" height="5" fill="#FFCE00"/>
               </svg>;
      default:
        return null;
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={variant === "admin" ? "w-full justify-start" : ""}
        >
          {getLanguageFlag(language)}
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
            {getLanguageFlag(option.code)}
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
