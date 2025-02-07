import en from "../content/en.json";

type Languages = "en";
type TranslationKey = keyof typeof en;
const translations = {
  en,
};

function getCurrentLanguage(): Languages {
  if (typeof document === "undefined") return "en";

  const cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("language="));

  return (cookie ? cookie.split("=")[1] : "en") as Languages;
}

export function translate(key: TranslationKey, ...args: string[]) {
  const currentLanguage = getCurrentLanguage();
  const translation = translations[currentLanguage][key] as string;

  if (!translation) {
    console.warn(`Translation for key "${key}" not found.`);
    return key;
  }

  return args.reduce((acc, arg) => {
    const pattern = new RegExp(`{{[^}]*}}`);
    return acc.replace(pattern, arg);
  }, translation);
}

export function setLanguage(lang: Languages) {
  document.cookie = `language=${lang}; path=/; max-age=31536000`;
}
