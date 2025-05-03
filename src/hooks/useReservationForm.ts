
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { Car } from "@/types/cars";
import { CustomerFormData, ReservationFormData } from "@/types/reservation";

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
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Use the provided times or defaults
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateDates = () => {
    // Check if end date/time is after start date/time
    if (endDate <= startDate) {
      setValidationError('reservation.invalidEndDate');
      return false;
    }
    
    // Clear validation errors if dates are valid
    setValidationError(null);
    return true;
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
      
      // Validate dates after update
      validateDates();
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
        setValidationError(null); // Clear validation error since dates are valid
      } else {
        toast({
          title: t('common.error'),
          description: t('reservation.endDateAfterStart'),
          variant: "destructive",
        });
        setValidationError('reservation.invalidEndDate');
      }
    }
  };

  const handleStartTimeChange = (timeValue: string) => {
    setStartTime(timeValue);
    const [hours, minutes] = timeValue.split(':').map(Number);
    const newStartDate = new Date(startDate);
    newStartDate.setHours(hours, minutes, 0, 0);
    setStartDate(newStartDate);
    
    // Check if new start time makes start date after end date
    if (newStartDate > endDate) {
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newStartDate.getDate() + 1);
      setEndDate(newEndDate);
      setEndTime(timeValue);
    }
    
    // Validate dates after time change
    validateDates();
  };

  const handleEndTimeChange = (timeValue: string) => {
    setEndTime(timeValue);
    const [hours, minutes] = timeValue.split(':').map(Number);
    const newEndDate = new Date(endDate);
    newEndDate.setHours(hours, minutes, 0, 0);
    
    // Ensure end date is not before start date
    if (newEndDate > startDate) {
      setEndDate(newEndDate);
      setValidationError(null); // Clear validation error since dates are valid
    } else {
      toast({
        title: t('common.error'),
        description: t('reservation.endTimeAfterStart'),
        variant: "destructive",
      });
      setValidationError('reservation.invalidEndDate');
      // Reset to a valid time
      setEndTime(startTime);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates before submission
    if (!validateDates()) {
      return;
    }
    
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
    validationError,
    getLocale,
    handleChange,
    updateStartDateTime,
    updateEndDateTime,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSubmit
  };
};
