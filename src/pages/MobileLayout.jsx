// MobileLayout.jsx
import React, { useState, useRef } from "react";
import { filterSongsByLanguage } from "../utils/songUtils";
import FavMobileLayout from "./FavMobileLayout";
// import {pdfFormats} from "../utils/pdfFormat";

export default function MobileLayout({
  songs,
  selectedSong,
  setSelectedSong,
  search,
  setSearch,
  toggleFavorite,
  loading,
  reload
}) {

  const [overlay, setOverlay] = useState(null); // "categories" | "favorites" | "updates" | "song"
  const [showBottomTabs, setShowBottomTabs] = useState(true);
  const lastScroll = useRef(0);
  const [language, setLanguage] = useState("English");

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    if (scrollTop > lastScroll.current + 20) setShowBottomTabs(false);
    else if (scrollTop < lastScroll.current - 20 || scrollTop < 50) setShowBottomTabs(true);

    lastScroll.current = scrollTop;
  };

  const filteredSongs = filterSongsByLanguage(songs, language);
  const searchedSongs = filteredSongs.filter((song) =>
    song.Searchkey.toLowerCase().includes(search.toLowerCase())
  );

  const openSong = (song) => {
    setSelectedSong(song);
    setOverlay("song");
  };

  const handleUpload = () => alert("Upload functionality not implemented yet");

  // ---------------- Overlays ----------------
  const renderOverlay = () => {
    if (!overlay) return null;
    const closeOverlay = () => setOverlay(null);

    if (overlay === "song") {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center border-b">
            <button onClick={closeOverlay} className="text-xl">⬅ Back</button>
            <h2 className="text-lg font-bold">{selectedSong?.["Title*"]}</h2>
            <button
              onClick={() => toggleFavorite(selectedSong)}
              className="text-xl"
            >
              {selectedSong?.["Fav Added"] === 1 ? "❤️" : "🤍"}
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: selectedSong?.["lyrics*"] }}
            />
          </div>
        </div>
      );
    }

    if (overlay === "categories") {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center border-b">
            <button onClick={closeOverlay} className="text-xl">⬅ Back</button>
            <h2 className="text-lg font-bold">Categories</h2>
            <div></div>
          </div>
          <div className="p-4 flex flex-col space-y-2">
            {["Praise", "Worship", "Christmas"].map((cat) => (
              <button
                key={cat}
                className="p-3 border rounded text-center hover:bg-bgColor hover:text-white"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (overlay === "favorites") {
      return (
        <FavMobileLayout
          songs={songs}
          loading={loading}
          reload={reload}
          closeFav={() => setOverlay(null)} // unified prop
        />
      );
    }

    if (overlay === "updates") {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center border-b">
            <button onClick={closeOverlay} className="text-xl">⬅ Back</button>
            <h2 className="text-lg font-bold">Updates</h2>
            <div></div>
          </div>
          <div className="p-4 flex flex-col space-y-2">
            <p>Good Friday is coming...</p>
            <p>New songs added!</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Only show main landing when NOT showing Favorites */}
      {overlay !== "favorites" && (
        <>
          {/* ---------------- Header ---------------- */}
          <div className="flex justify-between items-center p-4 border-b bg-orange-100">
            <h1 className="text-xl font-bold">Holy Lyrical</h1>
            <button onClick={handleUpload} className="px-3 py-1 border rounded">⬆ Upload</button>
          </div>

          {/* ---------------- Language Selector ---------------- */}
          <div className="flex overflow-x-auto p-2 space-x-2 border-b bg-gray-50">
            {["English", "Hindi", "Bengali"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 border rounded ${language === lang ? "bg-bgColor text-white" : ""}`}
              >
                {lang} 🎶
              </button>
            ))}
          </div>

          {/* ---------------- Body: Search + Song List ---------------- */}
          <div
            className="flex-1 overflow-y-auto px-4 py-2"
            onScroll={handleScroll}
          >
            <input
              type="text"
              placeholder="Search song..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded mb-4"
            />
            <div className="flex flex-col space-y-2">
              {searchedSongs.map((song) => (
                <button
                  key={song.id}
                  className="p-3 border rounded text-left hover:bg-bgColor hover:text-white"
                  onClick={() => openSong(song)}
                >
                  {song["Title*"]}
                </button>
              ))}
            </div>
          </div>

          {/* ---------------- Bottom Tabs ---------------- */}
          <div
            className={`fixed bottom-0 left-0 w-full bg-white border-t transition-transform duration-300 ${showBottomTabs ? "translate-y-0" : "translate-y-full"}`}
          >
            <div className="flex justify-around py-3">
              <button className="text-center" onClick={() => setOverlay("categories")}>Categories</button>
              <button className="text-center" onClick={() => setOverlay("favorites")}>Favorites</button>
              <button className="text-center" onClick={() => setOverlay("updates")}>Updates</button>
            </div>
          </div>
        </>
      )}

      {/* ---------------- Overlays ---------------- */}
      {renderOverlay()}
    </div>
  );
}