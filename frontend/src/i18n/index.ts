import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import pt from './locales/pt.json';
import hi from './locales/hi.json';
import de from './locales/de.json';
import yo from './locales/yo.json';
import ha from './locales/ha.json';
import ig from './locales/ig.json';
import sw from './locales/sw.json';
import tl from './locales/tl.json';
import id from './locales/id.json';
import ur from './locales/ur.json';
import pcm from './locales/pcm.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      ar: { translation: ar },
      pt: { translation: pt },
      hi: { translation: hi },
      de: { translation: de },
      yo: { translation: yo },
      ha: { translation: ha },
      ig: { translation: ig },
      sw: { translation: sw },
      tl: { translation: tl },
      id: { translation: id },
      ur: { translation: ur },
      pcm: { translation: pcm },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
