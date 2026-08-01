import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LANGUAGES } from "../config.js";

export default function SelectLanguage()
{
    const navigate = useNavigate();
    const [showLanguages, setShowLanguages] = useState(false);
    
    return (
        <div className="relative text-txtColor">
                <button
                    onClick={() => setShowLanguages(!showLanguages)}
                    className="text-sm border rounded-tl rounded-tr px-1 py-1 bg-bglightColor flex items-center gap-1"
                >
                    Languages
                    <span
                    className={`transition-transform duration-300 ${
                        showLanguages ? "rotate-180" : ""
                    }`}
                    >
                    ▼
                    </span>
                </button>

                {showLanguages && (
                    <div className="absolute left-0 bg-bgColor text-bglightColor border rounded-bl rounded-br shadow-lg z-50 overflow-hidden text-center">
                    <button
                        className="text-left px-4 py-2 border-b"
                        onClick={() => {
                          navigate(`/mass/${LANGUAGES.english.route}`);
                        }}
                    >
                        English
                    </button>

                    <button
                        className="text-left px-4 py-2 border-b"
                        onClick={() => {
                          navigate(`/mass/${LANGUAGES.bengali.route}`);
                        }}
                    >
                        Bengali
                    </button>

                    <button
                        className="text-left px-4 py-2"
                         onClick={() => {
                          navigate(`/mass/${LANGUAGES.hindi.route}`);
                        }}
                    >
                        Hindi
                    </button>
                    </div>
                )}
            </div>
    )
}