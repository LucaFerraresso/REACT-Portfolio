import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa le traduzioni
import translationEN from "../src/translator/eng/eng.json";
import translationIT from "../src/translator/it/it.json";

// Configurazione di i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    it: {
      translation: translationIT,
    },
  },
  lng: "it", // Lingua predefinita
  fallbackLng: "en", // Lingua di fallback
  interpolation: {
    escapeValue: false, // React già gestisce la sicurezza contro XSS
  },
});

export default i18n;
