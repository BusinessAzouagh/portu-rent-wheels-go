
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portu Rent</h3>
            <p className="text-gray-300 mb-4">
              Votre partenaire de confiance pour la location de véhicules au Portugal.
              Des voitures de qualité et un service irréprochable.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Accueil</Link></li>
              <li><Link to="/cars" className="text-gray-300 hover:text-white">Nos véhicules</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">À propos de nous</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="text-gray-300 not-italic">
              <p>Avenida da Liberdade, 245</p>
              <p>1250-143 Lisboa, Portugal</p>
              <p className="mt-2">Email: info@porturent.pt</p>
              <p>Téléphone: +351 215 123 456</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Portu Rent. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
