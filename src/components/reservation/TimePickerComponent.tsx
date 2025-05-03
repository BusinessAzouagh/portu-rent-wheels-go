
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";

interface TimePickerComponentProps {
  time: string;
  onTimeChange: (time: string) => void;
}

const TimePickerComponent = ({
  time,
  onTimeChange
}: TimePickerComponentProps) => {
  const { t } = useLanguage();
  
  // Generate hours options (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  
  // Generate minutes options (0, 15, 30, 45)
  const minutes = ["00", "15", "30", "45"];
  
  // Split current time into hours and minutes
  const [currentHour, currentMinute] = time.split(':');
  
  const handleHourChange = (hour: string) => {
    const newTime = `${hour}:${currentMinute}`;
    onTimeChange(newTime);
  };
  
  const handleMinuteChange = (minute: string) => {
    const newTime = `${currentHour}:${minute}`;
    onTimeChange(newTime);
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !time && "text-muted-foreground"
          )}
        >
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{time}</span>
          </div>
          <span className="sr-only">{t('search.selectTime')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3 rounded-md border shadow-md" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">{t('search.selectTime')}</h4>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select value={currentHour} onValueChange={handleHourChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {hours.map(hour => (
                      <SelectItem key={`hour-${hour}`} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">{t('common.hour')}</p>
              </div>
              <div className="flex-1">
                <Select value={currentMinute} onValueChange={handleMinuteChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map(minute => (
                      <SelectItem key={`minute-${minute}`} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">{t('common.minute')}</p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimePickerComponent;
