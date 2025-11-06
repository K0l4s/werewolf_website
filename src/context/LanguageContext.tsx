import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import languages from '../locales';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Record<string, any>;
  currentLang: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const savedLang = (localStorage.getItem('lang') as Language) || 'en';
  const [currentLang, setCurrentLang] = useState<Language>(savedLang);

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: languages[currentLang],
        currentLang,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
