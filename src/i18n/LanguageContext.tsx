
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { messages, Language, languageOptions } from './locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  defaultLanguage: Language;
  setDefaultLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Retrieve language from localStorage or use default 'fr'
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('userLanguage');
    return (savedLanguage as Language) || getDefaultLanguage();
  });

  const [defaultLanguage, setDefaultLanguageState] = useState<Language>(() => {
    const savedDefault = localStorage.getItem('defaultLanguage');
    return (savedDefault as Language) || 'fr';
  });

  // Function to get the default language from localStorage or use 'fr'
  function getDefaultLanguage(): Language {
    const savedDefault = localStorage.getItem('defaultLanguage');
    return (savedDefault as Language) || 'fr';
  }

  // Set language and store in localStorage
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('userLanguage', newLanguage);
    setLanguageState(newLanguage);
  };

  // Set default language and store in localStorage
  const setDefaultLanguage = (newDefaultLanguage: Language) => {
    localStorage.setItem('defaultLanguage', newDefaultLanguage);
    setDefaultLanguageState(newDefaultLanguage);
  };

  // Determine text direction based on language
  const isRTL = languageOptions.find(lang => lang.code === language)?.isRTL || false;
  const dir = isRTL ? 'rtl' : 'ltr';

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof value === 'string') {
      return value;
    }
    
    console.warn(`Translation value is not a string: ${key}`);
    return key;
  };

  // Apply RTL/LTR styling to document
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.lang = language;
    
    // Add RTL class to body for global styling if needed
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    return () => {
      document.body.classList.remove('rtl');
    };
  }, [language, dir, isRTL]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        dir, 
        isRTL, 
        defaultLanguage,
        setDefaultLanguage 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
