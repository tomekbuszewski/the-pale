import en from "../content/en-nested.json";

type Languages = "en";
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof en>;

type TranslationValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? TranslationValue<T[K], R>
      : never
    : never;

const translations: Record<Languages, typeof en> = {
  en,
};

export function getCurrentLanguage(): Languages {
  if (typeof document === "undefined") return "en";

  const cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("language="));

  return (cookie ? cookie.split("=")[1] : "en") as Languages;
}
export function translate<K extends TranslationKey>(
  path: K extends string
    ? TranslationValue<typeof en, K> extends string[]
      ? K
      : never
    : never,
  ...args: string[]
): string[];
export function translate<K extends TranslationKey>(
  path: K extends string
    ? TranslationValue<typeof en, K> extends string
      ? K
      : never
    : never,
  ...args: string[]
): string;
export function translate(path: TranslationKey, ...args: string[]) {
  const currentLanguage = getCurrentLanguage();
  const keys = path.split(".");

  let translation: unknown = translations[currentLanguage];

  for (const key of keys) {
    if (!translation || typeof translation !== "object") {
      console.warn(`Translation path "${path}" is invalid.`);
      return path;
    }
    translation = (translation as Record<string, unknown>)[key];
  }

  if (translation === undefined) {
    console.warn(`Translation for path "${path}" not found.`);
    return path;
  }

  // Handle array translations with replacements
  if (Array.isArray(translation)) {
    return translation.map((item: string) =>
      args.reduce((acc: string, arg: string) => {
        const pattern = new RegExp(`{{[^}]*}}`);
        return acc.replace(pattern, arg);
      }, item),
    );
  }

  // Handle string translations with replacements
  if (typeof translation === "string") {
    return args.reduce((acc, arg) => {
      const pattern = new RegExp(`{{[^}]*}}`);
      return acc.replace(pattern, arg);
    }, translation);
  }

  // If translation is neither an array nor a string, return the path
  return path;
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
