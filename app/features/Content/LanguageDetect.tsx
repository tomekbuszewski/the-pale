import { useContext, useEffect, useState } from "react";
import context from "./context";
import useTranslate from "./useTranslate";
import handleLanguageChange from "./handleLanguageChange";

import { ContactCta } from "@ui/molecules";

const COOKIE = "hideBannerForever=true";

export default function LanguageDetect() {
  const currentLanguage = useContext(context);
  const translate = useTranslate();
  const [showBanner, setShowBanner] = useState(false);

  function hideBannerForever() {
    setShowBanner(false);
    document.cookie = `${COOKIE}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }

  useEffect(() => {
    const isBannerHidden = document.cookie.includes("hideBannerForever=true");
    const browserLang = navigator.language.split("-")[0];

    const shouldShowBanner =
      !isBannerHidden &&
      ((browserLang === "pl" && currentLanguage !== "pl") ||
        (browserLang !== "pl" && currentLanguage === "pl"));

    setShowBanner(shouldShowBanner);
  }, [currentLanguage]);

  if (showBanner) {
    return (
      <ContactCta
        fixed
        text={translate("content.feature.text")}
        buttons={[
          {
            href: "",
            onClick: () => {
              hideBannerForever();
              handleLanguageChange(currentLanguage)(
                currentLanguage === "en" ? "pl" : "en",
              );
            },
            label: translate("content.feature.buttons.yes"),
          },
          {
            onClick: () => {
              hideBannerForever();
            },
            variant: "secondary",
            href: "",
            label: translate("content.feature.buttons.no"),
          },
        ]}
      />
    );
  }

  return null;
}
