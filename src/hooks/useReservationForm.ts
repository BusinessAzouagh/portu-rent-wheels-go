
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { Car } from "@/types/cars";
import { CustomerFormData, ReservationFormData } from "@/types/reservation";

interface UseReservationFormProps {
  car: Car;
  initialStartDate: Date;
  initialEndDate: Date;
  onSubmit: (formData: ReservationFormData) => Promise<void>;
}

export const useReservationForm = ({ 
  car, 
  initialStartDate, 
  initialEndDate, 
  onSubmit 
}: UseReservationFormProps) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [startTime, setStartTime] = useState(format(initialStartDate, "HH:mm"));
  const [endTime, setEndTime] = useState(format(initialEndDate, "HH:mm"));
  
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    nationalId: "",
    email: "",
  });

  // Calculate number of days
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = days * car.pricePerDay * 10;

  // Get locale based on current language
  const getLocale = () => {
    switch (language) {
      case 'fr': return require("date-fns/locale").fr;
      // Add other locale imports if needed
      default: return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateStartDateTime = (date?: Date) => {
    if (date) {
      const [hours, minutes] = startTime.split(':').map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      setStartDate(newDate);
      
      // If end date is before new start date, update end date
      if (endDate < newDate) {
        // Set end date to start date + 1 day
        const newEndDate = new Date(newDate);
        newEndDate.setDate(newDate.getDate() + 1);
        setEndDate(newEndDate);
        setEndTime(startTime);
      }
    }
  };

  const updateEndDateTime = (date?: Date) => {
    if (date) {
      const [hours, minutes] = endTime.split(':').map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      
      // Ensure end date is not before start date
      if (newDate > startDate) {
        setEndDate(newDate);
      } else {
        toast({
          title: t('common.error'),
          description: t('reservation.endDateAfterStart'),
          variant: "destructive",
        });
      }
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newStartDate = new Date(startDate);
    newStartDate.setHours(hours, minutes, 0, 0);
    setStartDate(newStartDate);
    
    // Check if new start time makes start date after end date
    if (newStartDate > endDate) {
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newStartDate.getDate() + 1);
      setEndDate(newEndDate);
      setEndTime(e.target.value);
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newEndDate = new Date(endDate);
    newEndDate.setHours(hours, minutes, 0, 0);
    
    // Ensure end date is not before start date
    if (newEndDate > startDate) {
      setEndDate(newEndDate);
    } else {
      toast({
        title: t('common.error'),
        description: t('reservation.endTimeAfterStart'),
        variant: "destructive",
      });
      // Reset to a valid time
      setEndTime(startTime);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phone) {
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
        ...formData,
        carId: car.id,
        startDate,
        endDate,
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
    startDate,
    endDate,
    startTime,
    endTime,
    formData,
    days,
    totalPrice,
    isSubmitting,
    getLocale,
    handleChange,
    updateStartDateTime,
    updateEndDateTime,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSubmit
  };
};
