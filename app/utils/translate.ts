import en from "../content/en.json";

type Languages = "en";
type TranslationKey = keyof typeof en;
const translations = {
  en,
};

export function getCurrentLanguage(): Languages {
  if (typeof document === "undefined") return "en";

  const cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("language="));

  return (cookie ? cookie.split("=")[1] : "en") as Languages;
}

export function translate(
  key: TranslationKey,
  ...args: string[]
): string | string[] {
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

export function setDefaultLanguage(request: Request, headers: Headers) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const languageCookie = cookieHeader
    .split(";")
    .find((cookie) => cookie.trim().startsWith("language="));
  const language = languageCookie ? languageCookie.split("=")[1] : "en";

  headers.append(
    "Set-Cookie",
    `language=${language}; Path=/; Max-Age=31536000`,
  );
}
