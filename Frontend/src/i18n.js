import i18n from 'i18next';
import {
  initReactI18next
} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './english.json';
import arTranslation from './arabic.json';


const storedLanguage = sessionStorage.getItem('selectedLanguaged');
const initialLanguage = storedLanguage || 'ar';

const dynamicTranslations = {
  ar: {},
  en: {},
};

// Function to fetch translations
const fetchTranslations = async () => {
  try {
    const response = await fetch('http://localhost:3091/translations');
    const data = await response.json();

    if (data) {
      const dataArray = Object.entries(data);

      dataArray.forEach(([key, value], index) => {
        dynamicTranslations.ar[key] = value;
        dynamicTranslations.en[key] = key;
      });

      // Initialize i18n before fetching translations
      i18n
        .use(LanguageDetector)
        .use(initReactI18next) // Move initReactI18next here
        .init({
          dynamicTranslations: {},
          fallbackLng: ['ar', 'en'],
          detection: {
            order: ['navigator'],
          },
          interpolation: {
            escapeValue: false,
          },
          lng: initialLanguage,
          debug: true,
        });

      // Add resource bundles after initializing i18n
      i18n.addResourceBundle('ar', 'translation', dynamicTranslations.ar);
      i18n.addResourceBundle('en', 'translation', dynamicTranslations.en);
    }
  } catch (error) {
    console.error('Error fetching translations:', error);
  }
};

// Call the fetchTranslations function
// fetchTranslations();
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      escapeValue: false,
    },
    lng: initialLanguage,
  });

export default i18n;
