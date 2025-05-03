
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";
import { Car } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// Extended car information
interface ExtendedCar extends Car {
  brand?: string;
  transmission?: "Manuelle" | "Automatique";
  fuelType?: "Essence" | "Diesel";
  features?: string[];
  seats?: number;
  luggage?: number;
  airConditioned?: boolean;
}

// Mock data for cars (would be fetched from API in real app)
const MOCK_CARS: { [key: string]: ExtendedCar } = {
  "1": {
    id: "1",
    model: "Clio",
    brand: "Renault",
    licensePlate: "AA-123-BB",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800",
    pricePerDay: 40,
    available: true,
    transmission: "Manuelle",
    fuelType: "Essence",
    features: ["Bluetooth", "USB", "GPS"],
    seats: 5,
    luggage: 2,
    airConditioned: true,
  },
  "2": {
    id: "2",
    model: "208",
    brand: "Peugeot",
    licensePlate: "CC-456-DD",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    pricePerDay: 45,
    available: true,
    transmission: "Automatique",
    fuelType: "Diesel",
    features: ["Bluetooth", "Caméra de recul", "USB"],
    seats: 5,
    luggage: 2,
    airConditioned: true,
  },
  "3": {
    id: "3",
    model: "Golf",
    brand: "Volkswagen",
    licensePlate: "EE-789-FF",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    pricePerDay: 50,
    available: false,
    transmission: "Manuelle",
    fuelType: "Diesel",
    features: ["Bluetooth", "Caméra de recul", "GPS", "USB"],
    seats: 5,
    luggage: 3,
    airConditioned: true,
  },
  "4": {
    id: "4",
    model: "500",
    brand: "Fiat",
    licensePlate: "GG-012-HH",
    image: "https://images.unsplash.com/photo-1617654112368-307b8947646c?q=80&w=800",
    pricePerDay: 35,
    available: true,
    transmission: "Manuelle",
    fuelType: "Essence",
    features: ["Bluetooth", "USB"],
    seats: 4,
    luggage: 1,
    airConditioned: true,
  }
};

const ReservationPage = () => {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState<ExtendedCar | null>(null);
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
                  alt={`${car.brand} ${car.model}`} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-2">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-gray-600 mb-4">Plaque d'immatriculation: {car.licensePlate}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Informations sur le véhicule:</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      {car.airConditioned && <li>Climatisation</li>}
                      {car.transmission && <li>Transmission {car.transmission.toLowerCase()}</li>}
                      {car.fuelType && <li>{car.fuelType}</li>}
                      {car.seats && <li>{car.seats} sièges</li>}
                      {car.luggage && <li>{car.luggage} bagages</li>}
                    </ul>
                  </div>
                  
                  {car.features && car.features.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Équipements:</h3>
                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
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
