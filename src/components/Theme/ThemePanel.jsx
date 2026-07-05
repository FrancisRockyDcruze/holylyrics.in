import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

const DEFAULT_THEME = {
  background: "#fd871e",
  text: "#000000",
  light: "#fddec6",
};
// fd871e

export default function ThemePanel({setShowThemeMenu}) {
    const [activeColor, setActiveColor] = useState("background");
    const [autoContrast, setAutoContrast] = useState(true);
    const [colors, setColors] = useState(DEFAULT_THEME);

    useEffect(() => {
        const savedTheme = localStorage.getItem("holyLyricsTheme");

        if (savedTheme) {
            setColors(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--bgColor",
            hexToRgb(colors.background)
        );

        document.documentElement.style.setProperty(
            "--txtColor",
            hexToRgb(colors.text)
        );

        document.documentElement.style.setProperty(
            "--bglightColor",
            hexToRgb(colors.light)
        );
    }, [colors]);

    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r} ${g} ${b}`;
    }

    function getBrightness(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    function lightenColor(hex, percent) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const nr = Math.round(r + (255 - r) * percent);
        const ng = Math.round(g + (255 - g) * percent);
        const nb = Math.round(b + (255 - b) * percent);

        return (
            "#" +
            nr.toString(16).padStart(2, "0") +
            ng.toString(16).padStart(2, "0") +
            nb.toString(16).padStart(2, "0")
        );
    }

    function saveTheme() {
        localStorage.setItem("holyLyricsTheme", JSON.stringify(colors));
        setShowThemeMenu(false);
        // alert("Theme Saved Successfully!");
    }

    function resetTheme() {
        setColors(DEFAULT_THEME);

        localStorage.setItem(
            "holyLyricsTheme",
            JSON.stringify(DEFAULT_THEME)
        );
        setShowThemeMenu(false);

    }

    function applyTheme(theme) {
        document.documentElement.style.setProperty(
            "--bgColor",
            hexToRgb(theme.background)
        );

        document.documentElement.style.setProperty(
            "--txtColor",
            hexToRgb(theme.text)
        );

        document.documentElement.style.setProperty(
            "--bglightColor",
            hexToRgb(theme.light)
        );
    }

    function closeTheme() {
        const savedTheme = localStorage.getItem("holyLyricsTheme");

        const theme = savedTheme
        ? JSON.parse(savedTheme)
        : DEFAULT_THEME;

        applyTheme(theme);     // Immediately restore CSS variables
        setColors(theme);      // Keep component state in sync

        setShowThemeMenu(false);
    }
  
    return (
    <div className="border rounded p-3 w-[300px] bg-bgColor">
        <div className="flex justify-between">
            <h2 className="p-2 text-xl font-bold text-center">
            🎨 Theme
            </h2>
            <button className="text-4xl" onClick={closeTheme}>
                x
            </button>
        </div>

        <div className="flex flex-col items-center">
           <HexColorPicker
                color={colors[activeColor]}
                onChange={(newColor) => {

                if (autoContrast && activeColor === "background") {

                    const brightness = getBrightness(newColor);

                    setColors({
                    background: newColor,
                    text: brightness > 130 ? "#000000" : "#FFFFFF",
                    light: lightenColor(newColor, 0.7),
                    });

                } else {

                    setColors({
                    ...colors,
                    [activeColor]: newColor,
                    });

                }

                }}
            />
        </div>

        <div>
            <div
                onClick={() => setActiveColor("background")}
                className={`cursor-pointer rounded m-2 border-black bg-bglightColor ${
                    activeColor === "background"
                    ? "border-2"
                    : "border"
                }`}
                >
                <p className="font-semibold">
                    Background
                </p>

                <div
                    className="h-5 mt-2 border-t border-black"
                    style={{ background: colors.background }}
                />
            </div>

            <div
                onClick={() => {
                    if (!autoContrast) {
                        setActiveColor("text");
                    }
                }}
                className={`cursor-pointer rounded m-2 border border-black bg-bgColor ${
                    autoContrast ? "opacity-50 cursor-not-allowed border" : `${
                    activeColor === "text"
                    ? "border-2 border"
                    : "border"
                }`}
                }`}
                >
                <p className="font-semibold">
                    Text
                </p>

                <div
                    className="h-5 border-t border-black mt-2"
                    style={{ background: colors.text }}
                />
            </div>

            <div
                onClick={() => {
                    if (!autoContrast) {
                        setActiveColor("light");
                    }
                }}
                className={`cursor-pointer rounded m-2 border-black bg-txtColor ${
                    autoContrast ? "opacity-50 cursor-not-allowed border" : `${
                    activeColor === "light"
                    ? "border-2"
                    : "border"
                }`}
                }`}
                >
                <p className="font-semibold">
                    Light
                </p>

                <div
                    className="h-5 border-black border-t mt-2"
                    style={{ background: colors.light }}
                />
            </div>

        </div>
        
        <div className="flex items-center justify-between mt-4 px-1">

            <div>
                <h3 className="font-semibold text-lg px-3 text-black">
                Auto Contrast
                </h3>

                <p className="text-sm text-black px-3">
                Automatically adjusts Text & Light colors
                </p>
            </div>

            <div className="flex flex-col items-center gap-3">

            <div className="text-sm font-semibold text-bgColor">
                {autoContrast ? "ON" : "OFF"}
            </div>

            <button
                onClick={() => setAutoContrast(!autoContrast)}
                className={`relative inline-flex h-7 w-14 items-center border rounded-full transition-all duration-300 ${
                autoContrast ? "bg-green-600" : "bg-gray-400"
                }`}
            >
                <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                    autoContrast ? "translate-x-8" : "translate-x-1"
                }`}
                />
            </button>

        </div>

        </div>

        <div>
            <button
                onClick={saveTheme}
                className="w-full mt-6 bg-bgColor border text-txtColor py-3 rounded-lg font-bold hover:opacity-90 transition"
                >
                Save Theme
            </button>
            
            <button
                onClick={resetTheme}
                className="w-full mt-3 border bg-bgColor border text-txtColor py-3 rounded-lg font-bold transition"
                >
                ♻ Reset Theme
            </button>
        </div>
    </div>
  );
}