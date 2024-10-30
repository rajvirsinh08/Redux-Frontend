import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import erTranslate from 'Locales/enTranslate';
import frTranslate from 'Locales/frTranslate';

// Translation resources
const resources = {
  en: {
    translation: erTranslate,
  },
  fr: {
    translation: frTranslate,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    // lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
