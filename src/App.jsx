import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./index.css";
import UploadSong from "./pages/UploadSong";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import { useState, useEffect } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      {!isMobile && <Navbar />} {/* only desktop */}
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/uploadSong" element={<UploadSong />} />
      </Routes>
      {!isMobile && <Footer />} {/* only desktop */}
    </Router>
    
  );
}

export default App;