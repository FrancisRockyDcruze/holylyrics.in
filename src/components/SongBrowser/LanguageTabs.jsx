import { useState } from "react";

export default function LanguageTabs({ language, setLanguage }) {
    return (
        <div className="flex overflow-x-auto px-3 py-2 space-x-2 border-b bg-gray-50 justify-around text-txtColor">
            {["English", "Hindi", "Bengali"].map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-2 border rounded ${
                        language === lang ? "bg-bgColor" : ""
                    }`}
                >
                    {lang} 🎶
                </button>
            ))}
        </div>
    );
}