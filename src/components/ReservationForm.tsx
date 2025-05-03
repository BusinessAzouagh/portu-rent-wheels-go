import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car } from "./CarCard";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarClock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

export interface ReservationFormData {
  firstName: string;
  lastName: string;
  phone: string;
  nationalId?: string;
  email?: string;
  carId: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

interface ReservationFormProps {
  car: Car;
  startDate: Date;
  endDate: Date;
  onSubmit: (formData: ReservationFormData) => Promise<void>;
}

const ReservationForm = ({ car, startDate: initialStartDate, endDate: initialEndDate, onSubmit }: ReservationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();
  
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [startTime, setStartTime] = useState(format(initialStartDate, "HH:mm"));
  const [endTime, setEndTime] = useState(format(initialEndDate, "HH:mm"));
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationalId: "",
    email: "",
  });

  // Get locale based on current language
  const getLocale = () => {
    switch (language) {
      case 'fr': return fr;
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

  // Calculate number of days
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = days * car.pricePerDay * 10;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('reservation.bookNow')} {car.model}</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium mb-4 text-primary">{t('reservation.rentalPeriod')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Date et heure de début */}
          <div>
            <Label htmlFor="startDate" className="block mb-2">{t('search.startDate')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  {format(startDate, "dd MMMM yyyy", { locale: getLocale() })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={updateStartDateTime}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <div className="mt-2">
              <Label htmlFor="startTime" className="block mb-2">{t('search.startTime')}</Label>
              <Input
                type="time"
                id="startTime"
                name="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Date et heure de fin */}
          <div>
            <Label htmlFor="endDate" className="block mb-2">{t('search.endDate')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  {format(endDate, "dd MMMM yyyy", { locale: getLocale() })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={updateEndDateTime}
                  initialFocus
                  disabled={(date) => date < startDate}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <div className="mt-2">
              <Label htmlFor="endTime" className="block mb-2">{t('search.endTime')}</Label>
              <Input
                type="time"
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-md border border-gray-200 mt-4">
          <p className="font-medium text-primary">{t('reservation.totalPrice')}</p>
          <p className="font-bold text-lg">{totalPrice} DH ({days} {t('reservation.days')} {car.pricePerDay * 10} DH)</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lastName">{t('reservation.lastName')} <span className="text-red-500">*</span></Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="firstName">{t('reservation.firstName')} <span className="text-red-500">*</span></Label>
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
            {t('reservation.phoneNumber')} <span className="text-red-500">*</span>
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
            {t('reservation.nationalId')} <span className="text-gray-400">({t('common.optional')})</span>
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
            {t('contact.email')} <span className="text-gray-400">({t('common.optional')})</span>
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
          {isSubmitting ? t('reservation.processing') : t('reservation.confirmReservation')}
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
