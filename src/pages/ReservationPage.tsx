
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";
import { Car } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

// Mock data for cars (would be fetched from API in real app)
const MOCK_CARS: { [key: string]: Car } = {
  "1": {
    id: "1",
    model: "Renault Clio",
    licensePlate: "AA-123-BB",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800",
    pricePerDay: 40,
    available: true,
  },
  "2": {
    id: "2",
    model: "Peugeot 208",
    licensePlate: "CC-456-DD",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    pricePerDay: 45,
    available: true,
  },
  "3": {
    id: "3",
    model: "Volkswagen Golf",
    licensePlate: "EE-789-FF",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    pricePerDay: 50,
    available: false,
  },
  "4": {
    id: "4",
    model: "Fiat 500",
    licensePlate: "GG-012-HH",
    image: "https://images.unsplash.com/photo-1617654112368-307b8947646c?q=80&w=800",
    pricePerDay: 35,
    available: true,
  }
};

const ReservationPage = () => {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get date params from URL or use defaults
  const searchParams = new URLSearchParams(location.search);
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');
  
  const startDate = startDateParam ? new Date(startDateParam) : new Date();
  const endDate = endDateParam ? new Date(endDateParam) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (carId && MOCK_CARS[carId]) {
        setCar(MOCK_CARS[carId]);
      }
      setIsLoading(false);
    }, 500);
  }, [carId]);

  const handleSubmitReservation = async (formData: any) => {
    console.log("Submitting reservation:", formData);
    
    // Simulate API call with timeout
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSuccess(true);
        resolve();
      }, 1500);
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Chargement...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Véhicule non trouvé</h1>
            <p className="mb-6">Le véhicule que vous recherchez n'existe pas ou n'est plus disponible.</p>
            <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mb-6 text-green-500 flex justify-center">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Réservation reçue !</h2>
            <p className="text-lg mb-8">
              Merci pour votre réservation ! Nous allons analyser votre demande et vous contacter par téléphone dès que possible.
            </p>
            <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2" size={16} />
            Retour
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={car.image} 
                  alt={car.model} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-2">{car.model}</h1>
                  <p className="text-gray-600 mb-4">Plaque d'immatriculation: {car.licensePlate}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Informations sur le véhicule:</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>Climatisation</li>
                      <li>Transmission manuelle</li>
                      <li>Essence</li>
                      <li>5 sièges</li>
                      <li>2 bagages</li>
                    </ul>
                  </div>
                  
                  <div className="text-xl font-bold text-primary">
                    {car.pricePerDay}€ <span className="text-sm font-normal text-gray-500">/ jour</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <ReservationForm 
                car={car} 
                startDate={startDate} 
                endDate={endDate} 
                onSubmit={handleSubmitReservation}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReservationPage;
