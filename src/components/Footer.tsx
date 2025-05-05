
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const handleMapClick = () => {
    window.open("https://www.google.be/maps/place/Portu+rent/@35.1017685,-3.8377494,21z/data=!4m15!1m8!3m7!1s0xd75d38565cab5f9:0x1f41c088c7150079!2sBni+Bouayach,+Maroc!3b1!8m2!3d35.1019375!4d-3.8426291!16s%2Fm%2F09k7c8x!3m5!1s0xd75d3a70460d695:0x961a9964cfa78ecc!8m2!3d35.1018574!4d-3.8376694!16s%2Fg%2F11lmhsp6cp?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D", "_blank", "noopener,noreferrer");
  };
  
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/212684057738", "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Portu Rent</h3>
            <div className="w-full max-w-[200px] mx-auto md:mx-0">
              <img 
                src="/lovable-uploads/maps.png"
                alt="Portu Rent Maps"
                className="w-full h-auto rounded-lg shadow-lg"
                onClick={handleMapClick}
              />
            </div>
            <p className="text-gray-300 mt-3 text-sm">{t('common.clickMap')}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.usefulLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">{t('navbar.home')}</Link></li>
              <li><Link to="/vehicles" className="text-gray-300 hover:text-white">{t('navbar.vehicles')}</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">{t('navbar.about')}</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">{t('navbar.contact')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contact')}</h3>
            <address className="text-gray-300 not-italic">
              <p>Rue charif mohamed, Bni Bouayach 32050, Maroc</p>
              <p className="mt-2">Email: info@porturent.com</p>
              <p className="flex items-center gap-2 mt-1">
                <Phone size={14} /> Téléphone: +212684057738
              </p>
              <p 
                className="flex items-center gap-2 mt-1 cursor-pointer text-primary-foreground hover:text-white"
                onClick={handleWhatsAppClick}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  height={14} 
                  width={14} 
                  fill="#25D366"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp: +212684057738
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Portu Rent. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
