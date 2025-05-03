
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import CarDetails from "@/components/reservation/CarDetails";
import ReservationSuccess from "@/components/reservation/ReservationSuccess";
import LoadingState from "@/components/reservation/LoadingState";
import CarNotFound from "@/components/reservation/CarNotFound";
import { useCarData } from "@/components/reservation/ReservationPageData";
import { ReservationFormData } from "@/types/reservation";
import { useIsMobile } from "@/hooks/use-mobile";

const ReservationPage = () => {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLanguage();
  const { car, isLoading } = useCarData({ carId });
  const isMobile = useIsMobile();

  // Get date params from URL or use defaults
  const searchParams = new URLSearchParams(location.search);
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');
  
  let startDate = startDateParam ? new Date(startDateParam) : new Date();
  let endDate = endDateParam ? new Date(endDateParam) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

  const handleSubmitReservation = async (formData: ReservationFormData) => {
    console.log("Submitting reservation:", formData);
    
    // Simulate API call with timeout
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSuccess(true);
        resolve();
      }, 1500);
    });
  };

  // Wrap our content with the layout
  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (!car) {
      return <CarNotFound />;
    }

    if (isSuccess) {
      return <ReservationSuccess />;
    }

    return (
      <div className="container mx-auto px-4">
        {/* Show the back button only on mobile */}
        {isMobile && (
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2" size={16} />
            {t('common.back')}
          </Button>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CarDetails car={car} />
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
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-2">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPage;
