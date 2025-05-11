
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="public/lovable-uploads/logo.png"
              alt="Portu Rent Car"
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium">{t('navbar.home')}</Link>
            <Link to="/vehicles" className="text-gray-600 hover:text-primary font-medium">{t('navbar.vehicles')}</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary font-medium">{t('navbar.about')}</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary font-medium">{t('navbar.contact')}</Link>
            <LanguageSelector onlyIcon={true} />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector onlyIcon={true} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="pt-2 pb-4 md:hidden">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navbar.home')}
              </Link>
              <Link
                to="/vehicles"
                className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navbar.vehicles')}
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navbar.about')}
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navbar.contact')}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
