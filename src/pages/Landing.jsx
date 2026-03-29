import { useEffect, useState } from "react"; 
import { getSongs } from "../services/api";
import { filterSongsByLanguage, getCurrentSongs, getTotalPages, loadInitialSong } from "../utils/songUtils";
import { saveFavoriteToSheet } from "../services/fav_api";

export default function Landing() {
  const [songs, setSongs] = useState([]);           
  const [language, setLanguage] = useState("English"); 
  const [page, setPage] = useState(1);             
  const [songsPerPage] = useState(20);             
  const [selectedSong, setSelectedSong] = useState(null); 
  const [search, setSearch] = useState("");
  // const [favorites, setFavorites] = useState([]);
  const filteredSongs = filterSongsByLanguage(songs, language);
  const currentSongs = getCurrentSongs(filteredSongs, page, songsPerPage);
  const totalPages = getTotalPages(filteredSongs, songsPerPage);

  useEffect(() => {
    loadSongs();
    // setSelectedSong(firstSong);
  }, []);

  useEffect(() => {
    if (currentSongs.length > 0) {
      setSelectedSong(currentSongs[0]);
    }
  }, [page, language, songs]);

  useEffect(() => {
  if (songs.length > 0) {
    const filtered = filterSongsByLanguage(songs, language);
    const firstSong = filtered[0] || null;
    setSelectedSong(firstSong); // set first song of current language/page
  }
}, [songs, language]);

const toggleFavorite = async (song) => {
  const newFav = song["Fav Added"] == 1 ? 0 : 1;

  // update UI instantly
  const updatedSongs = songs.map((s) =>
    s.id === song.id ? { ...s, "Fav Added": newFav } : s
  );

  setSongs(updatedSongs);

  await saveFavoriteToSheet(song, newFav);
};

const filteredSearchSongs = songs.filter((song) =>
    song.Searchkey.toLowerCase().includes(search.toLowerCase())
  )
  .slice(0, 20);

  const loadSongs = async () => {
    const data = await getSongs();
    console.log(data);

    setSongs(data);
    setSelectedSong(loadInitialSong(data)); // default first song of English
};

  const goToPage = (num) => {
    if (num < 1 || num > totalPages) return;
    setPage(num);
  };

  const handleLanguageClick = (lang) => {
    setLanguage(lang);
    setPage(1);
    const langSongs = filterSongsByLanguage(songs, lang);
    setSelectedSong(langSongs[0]);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <main className="grid grid-cols-10 px-1 py-2 bg-orange-100">
        {/* Column 1: Language + Song list + Pagination */}
        <div className="col-span-2 grid grid-rows-[auto_1fr_auto] gap-2 bg-txtColor">
          {/* Language buttons */}
          <div className="grid grid-cols-3 w-full gap-1">
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

          {/* Song list */}
            <div className="overflow-y-auto border rounded-bl rounded-br py-3">
                <ul className="space-y-0 flex-col w-full">
                    {currentSongs.map((song, i) => (
                    <li
                        key={song.id}
                        className={`
                        cursor-pointer
                        py-1
                        text-sm
                        flex items-center justify-center
                        transition
                        ${i % 2 === 0 ? "bg-gray-400" : ""}

                        ${selectedSong?.id === song.id ? "bg-bgColor text-white" : ""}
                        hover:bg-bgColor
                        hover:text-white
                        `}
                        onClick={() => setSelectedSong(song)}
                    >
                        {/* SONG TITLE */}
                        <span onClick={() => setSelectedSong(song)}>
                          🎵 {song["Title*"]}
                        </span>

                        {/* FAVORITE ICON */}
                        <span
                          onClick={(e) => {
                            e.stopPropagation(); // IMPORTANT (prevents selecting song)
                            toggleFavorite(song);
                          }}
                          className="cursor-pointer"
                        >
                          {song["Fav Added"] == 1 ? "❤️" : "🤍"}
                        </span>
                    </li>
                    ))}
            </ul>
            </div>

          {/* Pagination */}
          <div className="grid grid-cols-5 border rounded">
            <button
              className="px-2 py-1 hover:bg-bgColor hover:text-white transition"
              onClick={() => goToPage(page - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`transition ${
                  page === i + 1 ? "bg-bgColor text-white" : ""
                }`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-2 py-1 hover:bg-bgColor hover:text-white transition"
              onClick={() => goToPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* Column 2: Search + Lyrics */}
        <div className="col-span-6 flex flex-col items-center p-4">
  {/* SEARCH CONTAINER */}
  <div className="w-full relative py-1 px-2 border-4 border-bgColor rounded-lg">
    <input
      type="text"
      placeholder="Search song in English..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full text-center py-3"
    />

    {/* SEARCH DROPDOWN */}
    {search.length >= 3 && (
      <div className="absolute top-full left-0 w-full bg-gray-100 border max-h-[200px] overflow-y-auto mt-1 z-50 rounded shadow">
        {filteredSearchSongs.map((song, i) => (
          <div
            key={i}
            className="px-3 py-2 cursor-pointer hover:bg-bgColor hover:text-white text-bgColor"
            onClick={() => {
              setSelectedSong(song);
              setSearch(""); // clear search after selecting
            }}
          >
            {song["Title*"]}
          </div>
        ))}
      </div>
    )}
  </div>

  {/* LYRICS DISPLAY - untouched */}
  <div className="py-3 px-6 border w-full flex flex-col items-center justify-center mt-4 border-txtColor">
    <h3 className="font-bold text-2xl mb-2">
      {selectedSong ? selectedSong["Title*"] : "Select a song"}
    </h3>

    <div className="h-[400px] w-full overflow-y-auto text-center leading-relaxed">
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: selectedSong ? selectedSong["lyrics*"] : "Select a song."
        }}
      ></div>
    </div>
  </div>
</div>

        {/* Column 3: Updates + Categories + Ads */}
        <div className="col-span-2 grid grid-rows-[2fr_3fr_1fr]">
          <div className="border border-bgColor flex flex-col justify-center items-center">
            <h3>Recent Updates</h3>
            <p>Good Friday is coming...</p>
          </div>

          <div className="border border-bgColor py-3 flex flex-col items-center">
            <h3 className="font-bold text-xl underline">Categories</h3>
            <ul className="space-y-1 flex-col w-full pt-3">
              <li className="cursor-pointer hover:bg-bgColor hover:text-white transition flex items-center justify-center">
                Praise
              </li>
              <li className="cursor-pointer hover:bg-bgColor hover:text-white transition flex items-center justify-center">
                Worship
              </li>
              <li className="cursor-pointer hover:bg-bgColor hover:text-white transition flex items-center justify-center">
                Christmas
              </li>
            </ul>
          </div>

          <div className="border border-bgColor rounded flex items-center justify-center">
            Ad Space
          </div>
        </div>
      </main>
    </div>
  );
}