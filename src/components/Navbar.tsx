
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Portu Rent</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium">Accueil</Link>
            <Link to="/vehicles" className="text-gray-600 hover:text-primary font-medium">Véhicules</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary font-medium">À propos</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary font-medium">Contact</Link>
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin
              </Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
                Accueil
              </Link>
              <Link 
                to="/vehicles" 
                className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Véhicules
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/admin" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full">Admin</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
