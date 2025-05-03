
import { Locale } from "date-fns";
import { useLanguage } from "@/i18n/LanguageContext";
import DatePickerComponent from "./DatePickerComponent";
import TimePickerComponent from "./TimePickerComponent";

interface DateTimeSelectorProps {
  label: string;
  date: Date;
  time: string;
  onDateChange: (date?: Date) => void;
  onTimeChange: (time: string) => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
  compact?: boolean;
  dateError?: string;
  timeError?: boolean;
}

const DateTimeSelector = ({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  minDate,
  maxDate,
  locale,
  compact = false,
  dateError,
  timeError
}: DateTimeSelectorProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-2">
      {!compact && <label className="block text-sm font-medium">{label}</label>}
      
      <div className="flex flex-col space-y-2">
        {/* Date Picker Component */}
        <div className="w-full">
          <DatePickerComponent 
            date={date}
            onDateChange={onDateChange}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            compact={compact}
          />
          {dateError && <p className="text-sm text-red-500 mt-1">{dateError}</p>}
        </div>
        
        {/* Time Picker Component */}
        <div className="w-full">
          <TimePickerComponent 
            time={time}
            onTimeChange={onTimeChange}
          />
          {timeError && <p className="text-sm text-red-500 mt-1">{t('validation.required')}</p>}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
