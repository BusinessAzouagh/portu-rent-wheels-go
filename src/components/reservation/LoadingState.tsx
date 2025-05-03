
import { useLanguage } from "@/i18n/LanguageContext";

const LoadingState = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-center">
      <div className="animate-pulse">{t('common.loading')}</div>
    </div>
  );
};

export default LoadingState;
