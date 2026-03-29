import { useEffect, useState } from "react";
import { getSongs } from "../services/api";

export default function Landing() {
  const [songs, setSongs] = useState([]);           // All songs from Google Sheet
  const [language, setLanguage] = useState("English"); // Current selected language
  const [page, setPage] = useState(1);             // Current page
  const [songsPerPage] = useState(20);             // Songs per page
  const [selectedSong, setSelectedSong] = useState(null); // Selected song for lyrics
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSongs();
  }, []);

  useEffect(() => {
    if (currentSongs.length > 0) {
      setSelectedSong(currentSongs[0]);
    }
  }, [page, language, songs]);

  const filteredSearchSongs = songs
  .filter((song) =>
    song.Searchkey.toLowerCase().includes(search.toLowerCase())
  )
  .slice(0, 10);

  const loadSongs = async () => {
    const data = await getSongs();
    console.log(data);

    setSongs(data);
    // default first song of default language
    const englishSongs = data.filter(
      (s) => s["language*"].toLowerCase() === "english" && s["Status*"].toLowerCase() === "ready"
    );
    setSelectedSong(englishSongs[0] || null);
  };

  const filteredSongs = songs.filter(
    (s) => s["language*"].toLowerCase() === language.toLowerCase() && s["Status*"].toLowerCase() === "ready"
  );
  
  const indexOfLastSong = page * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
  const start = (page - 1) * 20;
  const end = start + 20;
  const currentSongs = filteredSongs.slice(start, end);

  const goToPage = (num) => {
    if (num < 1 || num > totalPages) return;
    setPage(num);
  };

  const handleLanguageClick = (lang) => {
    setLanguage(lang);
    setPage(1); // reset to first page
    const langSongs = songs.filter(
      (s) => s["language*"].toLowerCase() === lang.toLowerCase() && s["Status*"].toLowerCase() === "ready"
    );
    // console.log(langSongs);
    setSelectedSong(langSongs[0]); // load first song of that language
  };

  return (
<div className="min-h-screen grid grid-rows-[auto_1fr_auto]">

  <main className="grid grid-cols-10 px-2 py-2 bg-orange-100 gap-2">

    {/* COLUMN 1 */}
    <div className="col-span-2 grid grid-rows-[auto_1fr_auto] bg-txtColor rounded shadow">

      {/* LANGUAGE BUTTONS */}
      <div className="grid grid-cols-3 w-full gap-1">
        {["Bengali", "English", "Hindi"].map((lang) => (
          <button
            key={lang}
            className={`px-3 py-1 border w-full transition ${
              language === lang ? "bg-bgColor text-white" : "hover:bg-bgColor hover:text-txtColor"
            }`}
            onClick={() => handleLanguageClick(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* SONG LIST */}
      <div className="overflow-y-auto border rounded-bl rounded-br py-3 flex-1">
        <ul className="space-y-1">
          {currentSongs.map((s) => (
            <li
              key={s.id}
              className={`cursor-pointer px-2 py-1 transition ${
                selectedSong?.id == s.id ? "bg-bgColor text-white" : "hover:bg-bgColor hover:text-white"
                }`}
              onClick={() => setSelectedSong(s)}
            >
              {s["Title*"]}
            </li>
          ))}
        </ul>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-2">
        <button
          className="px-2 py-1 border rounded hover:bg-bgColor hover:text-white"
          onClick={() => goToPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`px-2 py-1 border rounded ${
              page === i + 1 ? "bg-bgColor text-white" : "hover:bg-bgColor hover:text-white"
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-2 py-1 border rounded hover:bg-bgColor hover:text-white"
          onClick={() => goToPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>

    {/* COLUMN 2 */}
    <div className="col-span-6 flex flex-col p-3">

      {/* SEARCH */}
      {/* <div className="w-full border-2 border-bgColor rounded-lg px-2 py-1">
        <input
          type="text"
          placeholder="Search song..."
          className="w-full outline-none text-center py-2"
        />
      </div> */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search song..."
          className="border w-full px-3 py-2 text-bgColor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length >= 3 && (
          <div className="absolute top-full left-0 w-full bg-gray-100 border max-h-[200px] overflow-y-auto z-50">
            {filteredSearchSongs.map((song, i) => (
              <div
                key={i}
                className="px-3 py-2 cursor-pointer hover:bg-white text-bgColor"
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

      {/* LYRICS */}
      <div className="mt-3 border rounded p-4 flex flex-col items-center bg-txtColor">

        <h3 className="font-bold text-2xl mb-3">{selectedSong ? selectedSong["Title*"] : "Select a Title."}</h3>
        
        <div className="h-[400px] w-full overflow-y-auto text-center leading-relaxed">
          <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html : selectedSong ? selectedSong["lyrics*"] : "Select a song."}}></div>
        </div>
      </div>
    </div>

    {/* COLUMN 3 */}
    <div className="col-span-2 grid grid-rows-[auto_1fr_auto] gap-2">

      {/* UPDATES */}
      <div className="border border-bgColor bg-txtColor p-3 text-center rounded">
        <h3 className="font-semibold">Recent Updates</h3>
        <p className="text-sm mt-1">Good Friday is coming...</p>
      </div>

      {/* CATEGORIES */}
      <div className="bg-txtColor border border-bgColor p-3 rounded">
        <h3 className="font-bold text-lg text-center mb-2">Categories</h3>

        <ul className="space-y-1 text-sm">
          <li className="cursor-pointer hover:bg-bgColor hover:text-white px-2 py-1 text-center">
            Praise
          </li>
          <li className="cursor-pointer hover:bg-bgColor hover:text-white px-2 py-1 text-center">
            Worship
          </li>
          <li className="cursor-pointer hover:bg-bgColor hover:text-white px-2 py-1 text-center">
            Christmas
          </li>
        </ul>
      </div>

      {/* AD SPACE */}
      <div className="border border-bgColor rounded flex items-center justify-center text-sm">
        Advertisement
      </div>

    </div>

  </main>

</div>
  );
}