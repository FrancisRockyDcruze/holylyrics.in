export default function SearchSong({search, setSearch})
{
    return (
        <>
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
        </>
    )
}