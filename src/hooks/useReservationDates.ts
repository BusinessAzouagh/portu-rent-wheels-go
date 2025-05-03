
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
    // Create full datetime objects with hours and minutes for precise comparison
    const startDateTime = new Date(startDate);
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    startDateTime.setHours(startHours, startMinutes, 0, 0);
    
    const endDateTime = new Date(endDate);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    endDateTime.setHours(endHours, endMinutes, 0, 0);
    
    // Check if end date/time is after start date/time
    if (endDateTime <= startDateTime) {
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
      
      // Create a full end datetime for comparison
      const endDateTime = new Date(endDate);
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      endDateTime.setHours(endHours, endMinutes, 0, 0);
      
      // Only update if the new start date is before the end date
      if (newDate < endDateTime) {
        setStartDate(newDate);
        setValidationError(null);
      } else {
        toast({
          title: t('common.error'),
          description: t('reservation.startDateBeforeEnd'),
          variant: "destructive",
        });
        setValidationError('reservation.invalidEndDate');
        return;
      }
      
      validateDates();
    }
  };

  const updateEndDateTime = (date?: Date) => {
    if (date) {
      const [hours, minutes] = endTime.split(':').map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      
      // Create a full start datetime for comparison
      const startDateTime = new Date(startDate);
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      startDateTime.setHours(startHours, startMinutes, 0, 0);
      
      // Only update if the new end date is after the start date
      if (newDate > startDateTime) {
        setEndDate(newDate);
        setValidationError(null);
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
    // Prepare the new datetime with updated time
    const [newHours, newMinutes] = timeValue.split(':').map(Number);
    const newStartDateTime = new Date(startDate);
    newStartDateTime.setHours(newHours, newMinutes, 0, 0);
    
    // Create end datetime for comparison
    const endDateTime = new Date(endDate);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    endDateTime.setHours(endHours, endMinutes, 0, 0);
    
    // Check if new start time makes start date still before end date
    if (newStartDateTime < endDateTime) {
      setStartTime(timeValue);
      setStartDate(newStartDateTime);
      setValidationError(null);
    } else {
      toast({
        title: t('common.error'),
        description: t('reservation.startTimeBeforeEnd'),
        variant: "destructive",
      });
      setValidationError('reservation.invalidEndDate');
    }
  };

  const handleEndTimeChange = (timeValue: string) => {
    // Prepare the new datetime with updated time
    const [newHours, newMinutes] = timeValue.split(':').map(Number);
    const newEndDateTime = new Date(endDate);
    newEndDateTime.setHours(newHours, newMinutes, 0, 0);
    
    // Create start datetime for comparison
    const startDateTime = new Date(startDate);
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    startDateTime.setHours(startHours, startMinutes, 0, 0);
    
    // Ensure end date is not before start date
    if (newEndDateTime > startDateTime) {
      setEndTime(timeValue);
      setEndDate(newEndDateTime);
      setValidationError(null);
    } else {
      toast({
        title: t('common.error'),
        description: t('reservation.endTimeAfterStart'),
        variant: "destructive",
      });
      setValidationError('reservation.invalidEndDate');
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
