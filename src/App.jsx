import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./index.css";
import UploadSong from "./pages/UploadSong";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import { useState, useEffect } from "react";
import EnglishMass from "./pages/English_mass";
import BengaliMass from "./pages/Bengali_mass";
import HindiMass from "./pages/Hindi_mass";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const savedTheme = localStorage.getItem("holyLyricsTheme");
  const [isAdmin, setIsAdmin] = useState();
  
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
  
  return (
    <Router>
      {!isMobile && <Navbar />} {/* only desktop */}
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/uploadSong" element={<UploadSong />} />
        <Route path="/englishmass" element={<EnglishMass />} />
        <Route path="/bengalimass" element={<BengaliMass />} />
        <Route path="/hindimass" element={<HindiMass />} />
      </Routes>
      {!isMobile && <Footer />} {/* only desktop */}
    </Router>
    
  );
}

export default App;