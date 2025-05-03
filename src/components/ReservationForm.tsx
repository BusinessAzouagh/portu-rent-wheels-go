
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car } from "./CarCard";
import { useToast } from "@/hooks/use-toast";

interface ReservationFormProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  onSubmit: (formData: any) => Promise<void>;
}

const ReservationForm = ({ car, startDate, endDate, onSubmit }: ReservationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationalId: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const reservationData = {
        ...formData,
        carId: car.id,
        startDate,
        endDate,
        status: "PENDING"
      };
      
      await onSubmit(reservationData);
      
      toast({
        title: "Réservation envoyée",
        description: "Merci pour votre réservation ! Nous allons analyser votre demande et vous contacter par téléphone dès que possible.",
      });
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réservation. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate number of days
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = days * car.pricePerDay;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Réserver {car.model}</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Période de location:</p>
            <p className="font-medium">
              Du {startDate.toLocaleDateString()} au {endDate.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Prix total:</p>
            <p className="font-bold text-primary">{totalPrice}€ ({days} jours à {car.pricePerDay}€)</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom <span className="text-red-500">*</span></Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom <span className="text-red-500">*</span></Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">
            Numéro de téléphone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nationalId">
            Numéro de registre national <span className="text-gray-400">(optionnel)</span>
          </Label>
          <Input
            id="nationalId"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-gray-400">(optionnel)</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <Button
          type="submit"
          className="w-full mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Traitement en cours..." : "Confirmer la réservation"}
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
