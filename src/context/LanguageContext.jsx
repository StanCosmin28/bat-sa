import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ro from '../locales/ro.json';

const LOCALES = { EN: en, FR: fr, RO: ro };
const SUPPORTED_LANGS = ['EN', 'FR', 'RO'];
const STORAGE_KEY = 'bat-lang';

// Read from localStorage synchronously during initialization to avoid flash on refresh
function getInitialLang() {
  if (typeof window === 'undefined') return 'EN';
  const stored = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGS.includes(stored) ? stored : 'EN';
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = (newLang) => {
    if (!SUPPORTED_LANGS.includes(newLang)) return;
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.lang = newLang.toLowerCase();
  };

  // Sync html[lang] attribute on mount
  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, []);

  const t = (key) => LOCALES[lang]?.[key] ?? LOCALES['EN']?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, supportedLangs: SUPPORTED_LANGS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
