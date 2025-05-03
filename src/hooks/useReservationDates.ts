
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useLanguage } from "@/i18n/LanguageContext";

interface UseReservationDatesProps {
  initialStartDate: Date;
  initialEndDate: Date;
  initialStartTime: string;
  initialEndTime: string;
}

export const useReservationDates = ({
  initialStartDate,
  initialEndDate,
  initialStartTime = "12:00",
  initialEndTime = "12:00"
}: UseReservationDatesProps) => {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Calculate number of days
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

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
      
      // Ensure start date is not after end date
      if (newDate < endDate) {
        setStartDate(newDate);
        setValidationError(null); // Clear validation error since dates are valid
      } else {
        toast({
          title: t('common.error'),
          description: t('reservation.startDateBeforeEnd'),
          variant: "destructive",
        });
        setValidationError('reservation.invalidEndDate');
        // Don't update the date if it would create an invalid state
        return;
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
    
    // Check if new start time makes start date after end date
    if (newStartDate < endDate) {
      setStartDate(newStartDate);
      setValidationError(null); // Clear validation error
    } else {
      toast({
        title: t('common.error'),
        description: t('reservation.startTimeBeforeEnd'),
        variant: "destructive",
      });
      setValidationError('reservation.invalidEndDate');
      // Reset to a valid time
      setStartTime(timeValue);
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

  return {
    startDate,
    endDate,
    startTime,
    endTime,
    days,
    validationError,
    updateStartDateTime,
    updateEndDateTime,
    handleStartTimeChange,
    handleEndTimeChange,
    validateDates
  };
};
