
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactInfo = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
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
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="font-medium mb-2">{t('contact.openingHours')}</h4>
          <p className="text-gray-600">{t('contact.mondayFriday')}</p>
          <p className="text-gray-600">{t('contact.saturday')}</p>
          <p className="text-gray-600">{t('contact.sunday')}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
