import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-bgColor text-txtColor p-4 flex justify-between items-center">
      <div className="font-bold text-xl">☩ Holy Lyrical 🎵🎶</div>
      <div className="flex gap-4">
        <Link to="/">H⛪me</Link>
        <Link to="/favorites">Fav❤️rites</Link>
        <Link to="/uploadSong">Upl📤ad</Link>
        {/* <Link to="/search">Search</Link> */}
        {/* <Link to="/playlist">Playlist</Link> */}
      </div>
    </nav>
  );
}