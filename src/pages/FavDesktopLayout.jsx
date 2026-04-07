import { useEffect,useState } from "react";
import { getSongs } from "../services/api";
import { pdfFormats } from "../utils/pdfFormat";
import { printPDF } from "../utils/pdfGenerator";
import { saveFavoriteToSheet } from "../services/fav_api";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function FabDesktopLayout({ songsVal, loadingVal, reload, closeFav,isMobilePreview  }) {
    const [songs, setSongs] = useState([]);
    const [fav, setFav] = useState([]);
    const [headerText, setHeaderText] = useState("Merry Christmas");
    const [customHeader, setCustomHeader] = useState("");
    const [loading, setLoading] = useState(false);
    const [noOfLine, setNoOfLine] = useState(36);

    const loadSongs = async () => {
        try {
            setLoading(true); // start loader

            const data = await getSongs();
            setSongs(data);

        } catch (err) {
            console.error("Error loading songs:", err);
        } finally {
            setLoading(false); // stop loader
        }
    };

    const toggleFavorite = async (song) => {
    const newFav = song["Fav Added"] === 1 ? 0 : 1;
    setLoading(true); // show loader

    try {
        await saveFavoriteToSheet(song, newFav);
        await loadSongs(); // fetch updated data
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false); // hide loader
    }
    };

    useEffect(() => {
        if (fav.length > 0) {
            const filtered = fav
            .filter((s) => s["lyrics*"])
            .map((s) => s["lyrics*"]); // optional, just lyrics
            // setArr5(filtered);
        }
    }, [fav]);

     useEffect(() => {
         const favSongs = songs
                .filter((s) => s["Fav Position*"])
                .sort(
                    (a, b) =>
                        Number(a["Fav Position*"]) - Number(b["Fav Position*"])
                );

            setFav(favSongs);
    }, [songs]);

    useEffect(() =>{
        loadSongs();
    }, []);

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
        isMobilePreview = false
    );

    // console.log(totalPg);

    ({
        leftCol_Arr,
        rightCol_Arr,
        totalPg
    } = result);

    // console.log(leftCol_Arr[0]);
    // console.log(leftCol_Arr[1]);

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

  const displayHeader =
    headerText === "Custom" ? customHeader : headerText;

    const handlePrint = () => {
        printPDF();
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      {/* MAIN */}
      <main className="grid grid-cols-12 gap-2 p-2">
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        )}

        {/* Column 1: Favorites */}
        <div className="col-span-3 border p-2 h-full overflow-y-auto">
            <h3 className="font-bold mb-2 text-center">Favorites</h3>

            <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="songs">
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
                    >
                        {(provided, snapshot) => (
                        <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center justify-between p-2 border rounded bg-white ${
                            snapshot.isDragging ? "bg-orange-200" : ""
                            }`}
                        >
                            <div className="flex items-center gap-2">
                            <span
                                {...provided.dragHandleProps}
                                className="cursor-grab text-gray-500"
                            >
                                ≡
                            </span>

                            {/* Title with removing favourite */}
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

        {/* Column 2: PDF Preview */}
        <div className="col-span-8 border overflow-auto">
            {/* <div className="bg-gray-300 min-h-screen py-5"> */}
            <div className="max-h-[80vh] overflow-auto w-full px-3 flex flex-col items-center bg-[#f4f1ea]" id="printPdf">
                {totalPg.map((_, i) => (
                <div key={`lvl-${i}`}>
                    <div key={i} className="bg-white my-2 w-[210mm] min-h-[250mm] shadow-lg px-10 py-2 pb-4 font-serif text-gray-900 border-b-2 border-black">
                    {/* Title fs-48 */}
                    {i == 0 ? (
                        <>
                            <div className="text-center text-5xl font-bold border-b-2 border-black pb-2 mb-2">
                                {displayHeader}
                            </div>
                            <div className="text-base py-2" style={{"height" : "950px"}}>
                                <div className="print flex gap-2 pb-4" style={{ }}>
                                    <div className="left border bg-orange-100 text-center py-2 text-xs" style={{"Height" : "900px", "width": "355px", whiteSpace: "pre-line"}}>
                                        {leftCol_Arr[i]}
                                    </div>
                                    <div className="right border bg-gray-100 text-center py-2 text-xs" style={{"Height" : "900px", "width": "355px",whiteSpace: "pre-line"}}>
                                        {rightCol_Arr[i]}
                                    </div>
                                </div>
                            </div>
                            
                        </>
                        ) : null 
                    }
                    {i > 0 ? (
                        <>
                            {/* Content */}
                        <div className="text-base py-2" style={{"height" : "950px"}}>
                            <div className="print flex gap-2 pb-4" style={{ }}>
                                <div className="left border bg-orange-100 text-center py-3 text-xs" style={{"Height" : "900px", "width": "355px", whiteSpace: "pre-line"}}>
                                    {leftCol_Arr[i]}
                                </div> 
                                <div className="right border bg-gray-100 text-center py-3 text-xs" style={{"Height" : "900px", "width": "355px",whiteSpace: "pre-line"}}>
                                    {rightCol_Arr[i]}
                                </div>
                            </div>
                        </div>
                        </>
                    ) : null
                    }
                    </div>
                    <div className="relative bottom-10 left-2 text-xs text-gray-500">
                        Page {i + 1}
                    </div>
                </div>
            ))}
            </div>
        </div>

        {/* Column 3: Controls */}
        <div className="col-span-1 border p-2 flex flex-col gap-4">
          <h3 className="font-bold mb-2 text-center text-lg underline">
            Header Selector
          </h3>

          {["Merry Christmas", "Happy Easter", "Custom"].map(
            (opt, i) => (
              <button
                key={i}
                className={`p-1 border rounded w-full text-xs ${
                  headerText === opt
                    ? "bg-orange-200"
                    : "bg-white"
                }`}
                onClick={() => setHeaderText(opt)}
              >
                {opt}
              </button>
            )
          )}

          {headerText === "Custom" && (
            <input
              type="text"
              placeholder="Enter custom header"
              className="border p-1 rounded mt-2 w-full"
              value={customHeader}
              onChange={(e) =>
                setCustomHeader(e.target.value)
              }
            />
          )}
                <button onClick={handlePrint} className="bg-bgColor mt-5 px-4 py-2 text-white rounded">
                    Print / Save PDF
                </button>

                <div className="bg-orange-200 my-2">
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
        </main>
    </div>
  );
}

