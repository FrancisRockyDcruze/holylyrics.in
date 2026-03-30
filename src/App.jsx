import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./index.css";
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
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/uploadSong" element={<UploadSong />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;