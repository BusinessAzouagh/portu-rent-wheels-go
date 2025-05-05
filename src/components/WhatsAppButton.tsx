
import { WhatsApp } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

interface WhatsAppButtonProps extends ButtonProps {
  vehicleInfo?: {
    model: string;
    image: string;
  };
}

const WHATSAPP_NUMBER = "212684057738";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppButton({ vehicleInfo, className, ...props }: WhatsAppButtonProps) {
  const { t } = useLanguage();
  
  const handleClick = () => {
    let url = WHATSAPP_BASE_URL;
    
    // If vehicle info is provided, add it to the WhatsApp message
    if (vehicleInfo) {
      const message = encodeURIComponent(
        `${t('whatsapp.vehicleInterest')}: ${vehicleInfo.model} — ${vehicleInfo.image}`
      );
      url += `?text=${message}`;
    }
    
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  return (
    <Button 
      onClick={handleClick} 
      className={`gap-2 ${className || ""}`}
      {...props}
    >
      <WhatsApp size={18} />
      {props.children || t('common.contactWhatsApp')}
    </Button>
  );
}
