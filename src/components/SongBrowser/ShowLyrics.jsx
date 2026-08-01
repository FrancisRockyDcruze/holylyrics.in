import Footer from "../Footer";

export default function ShowLyrics({isAdmin, goBack, selectedSong,categories, toggleFavorite = null,
    setSelectedSong = null,})
{
    return (
        <>
            <div className="fixed inset-0 bg-white z-50 flex flex-col">
                      <div className={`grid ${isAdmin ? "grid-cols-[15%_75%_10%]" : "grid-cols-[15%_85%]"} items-center p-4 border-b bg-bgColor`}>
                        <button onClick={goBack} className="text-txtColor text-sm border rounded px-3 py-1 bg-bglightColor">Back</button>
                        <h2 className="text-xl text-bglightColor font-bold mr-8 text-center">{selectedSong?.["Title*"]}</h2>
                        {isAdmin && (
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
                        )}
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
            
        </>
    )
}