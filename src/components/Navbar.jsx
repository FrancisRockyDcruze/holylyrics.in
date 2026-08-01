import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginCard from "./Admin_login_Card";
import Logout from "./Admin_logout";
import ThemePanel from "./Theme/ThemePanel";

export default function Navbar({isAdmin,
    setIsAdmin}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showMassMenu, setShowMassMenu] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("admin_token"));

  const token = localStorage.getItem("admin_token");

  return (
    <nav className="bg-bgColor text-txtColor p-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        ☩ Holy Lyrical 🎵🎶
      </div>

      {console.log(isAdmin)}
      <div className="flex gap-4 mr-2 justify-center items-center">
        <Link to="/">H⛪me</Link>
        <span className="text-bglightColor">|</span>
        {/* <Link to={isAdmin ? "/favorites" : "#"}
          onClick={(e) => {
            if (!isAdmin) {
              e.preventDefault();
              alert("Admin Access is required!!");
            }
            else
            {
              {setIsAdmin(true)}
            }
          }}
        >
          Fav❤️rites
        </Link> */}
        <Link to="/favorites">Fav❤️rites</Link>
        <span className="text-bglightColor">|</span>
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
        <span className="text-bglightColor">|</span>
        <button onClick={() => {setShowMassMenu(!showMassMenu);}}>Holy🙏Mass</button>
        <span className="text-bglightColor">|</span>
        <button onClick={() => {setShowTheme(!showTheme);}}>🎨Themes</button>
        
        {token && (
    <Logout
    isAdmin={isAdmin}
    setIsAdmin={setIsAdmin}
  />
)}
      </div>
      
      {showModal && (
        <LoginCard 
          onClose={() => setShowModal(false)} 
          onSuccess={() => {
            setShowModal(false);
            navigate("/uploadSong");
            setIsAdmin(true);
          }}
        />
      )}

      {showTheme && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-bgColor w-fit m-auto">
          <div className="w-fit max-h-[90vh] overflow-auto">
            <ThemePanel setShowThemeMenu={setShowTheme} />
          </div>
        </div>
      )}

      {showMassMenu && (
                <div className="fixed top-[7rem] right-[10%] z-50 flex items-end text-txtColor">                
                  <div
                  className="flex absolute right-full bottom-0 bg-bgColor shadow-lg text-txtColor transition-transform duration-300 ease-in-out rounded-tl-lg">
                  <button
                    onClick={() => {
                      setShowMassMenu(false);
                      navigate("/mass/english");
                    }}
                    className="block text-left px-2 whitespace-nowrap"
                  >
                    English
                  </button>
                    <span className="py-3 text-bglightColor">|</span>

                  <button
                    onClick={() => {
                      setShowMassMenu(false);
                      navigate("/mass/bengali");
                    }}
                    className="block text-left px-2 whitespace-nowrap"
                  >
                    Bengali
                  </button>
                     <span className="py-3 text-bglightColor">|</span>
                     
                  <button
                    onClick={() => {
                      setShowMassMenu(false);
                      navigate("/mass/hindi");
                    }}
                    className="block text-left px-2 py-3 whitespace-nowrap"
                  >
                    Hindi
                  </button>
                  </div>
                </div>
      )}
    </nav>
  );
}