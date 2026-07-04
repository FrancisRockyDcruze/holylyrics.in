import { useEffect, useState } from "react"; 
import { getSongs } from "../services/api";
import { 
  filterSongsByLanguage, 
  getAllTags, 
  getCategorySongs, 
  getCurrentSongs, 
  getTotalPages, 
  loadInitialSong 
} from "../utils/songUtils";
import { saveFavoriteToSheet } from "../services/fav_api";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../services/checkAdminAccess";
// import LoginCard from "../components/Admin_login_Card";
import { AdminAccess } from "../services/adminAccess";

export default function Landing() {
  const navigate = useNavigate();

  // State
  const [songs, setSongs] = useState([]);
  const [language, setLanguage] = useState("English");
  const [page, setPage] = useState(1);
  const [songsPerPage] = useState(20);
  const [selectedSong, setSelectedSong] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySongs, setCategorySongs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Filtered & paginated songs
  const filteredSongs = filterSongsByLanguage(songs, language);
  const currentSongs = getCurrentSongs(
    selectedCategory ? categorySongs : filteredSongs,
    page,
    songsPerPage
  );
  const totalPages = getTotalPages(
    selectedCategory ? categorySongs : filteredSongs,
    songsPerPage
  );

  const allTags = getAllTags(songs);

  // Load songs on mount
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await getSongs();
        if (data && data.length > 0) {
          setSongs(data);
          // default first song of selected language
          setSelectedSong(loadInitialSong(filterSongsByLanguage(data, language)));
        }
      } catch (err) {
        console.error("Failed to load songs:", err);
      }
    };
    loadSongs();
  }, []);

  // Ensure selectedSong always exists
  useEffect(() => {
    if (!selectedSong && currentSongs.length > 0) {
      setSelectedSong(currentSongs[0]);
    }
  }, [currentSongs, selectedSong]);

  // Toggle favorite
  const toggleFavorite = async (song) => {
    const newFav = song["Fav Added"] === 1 ? 0 : 1;
    setSongs((prevSongs) =>
      prevSongs.map((s) => (s.id === song.id ? { ...s, "Fav Added": newFav } : s))
    );
    try {
      await saveFavoriteToSheet(song, newFav);
    } catch (err) {
      console.warn("Could not save favorite to sheet:", err);
    }
  };

  // Pagination
  const goToPage = (num) => {
    if (num < 1 || num > totalPages) return;
    setPage(num);
  };

  // Language selection
  const handleLanguageClick = (lang) => {
    setLanguage(lang);
    setSelectedCategory(null);
    setPage(1);
    const langSongs = filterSongsByLanguage(songs, lang);
    setSelectedSong(langSongs[0] || null);
  };

  // Category selection
  const handleCategoryClick = (cat) => {
    const catSongs = getCategorySongs(songs, cat); // true = return all songs
      // console.log(catSongs);
    
      setSelectedCategory(cat);
      setCategorySongs(catSongs);
      setPage(1);
      setSelectedSong(catSongs[0] || null);
  };

  // Back to language
  const handleBackToLanguage = () => {
    setSelectedCategory(null);
    setPage(1);
    const langSongs = filterSongsByLanguage(songs, language);
    setSelectedSong(langSongs[0] || null);
  };

  // Search filtered songs
  const filteredSearchSongs = songs
    .filter((song) => song.Searchkey.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 20);

  const isAdmin = AdminAccess();

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      <main className="grid grid-cols-10 px-1 py-2 bg-bglightColor h-full min-h-0">

        {/* LEFT COLUMN */}
        <div className="col-span-2 grid grid-rows-[auto_1fr_auto] min-h-0">

          {/* Language / Category Header */}
          <div className="w-full grid grid-cols-1 gap-1 bg-white">
            {selectedCategory ? (
              <div className="flex flex-col items-center">
                <h4 className="font-bold text-center bg-bgColor text-white px-3 py-1 rounded mb-1">
                  Category: {selectedCategory}
                </h4>
                <button
                  className="px-3 py-1 border w-full hover:bg-bgColor hover:text-white transition"
                  onClick={handleBackToLanguage}
                >
                  ← Back to {language} Songs
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 border">
                {["Bengali", "English", "Hindi"].map((lang) => (
                  <button
                    key={lang}
                    className={`px-3 py-1 border w-full transition ${
                      language === lang
                        ? "bg-bgColor text-white"
                        : "hover:bg-bgColor hover:text-txtColor"
                    }`}
                    onClick={() => handleLanguageClick(lang)}
                  >
                    {lang}🎶
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Song List */}
          <div className="overflow-y-auto border min-h-0 bg-white">
            <ul className="w-full">
              {(selectedCategory ? categorySongs : currentSongs).map((song, i) => (
                <li
                  key={song.id}
                  className={`
                    cursor-pointer py-1 text-sm flex items-center justify-between px-2
                    ${i % 2 === 0 ? "bg-gray-200" : ""}
                    ${selectedSong?.id === song.id ? "bg-bgColor text-white" : ""}
                    hover:bg-bgColor hover:text-white transition
                  `}
                  onClick={() => setSelectedSong(song)}
                >
                  <span>🎵 {song["Title*"]}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(song);
                    }}
                  >
                    {isAdmin && (song["Fav Added"] === 1 ? "❤️" : "🤍")
                      
                    }
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pagination */}
          <div className="grid grid-cols-5 border rounded">
            <button className="px-2 py-1 hover:bg-bgColor hover:text-white transition" onClick={() => goToPage(page - 1)}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`transition ${page === i + 1 ? "bg-bgColor text-white" : ""}`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="px-2 py-1 hover:bg-bgColor hover:text-white transition" onClick={() => goToPage(page + 1)}>Next</button>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="col-span-6 flex flex-col items-center p-4 min-h-0">

          {/* Search */}
          <div className="w-full relative py-1 px-2 border-4 border-bgColor rounded-lg">
            <input
              type="text"
              placeholder="Search song..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-center py-3"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 
                          flex items-center justify-center 
                          rounded px-2 bg-gray-200 hover:bg-gray-300 text-sm"
              >
                clear
              </button>
            )}

            {search.length >= 3 && (
              <div className="absolute top-full left-0 w-full bg-gray-100 border max-h-[200px] overflow-y-auto mt-1 z-50 rounded shadow">
                {filteredSearchSongs.map((song, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 cursor-pointer hover:bg-bgColor hover:text-white"
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
          <div className="py-3 px-6 border w-full flex flex-col items-center mt-4 border-txtColor min-h-0">
            <h3 className="font-bold text-2xl mb-2 underline">
              {selectedSong ? selectedSong["Title*"] : "Select a song"}
            </h3>
            <div className="h-[400px] w-full overflow-y-auto text-center">
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: selectedSong
                    ? selectedSong["lyrics*"]
                    : "Select a song."
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-2 grid grid-rows-[auto_1fr_auto] min-h-0">
          {/* Updates */}
          <div className="border border-bgColor flex flex-col items-center p-2 m-2">
            <h3 className="underline text-xl font-bold m-2">Recent Updates</h3>
            <p className="bg-white w-full text-center rounded">New Song Added</p>
          </div>

          {/* Categories */}
          <div className="border border-bgColor py-3 flex flex-col items-center overflow-y-auto min-h-0">
            <h3 className="font-bold text-xl underline">Categories</h3>
            <ul className="space-y-1 w-full pt-3">
              {allTags.map((cat) => (
                <li key={cat}>
                  <button
                    className="w-full p-3 border rounded bg-white hover:bg-bgColor hover:text-white transition"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    🏷️ {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ads */}
          <div className="border border-bgColor flex items-center justify-center">
            Ad Space
          </div>
        </div>
      </main>
    
      {/* {showModal && (<LoginCard />)} */}
    </div>
  );
}