
import { Mail, Phone } from "lucide-react";
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
            <svg 
              viewBox="0 0 24 24" 
              height={18} 
              width={18} 
              fill="#25D366"
              className="mt-1 shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
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
