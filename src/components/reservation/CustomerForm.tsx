
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerFormData } from "@/types/reservation";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface CustomerFormProps {
  formData: CustomerFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    nationalId?: string;
  };
  submitted?: boolean;
}

const CustomerForm = ({ formData, onChange, errors = {}, submitted = false }: CustomerFormProps) => {
  const { t } = useLanguage();
  
  // Check if field is required and empty and form was submitted
  const hasError = (field: keyof typeof errors) => submitted && errors[field];
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lastName">{t('reservation.lastName')} <span className="text-red-500">*</span></Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            required
            className={cn(
              hasError('lastName') ? "border-red-500 focus-visible:ring-red-500" : ""
            )}
          />
          {hasError('lastName') && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('reservation.firstName')} <span className="text-red-500">*</span></Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
            className={cn(
              hasError('firstName') ? "border-red-500 focus-visible:ring-red-500" : ""
            )}
          />
          {hasError('firstName') && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
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
          onChange={onChange}
          required
          className={cn(
            hasError('phone') ? "border-red-500 focus-visible:ring-red-500" : ""
          )}
        />
        {hasError('phone') && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nationalId">
          {t('reservation.nationalId')} <span className="text-gray-400">({t('common.optional')})</span>
        </Label>
        <Input
          id="nationalId"
          name="nationalId"
          value={formData.nationalId}
          onChange={onChange}
          className={cn(
            hasError('nationalId') ? "border-red-500 focus-visible:ring-red-500" : ""
          )}
        />
        {hasError('nationalId') && (
          <p className="text-sm text-red-500">{errors.nationalId}</p>
        )}
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
          onChange={onChange}
          className={cn(
            hasError('email') ? "border-red-500 focus-visible:ring-red-500" : ""
          )}
        />
        {hasError('email') && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
