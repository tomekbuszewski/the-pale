export default function handleLanguageChange(language: string = "en") {
  return (lang: string) => {
    const currentPath = window.location.pathname;

    const langMatch = currentPath.match(/^\/(en|pl)\//);

    if (lang !== language) {
      const baseUrl = window.location.origin;
      const newPath = langMatch
        ? currentPath.replace(/^\/(en|pl)\//, lang === "en" ? "/" : `/${lang}/`)
        : lang === "en"
          ? currentPath.replace("/pl", "")
          : `/${lang}${currentPath}`;

      document.startViewTransition();
      window.location.href = baseUrl + newPath;
    }
  };
}
