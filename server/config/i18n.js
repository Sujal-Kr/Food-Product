import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";

console.log("this is my cwd",process.cwd())

i18next
  .use(Backend) // Use file system backend to load translations
  .use(middleware.LanguageDetector) // Detect language from request
  .init({
    fallbackLng: "en", // Default language
    preload: ["en", "fr", "de"], // Load these languages
    backend: {
      loadPath: path.join(process.cwd(),  "locales", "{{lng}}.json"), // Path to translation files
    },
    detection: {
      order: ["querystring", "cookie", "header"], // Detect language from URL, cookies, or headers
      caches: ["cookie"], // Cache the language in a cookie
    },
    // debug: true, // Enable for debugging
  });

export default i18next;
export const i18nMiddleware = middleware.handle(i18next);
