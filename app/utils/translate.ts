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
