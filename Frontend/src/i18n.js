import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import enTranslation from './english.json';
// import arTranslation from './arabic.json';

const storedLanguage = sessionStorage.getItem('selectedLanguaged');
const initialLanguage = storedLanguage || 'ar';
// const resources = {};
const dynamicTranslations = {
  ar: {},
  en: {},
};
// Fetch English translation from API
fetch('http://localhost:3091/translations')
  .then(response => response.json())
  .then(data => {
    if (data) {
      const dataArray = Object.entries(data);


      dataArray.forEach(([key, value], index) => {
        dynamicTranslations.ar[key] = value;
        dynamicTranslations.en[key] = key;
      });
      i18n.addResourceBundle('ar', 'translation', dynamicTranslations.ar);
      i18n.addResourceBundle('en', 'translation', dynamicTranslations.en);
    }

  });
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // detects user's language
  .init({
    dynamicTranslations: {},
    fallbackLng: ['ar', 'en'], // fallback language
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      escapeValue: false, // not needed for React
    },
    lng: initialLanguage,
    debug: true,
  });

export default i18n;