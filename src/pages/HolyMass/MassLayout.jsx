import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SelectLanguage from "../../components/SelectLanguage";
import { LANGUAGES } from "../../config";
import LanguageTabs from "../../../src/components/SongBrowser/LanguageTabs";
import SearchSong from "../../components/SongBrowser/SearchSong";
import SongList from "../../components/SongBrowser/SongList";
import { filterSongsByLanguage } from "../../utils/songUtils";
import { AdminAccess } from "../../services/adminAccess";

export default function MassLayout({
  songs,
  search,
  setSearch,
  toggleFavorite,
  isAdmin
}) {
  const [showSongs, setShowSongs] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState("English");
  const filteredSongs = filterSongsByLanguage(songs, language);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const openSong = (song) => {
    setSelectedSong(song);
  };

  const currentLanguage =
    Object.values(LANGUAGES).find(
      (lang) => location.pathname === `/mass/${lang.route}`,
    ) || LANGUAGES.english;

  const searchedSongs = filteredSongs.filter((song) =>
    song.Searchkey.toLowerCase().includes(search.toLowerCase()),
  );

  // ------------------------------
  // Floating button positions — anchored beside the "Order of Mass" title
  // ------------------------------
  const orderOfMassRef = useRef(null);
  const [songBtnPos, setSongBtnPos] = useState({ x: 0, y: 0 });
  const [favBtnPos, setFavBtnPos] = useState({ x: 0, y: 0 });
  const hasDraggedRef = useRef({ song: false, favorite: false });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
  const positionButtons = () => {
    const btnSize = 56;

    if (isMobile) {
      const bottomOffset = 680;

      if (!hasDraggedRef.current.song) {
        setSongBtnPos({
          x: 16,
          y: window.innerHeight - bottomOffset,
        });
      }

      if (!hasDraggedRef.current.favorite) {
        setFavBtnPos({
          x: window.innerWidth - btnSize - 16,
          y: window.innerHeight - bottomOffset,
        });
      }

      return;
    }

    if (!orderOfMassRef.current) return;

    const rect = orderOfMassRef.current.getBoundingClientRect();

    if (!hasDraggedRef.current.song) {
      setSongBtnPos({
        x: rect.left + 150,
        y: rect.top + 20,
      });
    }

    if (!hasDraggedRef.current.favorite) {
      setFavBtnPos({
        x: rect.right - btnSize - 150,
        y: rect.top + 20,
      });
    }
  };

  // Run immediately
  positionButtons();

  // Run again after layout has settled
  const timer = setTimeout(positionButtons, 50);

  window.addEventListener("resize", positionButtons);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", positionButtons);
  };
}, [isMobile]);

  const [draggingButton, setDraggingButton] = useState(null);

  // Belt-and-suspenders: suppress selectstart at the document level while
  // dragging. Fast mouse movement can trigger native text selection before
  // the userSelect inline style re-render takes effect in some browsers,
  // so this catches it directly at the source for the whole drag duration.
  useEffect(() => {
  if (!draggingButton) return;

  const handleMove = (e) => moveButton(e);
  const handleUp = () => setDraggingButton(null);
  const preventDefault = (e) => e.preventDefault();

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleUp);

  document.addEventListener("selectstart", preventDefault);
  document.addEventListener("dragstart", preventDefault);

  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";
  document.body.style.cursor = "grabbing";

  return () => {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);

    document.removeEventListener("selectstart", preventDefault);
    document.removeEventListener("dragstart", preventDefault);

    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
    document.body.style.msUserSelect = "";
    document.body.style.cursor = "";
  };
}, [draggingButton]);

 const moveButton = (e) => {
  if (!draggingButton) return;

  const size = 60;

  const newPosition = {
    x: Math.max(
      0,
      Math.min(e.clientX - size / 2, window.innerWidth - size)
    ),
    y: Math.max(
      0,
      Math.min(e.clientY - size / 2, window.innerHeight - size)
    ),
  };

  if (draggingButton === "song") {
    hasDraggedRef.current.song = true;
    setSongBtnPos(newPosition);
  }

  if (draggingButton === "favorite") {
    hasDraggedRef.current.favorite = true;
    setFavBtnPos(newPosition);
  }
};

  const moveTouchButton = (e) => {
    if (!draggingButton) return;

    const touch = e.touches[0];
    const size = 60;

    const newPosition = {
      x: Math.max(0, Math.min(touch.clientX - size / 2, window.innerWidth - size)),
      y: Math.max(0, Math.min(touch.clientY - size / 2, window.innerHeight - size)),
    };

    if (draggingButton === "song") {
      hasDraggedRef.current.song = true;
      setSongBtnPos(newPosition);
    }

    if (draggingButton === "favorite") {
      hasDraggedRef.current.favorite = true;
      setFavBtnPos(newPosition);
    }
  };

  return (
    <div
  className="fixed inset-0 bg-white z-50 flex flex-col"
  onTouchMove={moveTouchButton}
>
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b bg-bgColor">
        <SelectLanguage />

        <h2 className="text-2xl text-bglightColor font-bold mr-3 md:text-5xl lg:text-5xl">
          {currentLanguage.title}
        </h2>

        <button
          className="text-xl text-bgColor border rounded px-3 py-0 bg-bglightColor"
          onClick={() => navigate("/")}
        >
          🏠︎
        </button>
      </div>

      {/* Mass Content */}
      <div className="flex-1 overflow-y-auto pb-20" ref={orderOfMassRef}>
        <Outlet />
      </div>

      <div
  className="fixed z-50"
  style={{
    left: songBtnPos.x,
    top: songBtnPos.y,
    touchAction: "none",
  }}
>
  <button
    onMouseDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setDraggingButton("song");
    }}
    onTouchStart={(e) => {
  e.preventDefault();
  setDraggingButton("song");
}}
    onTouchEnd={() => setDraggingButton(null)}
    onClick={() => {
      if (!hasDraggedRef.current.song) {
        setShowSongs(true);
      }
      hasDraggedRef.current.song = false;
    }}
    className="
      w-14 h-14
      rounded-full
      bg-bgColor
      text-bglightColor
      shadow-lg
      flex
      items-center
      justify-center
      text-2xl
      cursor-move
      border
      select-none
    "
  >
    🎶
  </button>
