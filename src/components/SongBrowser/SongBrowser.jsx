import { useState } from "react";
import LanguageTabs from "./LanguageTabs";
import SearchSong from "./SearchSong";
import SongList from "./SongList";
import Footer from "../Footer";
import { filterSongsByLanguage } from "../../utils/songUtils";

export default function SongBrowser({
    songs,
    isAdmin,
    toggleFavorite,
    openSong,
    showFooter = true,
}) {

    const [language, setLanguage] = useState("English");
    const [search, setSearch] = useState("");

    // Filter by language
    const filteredSongs = filterSongsByLanguage(songs, language);

    // Search filter
    const searchedSongs = filteredSongs.filter((song) =>
        song.Searchkey.toLowerCase().includes(search.toLowerCase()) ||
        song["Title*"].toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">

            {/* Language Tabs */}
            <LanguageTabs
                language={language}
                setLanguage={setLanguage}
            />

            {/* Search + Song List */}
            <div className="flex-1 overflow-y-auto px-4 py-2">

                <SearchSong
                    search={search}
                    setSearch={setSearch}
                />

                <SongList
                    searchedSongs={searchedSongs}
                    isAdmin={isAdmin}
                    toggleFavorite={toggleFavorite}
                    openSong={openSong}
                />

                {showFooter && <Footer />}

            </div>

        </div>
    );
}