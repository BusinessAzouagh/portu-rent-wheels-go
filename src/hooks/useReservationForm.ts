
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { Car } from "@/types/cars";
import { CustomerFormData, ReservationFormData } from "@/types/reservation";
import { useReservationDates } from "./useReservationDates";
import { useCustomerForm } from "./useCustomerForm";

interface UseReservationFormProps {
  car: Car;
  initialStartDate: Date;
  initialEndDate: Date;
  initialStartTime?: string;
  initialEndTime?: string;
  onSubmit: (formData: ReservationFormData) => Promise<void>;
  getLocale: () => any; // Function to get the locale provided by parent component
}

export const useReservationForm = ({ 
  car, 
  initialStartDate, 
  initialEndDate,
  initialStartTime = "12:00",
  initialEndTime = "12:00",
  onSubmit,
  getLocale 
}: UseReservationFormProps) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use the custom hooks
  const dateManager = useReservationDates({
    initialStartDate,
    initialEndDate,
    initialStartTime,
    initialEndTime
  });
  
  const formManager = useCustomerForm();
  
  // Calculate the total price based on the car and days
  const totalPrice = dateManager.days * car.pricePerDay * 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates before submission
    if (!dateManager.validateDates()) {
      return;
    }
    
    if (!formManager.formData.firstName || !formManager.formData.lastName || !formManager.formData.phone) {
      toast({
        title: t('common.error'),
        description: t('reservation.fillRequired'),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const reservationData = {
        ...formManager.formData,
        carId: car.id,
        startDate: dateManager.startDate,
        endDate: dateManager.endDate,
        status: "PENDING"
      };
      
      await onSubmit(reservationData);
      
      toast({
        title: t('reservation.reservationSent'),
        description: t('reservation.reservationSuccess'),
      });
      
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('reservation.reservationError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    startDate: dateManager.startDate,
    endDate: dateManager.endDate,
    startTime: dateManager.startTime,
    endTime: dateManager.endTime,
    formData: formManager.formData,
    days: dateManager.days,
    totalPrice,
    isSubmitting,
    validationError: dateManager.validationError,
    getLocale,
    handleChange: formManager.handleChange,
    updateStartDateTime: dateManager.updateStartDateTime,
    updateEndDateTime: dateManager.updateEndDateTime,
    handleStartTimeChange: dateManager.handleStartTimeChange,
    handleEndTimeChange: dateManager.handleEndTimeChange,
    handleSubmit
  };
};
