import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./index.css";
// import Browse from "./pages/Browse";
// import Search from "./pages/Search";
// import Lyrics from "./pages/Lyrics";
// import Playlist from "./pages/Playlist";
import UploadSong from "./pages/UploadSong";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/browse/:category" element={<Browse />} /> */}
        {/* <Route path="/search" element={<Search />} /> */}
        {/* <Route path="/lyrics/:id" element={<Lyrics />} /> */}
        {/* <Route path="/playlist" element={<Playlist />} /> */}
        {/* <Route path="/extra" element={<Extra />} /> */}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/uploadSong" element={<UploadSong />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;