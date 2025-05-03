
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerFormData } from "@/types/reservation";
import { useLanguage } from "@/i18n/LanguageContext";

interface CustomerFormProps {
  formData: CustomerFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerForm = ({ formData, onChange }: CustomerFormProps) => {
  const { t } = useLanguage();
  
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
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('reservation.firstName')} <span className="text-red-500">*</span></Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CustomerForm;
