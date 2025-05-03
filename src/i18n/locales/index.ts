
import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import { ar } from './ar';

export const messages = {
  en,
  fr,
  es,
  ar
};

export type Language = 'en' | 'fr' | 'es' | 'ar';

export interface LanguageOption {
  code: Language;
  name: string;
  isRTL: boolean;
}

export const languageOptions: LanguageOption[] = [
  { code: 'fr', name: 'Français', isRTL: false },
  { code: 'en', name: 'English', isRTL: false },
  { code: 'es', name: 'Español', isRTL: false },
  { code: 'ar', name: 'العربية', isRTL: true }
];
