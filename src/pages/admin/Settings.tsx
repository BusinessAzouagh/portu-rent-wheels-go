
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageOptions, Language } from "@/i18n/locales";
import AdminLayout from "./AdminLayout";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const navigate = useNavigate();
  const { t, defaultLanguage, setDefaultLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(defaultLanguage);

  const handleSaveDefaultLanguage = () => {
    setDefaultLanguage(selectedLanguage);
    toast.success(t('admin.languageSettings'), {
      description: t('admin.changeLanguage'),
    });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('admin.settings')}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.languageSettings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-2">
                {t('admin.defaultLanguage')}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {t('admin.applicationLanguage')}
              </p>

              <RadioGroup 
                value={selectedLanguage}
                onValueChange={(value: Language) => setSelectedLanguage(value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                {languageOptions.map((option) => (
                  <div 
                    key={option.code}
                    className="flex items-center space-x-2 border p-3 rounded-md"
                  >
                    <RadioGroupItem value={option.code} id={`lang-${option.code}`} />
                    <Label htmlFor={`lang-${option.code}`}>{option.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleSaveDefaultLanguage}
                disabled={selectedLanguage === defaultLanguage}
              >
                {t('common.save')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
