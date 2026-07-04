import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { filterSongsByLanguage } from "../utils/songUtils";
import FavMobileLayout from "./FavMobileLayout";
import UploadSong from "./UploadSong";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCategorySongs } from "../utils/songUtils";
import { getAllTags } from "../utils/songUtils";
import Footer from "../components/Footer";
import logo from "../assets/images/logo.jpeg"
import { checkAccess } from "../services/checkAdminAccess";
import LoginCard from "../components/Admin_login_Card";
import { getInitials } from "../services/checkAdminAccess";
import Logout from "../components/Admin_logout";
import ThemePanel from "../components/Theme/ThemePanel";

export default function MobileLayout({
  songs,
  selectedSong,
  setSelectedSong,
  search,
  setSearch,
  toggleFavorite,
  loading,
  reload
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBottomTabs, setShowBottomTabs] = useState(true);
  const lastScroll = useRef(0);
  const [language, setLanguage] = useState("English");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySongs, setCategorySongs] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showMassMenu, setShowMassMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    if (scrollTop > lastScroll.current + 10) setShowBottomTabs(false);
    else if (scrollTop < lastScroll.current - 20 || scrollTop < 50) setShowBottomTabs(true);

    // Close menus while scrolling
    if (showMoreMenu) setShowMoreMenu(false);
    setShowMassMenu(false);

    lastScroll.current = scrollTop;
  };

  
  const filteredSongs = filterSongsByLanguage(songs, language);
  const searchedSongs = filteredSongs.filter((song) =>
    song.Searchkey.toLowerCase().includes(search.toLowerCase())
  );
  const allTags = getAllTags(songs);

  // ---------------- Navigation ----------------
  const openSong = (song) => {
    setSelectedSong(song);
    navigate(`/song/${song.id}`);
  };

  const goBack = () => {
    navigate(-1);   // better than "/"
  };

  const categories = selectedSong?.["category*"]
  ?.split(",")
  .map(tag => tag.trim())

  const handleTagClick = (tag) => {
    const catSongs = getCategorySongs(songs, tag); // true = return all songs
    // console.log(catSongs);

    setSelectedCategory(tag);
    setCategorySongs(catSongs);
  };

  // detect route
  const path = location.pathname;
  const isSong = path.startsWith("/song");
  const isCategories = path === "/categories";
  const isFavorites = path === "/favorites";
  const isUpdates = path === "/updates";
  const isUpload = path === "/upload";
  const isCategoryOverlay = path === "/category";
  // const bengaliMass = path == "bengalimass";

  //admin access when click upload button
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const menuRef = useRef(null);

  //logout Admin
  const handleLogout = () =>{
    localStorage.clear()
    setShowMenu(false);
    navigate("/")
    localStorage.getItem()
  }

  useEffect(() => {
    setShowMoreMenu(false);
    setShowMassMenu(false);
  }, [location.pathname]);


  // ---------------- Overlays ----------------
  const renderOverlay = () => {
    if (!isSong && !isCategories && !isFavorites && !isUpdates && !isUpload && !isCategoryOverlay) return null;

    if (isSong) {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center border-b bg-bgColor">
            <button onClick={goBack} className="text-txtColor text-sm border rounded px-3 py-1 bg-bglightColor">Back</button>
            <h2 className="text-xl text-bglightColor font-bold mr-8 text-center">{selectedSong?.["Title*"]}</h2>
            <span
              className="col-span-1 cursor-pointer text-xl"
              onClick={(e) => {
                // e.stopPropagation();
                toggleFavorite(selectedSong);

                // Update the selectedSong reference to trigger re-render
                setSelectedSong((prev) => ({
                  ...prev,
                  "Fav Added": prev["Fav Added"] === 1 ? 0 : 1,
                }));
              }}
            >
              {selectedSong?.["Fav Added"] === 1 ? "❤️" : "🤍"}
            </span>
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            <div
              className="text-txtColor whitespace-pre-wrap text-center min-h-screen"
              dangerouslySetInnerHTML={{ __html: selectedSong?.["lyrics*"] }}
            />
             <Footer/>
          </div>

          <div className="flex flex-wrap justify-center gap-2 my-3">
              {categories?.map((tag, index) => (
                <div
                  key={index}
                  onClick={() => {
                        handleTagClick(tag); // populate categorySongs & selectedCategory

                    navigate("/category")}}
                  className="bg-bgColor text-txtColor px-2 py-1 rounded text-sm font-bold cursor-pointer select-none"
                >
                  🏷️ {tag}
                </div>
              ))}
             
          </div>
        </div>
      );
    }

    if (isCategories) {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center border-b bg-bgColor">
            <button onClick={goBack} className="text-sm border rounded px-3 py-1 bg-bglightColor text-txtColor">Back</button>
            <h2 className="text-2xl text-bglightColor font-bold mr-3">Categories</h2>
            <div className="text-xl text-bgColor border rounded px-3 py-0 bg-bglightColor" onClick={() => navigate("/")}>🏠︎</div>
          </div>

          <div className="p-4 flex flex-col space-y-2 bg-bgColor mb-3 overflow-y-auto flex-1">
            {allTags.map((cat) => (
              <button
                onClick={() => {
                  handleTagClick(cat); // populate categorySongs & selectedCategory
                  navigate("/category")}}
                key={cat}
                className="text-txtColor p-3 border rounded text-center bg-white hover:text-white"
              >
                🏷️ {cat}
              </button>
            ))}
            <Footer/>
          </div>
        </div>
      );
    }

    if (isFavorites) {
      return (
        <FavMobileLayout
          songs={songs}
          loading={loading}
          reload={reload}
        closeFav={goBack}
        isMobilePreview = {true}
        />
      );
    }

    if (isUpdates) {
      return (
        <div>
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-2">
            <div className="p-4 flex justify-between items-center border-b bg-bgColor">
              <button onClick={goBack} className="text-lg border rounded px-3 py-1 bg-bglightColor text-txtColor">Back</button>
              <h2 className="text-2xl font-bold text-bglightColor">Updates</h2>
              <div className="text-2xl text-bgColor border rounded px-3 py-0 bg-bglightColor" onClick={() => navigate("/")}>🏠︎</div>
            </div>

            <div className="overflow-y-auto py-2 flex-1 bg-bgColor">
                <div className="min-h-screen text-txtColor">
                  <p className="p-2 m-2 bg-white rounded">Last Feast Easter </p>
                  <p className="p-2 m-2 bg-white rounded">New songs added!</p>
                  <p className="p-2 m-2 bg-white rounded">Latest updates will be shown here...</p>
                </div>
                
                <Footer />
            </div>
          </div>
        </div>
      );
    }

    if (isUpload) {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b bg-bgColor">
            <button 
              onClick={goBack} 
              className="px-3 py-1 border text-sm rounded bg-bglightColor text-txtColor"
            >
              Back
            </button>

            <h1 className="text-xl text-bglightColor font-bold">Holy Lyrical</h1>
            <Logout />
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <UploadSong />
          </div>
          <Footer/>
        </div>
      );
    }

    if (isCategoryOverlay) {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col bg-bgColor">
          <div className="p-4 flex justify-between items-center border-b bg-bgColor">
            <button
              onClick={goBack}
              className="text-sm border rounded px-3 py-1 bg-bglightColor text-txtColor"
            >
              Back
            </button>
            <h2 className="text-2xl text-bglightColor font-bold text-center mr-3 underline">{selectedCategory}</h2>
            <h2 className="text-2xl text-bgColor border rounded px-3 py-0 bg-bglightColor"
            onClick={() => navigate("/")}>🏠︎</h2>
          </div>
          {/* {console.log(categorySongs)} */}
          <div className="p-4 flex flex-col space-y-2 overflow-y-auto bg-bgColor">
            {categorySongs.length === 0 ? (
              <p>No songs found for this category.</p>
            ) : (
              categorySongs.map((song) => (
                <button
                  key={song.id}
                  className="p-3 border rounded hover:bg-bglightColor cursor-pointer bg-white text-txtColor"
                  onClick={() => openSong(song)} // optional: open song
                >
                  {song["Title*"]}
                </button>
              ))
            )}
             <Footer/>
          </div>
        </div>
      );
    }

  };

  const { id } = useParams();

    useEffect(() => {
    if (id && songs.length > 0) {
        const found = songs.find((s) => s.id.toString() === id);
        if (found) setSelectedSong(found);
    }
    }, [id, songs]);

  return (
    <div className="h-screen flex flex-col bg-gray-400">
      {!isFavorites && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-bgColor">
            <h2 className="text-4xl font-bold text-white">☩</h2>
            <h1 className="text-2xl font-bold ml-12 text-bglightColor">Holy Lyrical</h1>
            <button 
                onClick={() => {
                const token = localStorage.getItem("admin_token");

                if (token) {
                  setShowMenu(false);
                  navigate("/upload");
                } else {
                  setShowModal(true);
                }
              }}
              className="px-3 py-1 border rounded bg-bglightColor text-txtColor">
              Upload
            </button>
          </div>

          {/* Language */}
          <div className="flex overflow-x-auto px-3 py-2 space-x-2 border-b bg-gray-50 justify-around text-txtColor">
            {["English", "Hindi", "Bengali"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 border rounded ${language === lang ? "bg-bgColor text-bglightColor" : ""}`}
              >
                {lang} 🎶
              </button>
            ))}
          </div>

          {/* Body */}
          <div className=" flex-1 overflow-y-auto px-4 py-2" onScroll={handleScroll}>
            <div className="relative">
            <input
              type="text"
              placeholder="Search song..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded mb-4"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-6 -translate-y-1/2 
                          flex items-center justify-center 
                          rounded px-2 bg-gray-200 hover:bg-gray-300 text-sm"
              >
                clear
              </button>
            )}
            </div>

            <div className="flex flex-col space-y-2">
              {searchedSongs.map((song) => (
                <button
                  key={song.id}
                  className="p-3 border rounded text-left grid grid-cols-10 bg-bglightColor text-txtColor"
                  onClick={() => openSong(song)}
                >
                  <span className="col-span-9">{song["Title*"]}</span>
                  <span
                    className="col-span-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(song);
                    }}
                  >
                    {song["Fav Added"] === 1 ? "❤️" : "🤍"}
                  </span>
                </button>
              ))}
            </div>
            <Footer />
          </div>
          
          {/* Bottom Tabs */}
          <div className={`fixed bottom-0 left-0 w-full text-white border-t transition-transform duration-300 
            ${showBottomTabs ? "translate-y-0" : "translate-y-full"}`}>


            {showThemeMenu && (
              <div className="relative bottom-2 z-50 flex flex-col items-center text-txtColor">
                <div className="flex bg-bgColor rounded-tl-lg shadow-lg overflow-hidden">
                  <ThemePanel setShowThemeMenu={setShowThemeMenu}/>
                </div>     
              </div>
            )}

            {showMoreMenu && (
                <div className="fixed bottom-10 right-0 z-50 flex items-end text-txtColor">                
                  <div
                  className={`
                    flex
                    absolute
                    right-full
                    bottom-0
                    bg-bgColor
                    shadow-lg
                    text-txtColor
                    transition-transform duration-300 ease-in-out
                    ${
                        showMassMenu
                          ? "translate-x-0 opacity-100"
                          : "translate-x-20 opacity-0 pointer-events-none"
                      }
                  `}
                >
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      setShowMassMenu(false);
                      navigate("/englishmass");
                    }}
                    className="block text-left px-2 pl-4 py-3 whitespace-nowrap hover:bg-white hover:text-bgColor"
                  >
                    English
                  </button>
                    <span className="py-3">|</span>

                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      setShowMassMenu(false);
                      navigate("/bengalimass");
                    }}
                    className="block text-left px-2 py-3 whitespace-nowrap hover:bg-white hover:text-bgColor"
                  >
                    Bengali
                  </button>
                     <span className="py-3">|</span>
                     
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      setShowMassMenu(false);
                      navigate("/hindimass");
                    }}
                    className="block text-left px-2 py-3 whitespace-nowrap hover:bg-white hover:text-bgColor"
                  >
                    Hindi
                  </button>
                  </div>

                  <div className="flex flex-col bg-bgColor rounded-tl-lg shadow-lg overflow-hidden">
                    <button
                      className="text-left px-4 py-3"
                      onClick={() => {
                        setShowMoreMenu(false);
                        navigate("/updates");
                      }}
                    >
                      🆕 Updates
                    </button>

                    <button
                      className=" text-left px-4 py-3"
                      onClick={() => {
                      setShowMoreMenu(false)
                      setShowThemeMenu(!showThemeMenu)}}
                    >
                      🎨 Themes
                    </button>
                    <button
                      className=" text-left px-4 py-3 flex justify-between items-center"
                      onClick={() => setShowMassMenu(!showMassMenu)}
                    >
                      <span>⛪ Holy Mass</span>
                    </button>
                  </div>
                </div>
            )}

            {/* navigation  */}
            <div className="flex text-txtColor">
              <button onClick={() => navigate("/categories")} className="flex-1 py-2 bg-bgColor/95">
                Categories
              </button>

              <button onClick={() => navigate("/favorites")} className="flex-1 py-2 bg-bgColor/95">
                Favorites
              </button>

              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="flex-1 py-2 bg-bgColor/95 relative"
              >
                More
              </button>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <LoginCard 
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            navigate("/upload");
          }}
        />
      )}

      {renderOverlay()}
    </div>
  );
}