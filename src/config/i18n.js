import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your language files
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation
    },
    es: {
      translation: esTranslation
    }
  },
  lng: "en", // default language
  fallbackLng: "en", // fallback language
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
