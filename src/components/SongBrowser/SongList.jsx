export default function SongList({searchedSongs, isAdmin, openSong,toggleFavorite}) {
    return (
        <>
            <div className="flex flex-col space-y-2">
                {searchedSongs.map((song) => (
                <button
                    key={song.id}
                    className="p-3 border rounded text-left grid grid-cols-10 bg-bglightColor text-txtColor"
                    onClick={() => openSong(song)}
                >
                    <span className="col-span-9">{song["Title*"]}</span>
                    {console.log(isAdmin)}
                    {isAdmin && (
                        <span
                        className="col-span-1 cursor-pointer"
                        onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(song);
                        }}
                    >
                        {song["Fav Added"] === 1 ? "❤️" : "🤍"}
                    </span>
                    )}
                </button>
                ))}
            </div>
        </>
    )
}