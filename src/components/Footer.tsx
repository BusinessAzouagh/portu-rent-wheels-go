
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const handleMapClick = () => {
    window.open("https://www.google.be/maps/place/Portu+rent/@35.1017685,-3.8377494,21z/data=!4m15!1m8!3m7!1s0xd75d38565cab5f9:0x1f41c088c7150079!2sBni+Bouayach,+Maroc!3b1!8m2!3d35.1019375!4d-3.8426291!16s%2Fm%2F09k7c8x!3m5!1s0xd75d3a70460d695:0x961a9964cfa78ecc!8m2!3d35.1018574!4d-3.8376694!16s%2Fg%2F11lmhsp6cp?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D", "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Portu Rent</h3>
            <div className="w-full max-w-[250px] mx-auto md:mx-0">
              <img 
                src="/lovable-uploads/c74a4187-508f-46b7-bd8c-f4ac7fc977ce.png" 
                alt="Portu Rent Location"
                className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
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
              <p>Téléphone: +212684057738</p>
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
