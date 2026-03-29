import { useEffect, useState } from "react";
import { getSongs } from "../services/api";
import {
  filterSongsByLanguage,
  getCurrentSongs,
  getTotalPages,
  loadInitialSong,
} from "../utils/songUtils";
import { saveFavoriteToSheet } from "../services/fav_api";

export default function Landing() {
  const [songs, setSongs] = useState([]);
  const [language, setLanguage] = useState("English");
  const [page, setPage] = useState(1);
  const [songsPerPage] = useState(20);
  const [selectedSong, setSelectedSong] = useState(null);
  const [search, setSearch] = useState("");

  // Filtered + paginated songs
  const filteredSongs = filterSongsByLanguage(songs, language);
  const currentSongs = getCurrentSongs(filteredSongs, page, songsPerPage);
  const totalPages = getTotalPages(filteredSongs, songsPerPage);

  // Load songs
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await getSongs();
        if (data && data.length > 0) {
          setSongs(data);
          setSelectedSong(loadInitialSong(data));
        }
      } catch (err) {
        console.error("Failed to load songs:", err);
      }
    };
    loadSongs();
  }, []);

  // ✅ FIX: Don't override user selection
  useEffect(() => {
    if (!selectedSong && currentSongs.length > 0) {
      setSelectedSong(currentSongs[0]);
    }
  }, [currentSongs, selectedSong]);

  // Toggle favorite
  const toggleFavorite = async (song) => {
    const newFav = song["Fav Added"] === 1 ? 0 : 1;

    setSongs((prev) =>
      prev.map((s) =>
        s.id === song.id ? { ...s, "Fav Added": newFav } : s
      )
    );

    try {
      await saveFavoriteToSheet(song, newFav);
    } catch (err) {
      console.warn("Could not save favorite:", err);
    }
  };

  // Search filter
  const filteredSearchSongs = songs
    .filter((song) =>
      song.Searchkey?.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 20);

  // Pagination
  const goToPage = (num) => {
    if (num < 1 || num > totalPages) return;
    setPage(num);
  };

  // Language change
  const handleLanguageClick = (lang) => {
    setLanguage(lang);
    setPage(1);

    const langSongs = filterSongsByLanguage(songs, lang);
    setSelectedSong(langSongs[0] || null);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <main className="grid grid-cols-10 px-1 py-2 bg-orange-100">
        
        {/* LEFT PANEL */}
        <div className="col-span-2 grid grid-rows-[auto_1fr_auto] gap-2 bg-txtColor">

          {/* Language */}
          <div className="grid grid-cols-3 gap-1">
            {["Bengali", "English", "Hindi"].map((lang) => (
              <button
                key={lang}
                className={`px-3 py-1 border ${
                  language === lang
                    ? "bg-bgColor text-white"
                    : "hover:bg-bgColor hover:text-txtColor"
                }`}
                onClick={() => handleLanguageClick(lang)}
              >
                {lang} 🎶
              </button>
            ))}
          </div>

          {/* Song List */}
          <div className="overflow-y-auto border py-3">
            <ul>
              {currentSongs.map((song, i) => (
                <li
                  key={song.id}
                  onClick={() => setSelectedSong(song)}
                  className={`cursor-pointer py-1 text-sm flex justify-between px-2
                    ${i % 2 === 0 ? "bg-gray-300" : ""}
                    ${
                      selectedSong?.id === song.id
                        ? "bg-bgColor text-white"
                        : ""
                    }
                    hover:bg-bgColor hover:text-white`}
                >
                  <span>🎵 {song["Title*"]}</span>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(song);
                    }}
                  >
                    {song["Fav Added"] === 1 ? "❤️" : "🤍"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pagination */}
          <div className="grid grid-cols-5 border">
            <button onClick={() => goToPage(page - 1)}>Prev</button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "bg-bgColor text-white" : ""}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button onClick={() => goToPage(page + 1)}>Next</button>
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className="col-span-6 flex flex-col items-center p-4">

          {/* Search */}
          <div className="w-full relative border-4 border-bgColor rounded-lg">
            <input
              type="text"
              placeholder="Search song..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-center py-3"
            />

            {search.length >= 3 && (
              <div className="absolute w-full bg-white border max-h-[200px] overflow-y-auto z-50">
                {filteredSearchSongs.map((song, i) => (
                  <div
                    key={i}
                    className="p-2 cursor-pointer hover:bg-bgColor hover:text-white"
                    onClick={() => {
                      setSelectedSong(song);
                      setSearch("");
                    }}
                  >
                    {song["Title*"]}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lyrics */}
          <div className="mt-4 w-full border p-4 text-center">
            <h3 className="text-2xl font-bold mb-2">
              {selectedSong?.["Title*"] || "Select a song"}
            </h3>

            <div className="h-[400px] overflow-y-auto whitespace-pre-wrap">
              {selectedSong?.["lyrics*"] || "No lyrics available"}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-2 grid grid-rows-[2fr_3fr_1fr]">

          <div className="border flex items-center justify-center">
            <p>Recent Updates</p>
          </div>

          <div className="border flex flex-col items-center">
            <h3 className="font-bold">Categories</h3>
            <ul>
              <li>Praise</li>
              <li>Worship</li>
              <li>Christmas</li>
            </ul>
          </div>

          <div className="border flex items-center justify-center">
            Ad Space
          </div>
        </div>

      </main>
    </div>
  );
}