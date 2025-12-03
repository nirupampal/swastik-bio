// src/components/LanguageSwitcher.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "../i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const languages = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिंदी" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2"
    >
      {languages.map((lang) => {
        const active = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            aria-label={`Switch language to ${lang.label}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${
                active
                  ? "bg-green-600 text-white shadow-md shadow-green-200"
                  : "text-slate-600 hover:text-green-700 hover:bg-green-50"
              }
            `}
          >
            {lang.label}
          </button>
        );
      })}
    </motion.div>
  );
}
