
import { format } from "date-fns";
import { Locale } from "date-fns";
import { CalendarClock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface DateTimeSelectorProps {
  label: string;
  date: Date;
  time: string;
  onDateChange: (date?: Date) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minDate?: Date;
  locale?: Locale; // Now properly using the imported Locale type
}

const DateTimeSelector = ({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate,
  locale
}: DateTimeSelectorProps) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <Label htmlFor={`${label}-date`} className="block mb-2">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarClock className="mr-2 h-4 w-4" />
            {format(date, "dd MMMM yyyy", { locale })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            disabled={(currentDate) => 
              minDate ? currentDate < minDate : currentDate < new Date()
            }
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      
      <div className="mt-2">
        <Label htmlFor={`${label}-time`} className="block mb-2">{t('search.startTime')}</Label>
        <Input
          type="time"
          id={`${label}-time`}
          name={`${label}-time`}
          value={time}
          onChange={onTimeChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DateTimeSelector;