</div>

      <div
  className="fixed z-50"
  style={{
    left: favBtnPos.x,
    top: favBtnPos.y,
    touchAction: "none",
  }}
>
  <button
    onMouseDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setDraggingButton("favorite");
    }}
    onTouchStart={() => setDraggingButton("favorite")}
    onTouchEnd={() => setDraggingButton(null)}
    onClick={() => {
      if (!hasDraggedRef.current.favorite) {
        setShowFavorites(true);
      }
      hasDraggedRef.current.favorite = false;
    }}
    className="
      w-14 h-14
      rounded-full
      bg-bgColor
      text-bglightColor
      shadow-lg
      flex
      items-center
      justify-center
      text-2xl
      cursor-move
      border
      select-none
    "
  >
    ❤️
  </button>
</div>

      {/* showSongs */}
      {showSongs && (
        <div
          className="
            fixed inset-0
            z-[100]
            bg-white
            flex flex-col
        "
        >
          {/* Overlay Header */}
          <div
            className="
            p-4
            flex
            justify-between
            items-center
            border-b
            bg-bgColor
        "
          >
            <h2
              className="
                text-xl
                text-bglightColor
                font-bold
            "
            >
              Songs
            </h2>

            <button
              onClick={() => setShowSongs(false)}
              className="
                    bg-bglightColor
                    text-bgColor
                    px-3
                    rounded
                "
            >
              ✕
            </button>
          </div>

          {/* Temporary Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <LanguageTabs language={language} setLanguage={setLanguage} />
            <SearchSong search={search} setSearch={setSearch} />
            <SongList searchedSongs={searchedSongs} isAdmin={isAdmin} openSong={openSong} />
          </div>
        </div>
      )}

      {showFavorites && (
        <div
          className="
            fixed inset-0
            z-[100]
            bg-white
            flex flex-col
        "
        >
          {/* Header */}
          <div
            className="
                p-4
                flex
                justify-between
                items-center
                border-b
                bg-bgColor
            "
          >
            <h2
              className="
                    text-xl
                    text-bglightColor
                    font-bold
                "
            >
              Favorite Songs
            </h2>

            <button
              onClick={() => setShowFavorites(false)}
              className="
                    bg-bglightColor
                    text-bgColor
                    px-3
                    rounded
                "
            >
              ✕
            </button>
          </div>

          <div className="px-3">
            {/* Search */}
            <div className="pt-3 border-b">
              <SearchSong search={search} setSearch={setSearch} />
            </div>

            {/* Favorite List */}
            <div className="flex-1 overflow-y-auto">
              <SongList
                searchedSongs={songs.filter(
                  (song) =>
                    song["Fav Added"] === 1 &&
                    song.Searchkey.toLowerCase().includes(search.toLowerCase()),
                )}
                isAdmin={isAdmin}
                openSong={openSong}
                toggleFavorite={toggleFavorite}
              />
            </div>
          </div>
        </div>
      )}

      {selectedSong && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col">
          <div className="p-4 flex justify-between items-center border-b bg-bgColor">
            <h2 className="text-xl text-bglightColor font-bold">
              {selectedSong["Title*"]}
            </h2>

            <button
              onClick={() => setSelectedSong(null)}
              className="bg-bglightColor text-bgColor px-3 rounded"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div
              className="whitespace-pre-wrap text-center"
              dangerouslySetInnerHTML={{
                __html: selectedSong["lyrics*"],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
