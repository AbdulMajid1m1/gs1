import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './english.json';
import arTranslation from './arabic.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // detects user's language
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    fallbackLng: 'en', // fallback language
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      escapeValue: false, // not needed for React
    }, 
    lng: 'ar',
  });

export default i18n;