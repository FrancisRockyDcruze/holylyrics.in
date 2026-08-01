import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./index.css";
import UploadSong from "./pages/UploadSong";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import { useState, useEffect } from "react";
import MassLayout from "./pages/HolyMass/MassLayout";
import EnglishMass from "./pages/HolyMass/Englishmass";
import BengaliMass from "./pages/HolyMass/Bengalimass";
import HindiMass from "./pages/HolyMass/Hindimass";
import { LANGUAGES } from "./config";
import { 
  filterSongsByLanguage, 
  getCurrentSongs, 
  getTotalPages, 
  loadInitialSong 
} from "./utils/songUtils";
import { getSongs } from "./services/api";
import { saveFavoriteToSheet } from "./services/fav_api";

function App() {
  // ------------------------------
    // Shared state (desktop + mobile)
    // ------------------------------
    const [songs, setSongs] = useState([]);           
    const [language, setLanguage] = useState("English"); 
    const [page, setPage] = useState(1);             
    const [songsPerPage] = useState(20);             
    const [selectedSong, setSelectedSong] = useState(null); 
    const [search, setSearch] = useState("");
  
    const filteredSongs = filterSongsByLanguage(songs, language);
    // ------------------------------
    // Filtered and paginated songs
    // ------------------------------
    const currentSongs = getCurrentSongs(filteredSongs, page, songsPerPage);
    const totalPages = getTotalPages(filteredSongs, songsPerPage);

    const [isMobile, setIsMobile] = useState(false);
    const savedTheme = localStorage.getItem("holyLyricsTheme");
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin_token"));
    // ------------------------------
    // Search filter
    // ------------------------------
    // const filteredSearchSongs = songs
    //   .filter((song) => song.Searchkey.toLowerCase().includes(search.toLowerCase()))
    //   .slice(0, 20);

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

    // const openSong = (song) => {
    //   setSelectedSong(song);
    //   navigate(`/song/${song.id}`);
    // };

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
    // Detect mobile / desktop
    // ------------------------------
  
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);
  
    
  if (savedTheme) {
    const theme = JSON.parse(savedTheme);

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r} ${g} ${b}`;
  }
  
  const layoutProps = {
    songs,
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
    isMobile,
    isAdmin,
    setIsAdmin
  };

  return (
    <Router>
     {console.log(isAdmin)}
      {!isMobile && <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} {/* only desktop */}
      <Routes>
        <Route path="/*" element={<Landing {...layoutProps}/>} />
        <Route path="/favorites" element={<Favorites isAdmin={isAdmin}/>} />
        <Route path="/uploadSong" element={<UploadSong />} />
        <Route path="/mass" element={<MassLayout 
            songs={songs}
            search={search}
            setSearch={setSearch}
            toggleFavorite={toggleFavorite}
            isAdmin={isAdmin}
        />}>
            <Route path={LANGUAGES.english.route} element={<EnglishMass />}/>
            <Route path={LANGUAGES.hindi.route} element={<HindiMass />} />
            <Route path={LANGUAGES.bengali.route} element={<BengaliMass />} />
        </Route>
      </Routes>
      {!isMobile && <Footer />} {/* only desktop */}
    </Router>
  );
}

export default App;