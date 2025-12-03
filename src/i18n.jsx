// src/i18n.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./translations/en.json";
import hi from "./translations/hi.json";

const messages = { en, hi };

const DEFAULT_LOCALE = "en";
const STORAGE_KEY = "swastic_locale";

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (k, vars) => k
});

/**
 * Simple interpolation function
 * Replaces placeholders like {name} in strings with values from vars object.
 */
function interpolate(str, vars = {}) {
  if (!str || typeof str !== "string") return str;
  return str.replace(/\{(\w+)\}/g, (_, name) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? vars[name] : `{${name}}`
  );
}

/**
 * safeLookup: dot-path lookup into a nested object. Returns undefined if not found.
 */
function safeLookup(obj, path) {
  if (!obj || !path) return undefined;
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur && Object.prototype.hasOwnProperty.call(cur, p)) {
      cur = cur[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

export function LocaleProvider({ children }) {
  // Choose initial locale: localStorage -> browser -> DEFAULT_LOCALE
  const getInitialLocale = () => {
    try {
      const saved = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === "en" || saved === "hi")) return saved;
      const nav = typeof navigator !== "undefined" ? navigator.language || navigator.userLanguage : null;
      if (nav && nav.toLowerCase().startsWith("hi")) return "hi";
    } catch (e) {
      // ignore storage exceptions
    }
    return DEFAULT_LOCALE;
  };

  const [locale, setLocaleState] = useState(getInitialLocale);

  // Persist locale and update HTML lang attribute
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) {
      // ignore write errors (e.g., private mode)
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  // Setter that accepts either a locale string or a function like setState
  const setLocale = (value) => {
    setLocaleState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      return next === "hi" ? "hi" : "en";
    });
  };

  // translator: supports interpolation via second arg { varName: value }
  const t = (key, vars = {}) => {
    if (!key) return "";
    const msg = safeLookup(messages[locale], key);
    if (typeof msg === "string") return interpolate(msg, vars);
    // if translation is an array or object, return as-is (caller can handle)
    if (msg !== undefined) return msg;
    // fallback: try default locale before returning key
    const fallback = safeLookup(messages[DEFAULT_LOCALE], key);
    if (typeof fallback === "string") return interpolate(fallback, vars);
    return key;
  };

  // Memoize context value to avoid unnecessary re-renders
  const value = useMemo(() => ({ locale, setLocale, t }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// Hook to use translations and locale
export const useLocale = () => useContext(LocaleContext);
