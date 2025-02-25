export default function detectLanguageFromUrl({ url }: Request) {
  let language = new URL(url).pathname.split("/")[1];

  if (language !== "pl" && language !== "en") {
    language = "en";
  }

  return language;
}
