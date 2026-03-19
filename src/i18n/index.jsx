import { createContext, useContext, useState } from "react";
import es from "./es.js";
import en from "./en.js";
import pt from "./pt.js";

const LANGS = { es, en, pt };
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "es");

  const changeLang = (l) => {
    localStorage.setItem("lang", l);
    setLang(l);
  };

  const t = (key) => LANGS[lang]?.[key] ?? LANGS.es[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
