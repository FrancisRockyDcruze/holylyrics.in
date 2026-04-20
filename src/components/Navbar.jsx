import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginCard from "./Admin_login_Card";
import Logout from "./Admin_logout";

export default function Navbar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("admin_token");

  return (
    <nav className="bg-bgColor text-txtColor p-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        ☩ Holy Lyrical 🎵🎶
      </div>

      <div className="flex gap-4 justify-center items-center">
        {token && (
        <Logout />
        )}
        <Link to="/">H⛪me</Link>
        <Link to="/favorites">Fav❤️rites</Link>
        <button
          onClick={() => {
            const token = localStorage.getItem("admin_token");
            if (token) {
              navigate("/uploadSong");
            } else {
              setShowModal(true);
            }
          }}
        >
          Upl📤ad
        </button>
      </div>

      {showModal && (
        <LoginCard 
          onClose={() => setShowModal(false)} 
          onSuccess={() => {
            setShowModal(false);
            navigate("/uploadSong");
          }}
        />
      )}
    </nav>
  );
}