import { translate } from "./translate";

describe("translate utility", () => {
  test("translates simple strings correctly", () => {
    expect(translate("contact-button.label")).toBe("Contact me");
    expect(translate("menu-toggle.open")).toBe("Open menu");
  });

  test("replaces variables in strings correctly", () => {
    expect(translate("footer-section.copyright", "2025")).toBe(
      "© 2008 - 2025<br />All rights reserved.",
    );
  });
});
