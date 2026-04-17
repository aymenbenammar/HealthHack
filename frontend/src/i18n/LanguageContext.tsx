import React, { createContext, useContext, useState } from 'react';
import { LangCode, Translations, translationsMap, BUNDESLAENDER } from './translations';

interface LanguageContextValue {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: Translations;
  bundesland: string;
  setBundesland: (value: string) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translationsMap['en'],
  bundesland: BUNDESLAENDER[0].value,
  setBundesland: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LangCode>('en');
  const [bundesland, setBundesland] = useState(BUNDESLAENDER[0].value);

  const setLang = (code: LangCode) => setLangState(code);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translationsMap[lang], bundesland, setBundesland }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
