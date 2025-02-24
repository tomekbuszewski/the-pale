import en from "../../content/en.json";
import pl from "../../content/pl.json";
import { useContext } from "react";
import { LanguageContext } from "@context/Language";

const languages = { en, pl } as const;
type Languages = keyof typeof languages;

type DeepKeyOf<T> = {
  [K in keyof T]: T[K] extends object
    ? `${K & string}` | `${K & string}.${DeepKeyOf<T[K]>}`
    : `${K & string}`;
}[keyof T];

type TranslationValue<T, P> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? TranslationValue<T[K], R>
      : never
    : never;

type TranslateFunction = {
  <P extends DeepKeyOf<typeof en>>(path: P): TranslationValue<typeof en, P>;
  <P extends DeepKeyOf<typeof en>>(
    path: P,
    ...args: string[]
  ): TranslationValue<typeof en, P>;
  (path: string): string;
  (path: string, ...args: string[]): string;
};

export default function useTranslate() {
  const language = useContext(LanguageContext);

  if (!language) {
    throw new Error("No language found!");
  }

  const base = languages[language as Languages];

  function translate(path: string, ...args: string[]): string | string[] {
    const keys = path.split(".");
    let translation: unknown = base;

    for (const key of keys) {
      if (!translation || typeof translation !== "object") {
        return path;
      }
      translation = (translation as Record<string, unknown>)[key];
    }

    if (Array.isArray(translation)) {
      return translation.map((item: string) =>
        args.reduce((acc: string, arg: string) => {
          const pattern = new RegExp(`{{[^}]*}}`);
          return acc.replace(pattern, arg);
        }, item),
      );
    }

    if (typeof translation === "string") {
      return args.reduce((acc, arg) => {
        const pattern = new RegExp(`{{[^}]*}}`);
        return acc.replace(pattern, arg);
      }, translation);
    }

    return path;
  }

  return translate as TranslateFunction;
}
