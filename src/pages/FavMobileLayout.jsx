import { useState, useEffect } from "react";
import { saveFavoriteToSheet } from "../services/fav_api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { pdfFormats } from "../utils/pdfFormat";
import { useNavigate } from "react-router-dom";
import "../print.css";
import Footer from "../components/Footer";

export default function FavMobileLayout({ songs, spinning, reload, closeFav,isMobilePreview}) {
  const [fav, setFav] = useState([]);
  const [reorderMode, setReorderMode] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [headerText, setHeaderText] = useState("Merry Christmas");
  const [headerSelectorVisible, setHeaderSelectorVisible] = useState(false);
  const [mobilePreviewCollapsed, setMobilePreviewCollapsed] = useState(true); // start as floating button
  const [customHeader, setCustomHeader] = useState("");
  const [noOfLine, setNoOfLine] = useState(53);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Load favorites and sort by position
  useEffect(() => {
    const favSongs = songs
      .filter((s) => s["Fav Added"] === 1)
      .sort(
        (a, b) =>
          Number(a["Fav Position*"] || 0) - Number(b["Fav Position*"] || 0)
      );
    setFav(favSongs);
  }, [songs]);

  // Toggle favorite heart
  const toggleFavorite = async (song) => {
    const newFav = song["Fav Added"] === 1 ? 0 : 1;
    setLoading(true); // show loader

    try {
        await saveFavoriteToSheet(song, newFav);
        reload();
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false); // hide loader
    }
  };

  // Drag & drop reorder handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(fav);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    const updated = items.map((item, idx) => ({
      ...item,
      "Fav Position*": idx + 1,
    }));
    setFav(updated);
  };

  let leftCol_Arr = [];
  let rightCol_Arr = [];
  let totalPg = [];
  let line_Cntr = noOfLine; 

  const result = pdfFormats(
      songs,
      fav,
      leftCol_Arr,
      rightCol_Arr,
      totalPg,
      line_Cntr,
      isMobilePreview = true
  );

  // console.log(totalPg);

  ({
      leftCol_Arr,
      rightCol_Arr,
      totalPg
  } = result);

  const handlePrint = () => {
          // printPDF();
          const printContents = document.getElementById("printPdf").innerHTML;
          document.body.innerHTML = printContents;
          window.print();
    };

  return (
    <div className=" flex flex-col">
      {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        )}

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b bg-bgColor">
         <button
            // onClick={closeFav}
            onClick={() => navigate("/")}
            className="px-2 py-1 border rounded bg-bglightColor"
            
        >Home
        </button>
        <h2 className="text-2xl text-bglightColor font-bold">Holy Lyrical</h2>
        <button
          onClick={() => setReorderMode(!reorderMode)}
          className="px-1 py-1 border rounded bg-bglightColor"
        >
          {reorderMode ? "Done" : "Reorder"}
        </button>
      </div>

      {/* Total Favorites */}
      <p className="px-4 py-2 text-gray-700 font-semibold">
        Total Favorites: {fav.length} songs
      </p>

      <div className="bg-bgColor">  
        {/* Favorite List */}
        <div className="flex-1 overflow-auto px-4 mt-3 min-h-screen">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="favMobile">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {fav.map((song, index) => (
                    <Draggable
                      key={song.id}
                      draggableId={String(song.id)}
                      index={index}
                      isDragDisabled={!reorderMode} // disable dragging unless in Reorder Mode
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...(reorderMode ? provided.draggableProps : {})}
                          className="flex justify-between items-center p-2 border rounded bg-white"
                        >
                          <div className="flex items-center gap-2">
                            {reorderMode && (
                              <span
                                {...provided.dragHandleProps}
                                className="cursor-grab text-gray-500"
                              >
                                ≡
                              </span>
                            )}
                            <span>{song["Title*"]}</span>
                          </div>
                          <span
                          onClick={(e) => {
                              e.stopPropagation(); // IMPORTANT (prevents selecting song)
                              toggleFavorite(song);
                            }}
                            className="cursor-pointer"
                          >
                            {song["Fav Added"] == 1 ? "❤️" : "🤍"}
                          </span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
            
        </div>
        <Footer/>  

        {/* Bottom Fixed Preview Button */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
          <button
            onClick={() => setPreviewOpen(true)}
            className="px-5 mb-1 py-2 bg-bgColor text-white rounded shadow-lg"
          >
            👁 Preview
          </button>
        </div>
        
      </div>

      {previewOpen && (
        <>
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-bglightColor">
            <button
              onClick={() => setPreviewOpen(false)}
              className="px-3 py-1 border rounded"
            >
              ⬅ Back
            </button>
            <h2 className="text-xl font-bold">Preview</h2>
            <button
              className="px-2 mr-5 bg-bgColor text-white rounded shadow-lg"
              onClick={handlePrint}
            >
              Print
            </button>
            <button
              onClick={() => setHeaderSelectorVisible(!headerSelectorVisible)}
              className="fixed top-4 right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-lg z-50"
              >
              ⚙️
              </button>
            <div> 
            </div> {/* empty div to balance header */}
          </div>

          {/* PDF Preview Scrollable */}

          <div className="flex-1 overflow-auto p-4 bg-[#f4f1ea]" id="printPdf">
            {totalPg.map((_, i) => (
              <div key={`lvl-${i}`} className="mb-4 page">
                <div className="bg-white shadow-lg px-4 py-2 border-b-2 border-black">
                  {/* First page has header */}
                  {i === 0 && (
                    <>
                      <div className="text-center text-3xl md:text-5xl font-bold border-b-2 border-black pb-2 mb-2">
                        {headerText === "Custom" ? customHeader : headerText}
                      </div>
                    </>
                  )}

                  {/* PDF Content */}
                  <div className="flex gap-2">
                    <div
                      className="left border bg-bglightColor text-center py-2 text-xs flex-1 whitespace-pre-line"
            
                    >
                      {leftCol_Arr[i]}
                    </div>
                    <div
                      className="right border bg-gray-100 text-center py-2 text-xs flex-1 whitespace-pre-line"
                      
                    >
                      {rightCol_Arr[i]}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-right mt-1">
                  Page {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Header Selector */}
          {headerSelectorVisible && (
          <div className="fixed right-4 bottom-24 bg-white border p-2 rounded shadow-lg">
            <h3 className="font-bold text-sm mb-1">Header Selector</h3>
            
            {["Merry Christmas", "Happy Easter", "Custom"].map((opt, idx) => (
              <button
                key={idx}
                className={`p-1 border rounded mb-1 w-full text-xs ${
                  headerText === opt ? "bg-bglightColor" : "bg-white"
                  }`}
                onClick={() => setHeaderText(opt)}
              >
                {opt}
              </button>
            ))}
            {headerText === "Custom" && (
              <input
                type="text"
                placeholder="Enter custom header"
                className="border p-1 rounded mt-1 w-full text-xs"
                value={customHeader}
                onChange={(e) => setCustomHeader(e.target.value)}
              />
            )}
          </div>
          )}
            
          {/* Export / Print PDF Button */}
          {/* <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
            
          </div> */}
          <div className="bg-bglightColor my-2">
            <label className="text-sm font-bold flex items-center justify-center px-1">Adjust Lines</label>
                <input
                    type="number"
                    placeholder="Enter No. of Line"
                    className="bg-gray-100 text-xs text-center border p-1 rounded mt-2 w-full"
                    value={noOfLine}
                    onChange={(e) => setNoOfLine(Number(e.target.value))
                    }
                />
            </div>
            
        </div>
        <Footer/>
        </>
      )}
    </div>
  );
}