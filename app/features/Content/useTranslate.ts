import { useContext } from "react";
//
import en from "./translations/en.json";
import pl from "./translations/pl.json";

import LanguageContext from "./context";

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

const singleLetterWords = [
  "i",
  "a",
  "o",
  "w",
  "z",
  "u",
  "in",
  "and",
  "of",
  "&",
];

// Function to prevent widows by replacing spaces after single-letter words
function preventWidows(text: string): string {
  // Replace any single letter word followed by a space with the same word followed by a non-breaking space
  return singleLetterWords.reduce((current, word) => {
    // Using word boundaries (\b) before and after to ensure we only match standalone single letters
    const regex = new RegExp(`(^|\\s)${word}(\\s)`, "g");
    return current.replace(regex, `$1${word}\u00A0`);
  }, text);
}

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
      return translation.map((item: string) => {
        let processed = args.reduce((acc: string, arg: string) => {
          const pattern = new RegExp(`{{[^}]*}}`);
          return acc.replace(pattern, arg);
        }, item);

        // Apply widow prevention to each array item
        return preventWidows(processed);
      });
    }

    if (typeof translation === "string") {
      let processed = args.reduce((acc, arg) => {
        const pattern = new RegExp(`{{[^}]*}}`);
        return acc.replace(pattern, arg);
      }, translation);

      // Apply widow prevention to the string
      return preventWidows(processed);
    }

    return path;
  }

  return translate as TranslateFunction;
}
