import { useEffect, useState } from "react";  
import { getSongs } from "../services/api";
import { 
  filterSongsByLanguage, 
  getCurrentSongs, 
  getTotalPages, 
  loadInitialSong 
} from "../utils/songUtils";
import { saveFavoriteToSheet } from "../services/fav_api";

// Import layouts
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

export default function Landing() {
  // ------------------------------
  // Shared state (desktop + mobile)
  // ------------------------------
  const [songs, setSongs] = useState([]);           
  const [language, setLanguage] = useState("English"); 
  const [page, setPage] = useState(1);             
  const [songsPerPage] = useState(20);             
  const [selectedSong, setSelectedSong] = useState(null); 
  const [search, setSearch] = useState("");

  // ------------------------------
  // Filtered and paginated songs
  // ------------------------------
  const filteredSongs = filterSongsByLanguage(songs, language);
  const currentSongs = getCurrentSongs(filteredSongs, page, songsPerPage);
  const totalPages = getTotalPages(filteredSongs, songsPerPage);

  // ------------------------------
  // Load songs on mount
  // ------------------------------
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await getSongs();
        if (data && data.length > 0) {
          setSongs(data);
          setSelectedSong(loadInitialSong(data)); // default first song of English
        }
      } catch (err) {
        console.error("Failed to load songs:", err);
      }
    };

    loadSongs();
  }, []);

  // ------------------------------
  // Ensure selectedSong is always valid
  // ------------------------------
  useEffect(() => {
    if (!selectedSong && currentSongs.length > 0) {
      setSelectedSong(currentSongs[0]);
    }
  }, [currentSongs, selectedSong]);

  // ------------------------------
  // Toggle favorite
  // ------------------------------
  const toggleFavorite = async (song) => {
    const newFav = song["Fav Added"] === 1 ? 0 : 1;

    // Update UI instantly
    setSongs((prevSongs) =>
      prevSongs.map((s) => (s.id === song.id ? { ...s, "Fav Added": newFav } : s))
    );

    try {
      await saveFavoriteToSheet(song, newFav);
    } catch (err) {
      console.warn("Could not save favorite to sheet:", err);
    }
  };

  // ------------------------------
  // Search filter
  // ------------------------------
  const filteredSearchSongs = songs
    .filter((song) => song.Searchkey.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 20);

  // ------------------------------
  // Pagination controls
  // ------------------------------
  const goToPage = (num) => {
    if (num < 1 || num > totalPages) return;
    setPage(num);
  };

  // ------------------------------
  // Language selection
  // ------------------------------
  const handleLanguageClick = (lang) => {
    setLanguage(lang);
    setPage(1);
    const langSongs = filterSongsByLanguage(songs, lang);
    setSelectedSong(langSongs[0] || null);
  };

  // ------------------------------
  // Detect mobile / desktop
  // ------------------------------
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ------------------------------
  // Render correct layout
  // ------------------------------
  const layoutProps = {
    songs,
    filteredSongs,
    currentSongs,
    totalPages,
    selectedSong,
    setSelectedSong,
    search,
    setSearch,
    page,
    goToPage,
    handleLanguageClick,
    toggleFavorite,
  };

  return isMobile ? (
    <MobileLayout {...layoutProps} />
  ) : (
    <DesktopLayout {...layoutProps} />
  );
}