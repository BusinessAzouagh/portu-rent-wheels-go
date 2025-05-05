
import { Mail, Phone, WhatsApp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "../ui/button";

const WHATSAPP_NUMBER = "212684057738";

const ContactInfo = () => {
  const { t } = useLanguage();
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
  };
  
  return (
    <div className="space-y-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{t('contact.ourCoordinates')}</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">Portu Rent</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="text-primary mt-1" />
            <div>
              <p className="font-medium">{t('contact.email')}</p>
              <a 
                href="mailto:info@porturent.com"
                className="text-primary hover:underline"
              >
                info@porturent.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="text-primary mt-1" />
            <div>
              <p className="font-medium">{t('contact.phone')}</p>
              <a 
                href="tel:+212684057738" 
                className="text-primary hover:underline"
              >
                +212 684 05 77 38
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <WhatsApp className="text-primary mt-1" />
            <div>
              <p className="font-medium">WhatsApp</p>
              <Button 
                variant="link" 
                className="text-primary hover:underline p-0 h-auto font-normal" 
                onClick={handleWhatsAppClick}
              >
                +212 684 05 77 38
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="font-medium mb-2">{t('contact.openingHours')}</h4>
          <p className="text-gray-600">{t('contact.openAllDay')}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
