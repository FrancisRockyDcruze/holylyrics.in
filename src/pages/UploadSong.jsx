import { useEffect, useState, useRef } from "react";
import { getSongs } from "../services/api";
import { addSongToSheet } from "../services/addSongApi";
import { getTextfromImage } from "../utils/ImagetoText";
import { useNavigate } from "react-router-dom";
import CropModal from "./CropModal";
import { getCroppedImg } from "../utils/cropImage";
import { resizeImage } from "../utils/resizeImage";
import imageCompression from "browser-image-compression";
import Loader from "../components/Loader";

export default function UploadSong() {
  const navigate = useNavigate();
  const engRef = useRef("");
  const hinRef = useRef("");
  const benRef = useRef("");
  const cameraRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cameraImage, setCameraImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [language, setLanguage] = useState("eng");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("🔍 Preparing scan...");

    const handleCameraImage = async (e) => {
      // alert("handleCameraImage called");

      const file = e.target.files[0];
      if (!file) return;
      // alert(file?.name);
      // alert(file?.size); //3399828
      // alert(file?.type);
      // alert("Before resize");

      await new Promise(resolve => setTimeout(resolve, 0));    

      try {

        setTimeout(() => {
            setLoadingText("🔍 Preparing scan...");
            setLoading(true);
        }, 100);

        const options = {
            maxWidthOrHeight: 1600,
            maxSizeMB: 1,
            useWebWorker: false,
        };

        setLoadingText("🔍 Preparing scan...");
        const smallFile = await imageCompression(file, options);

        setLoadingText("✂️ Loading crop editor...");
        const reader = new FileReader();

        reader.onload = () => {
          // alert("Reader loaded");
          setCameraImage(reader.result);
          setShowCropper(true);
          setLoading(false);
        };

        reader.onerror = (err) => {
          alert(err.message);
          setLoading(false);
        };

        reader.readAsDataURL(smallFile);

      } catch (err) {
        // alert(String(err));
        setLoading(false);
        alert(err.message);
      }
};

  const runOCR = async (file, lang) => {
    setLoading(true);
    setLoadingText("Reading Lyrics");
    const text = await getTextfromImage(file, lang);
    const lines = text.split("\n").filter((l) => l.trim() !== "");
    const title = lines[0] || "";
    const lyrics = lines.join("\n");

    setAddsong((prev) => ({
      ...prev,
      title,
      lyrics,
      language:
        lang === "eng" ? "English" : lang === "hin" ? "Hindi" : "Bengali",
    }));
    setLoading(false);

  };

  const handleOCRFile = async (e, lang) => {
    const file = e.target.files[0];
    if (!file) return;

    await runOCR(file, lang);
  };

  let [id, setId] = useState("");
  let data = [];
  const loadSongs = async () => {
    data = await getSongs();
    //   id = data.length + 2;
    // console.log(data.length);
    setId(data.length + 2);
  };

  const [addsong, setAddsong] = useState({
    title: "",
    category: "",
    lyrics: "",
    language: "English", // default value
    searchkey: "",
  });

  const [status, setStatus] = useState(""); // For showing success/error
  const [showMenu, setShowMenu] = useState(false);

  const userId = localStorage.getItem("userId");
  // console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setLoadingText("Song is Uploading!");

    if (id < 1) {
      setStatus("Id is not set : " + id);
      setLoading(false);
      return;
    }

    if (
      !addsong.title ||
      !addsong.category ||
      !addsong.lyrics ||
      !addsong.searchkey
    ) {
      alert("Required Fields need to be filled");
      return;
    }

    const finalSong = {
      id: id,
      userId: userId,
      ...addsong,
    };

    // console.log(finalSong);

    setLoadingText("Saving...");

    const result = await addSongToSheet(finalSong);

    if (result.status === "success") {
      console.log("result status");

      // setLoading(true);
      setLoadingText("Song added successfully!");
      // setStatus("Song added successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setLoading(false);
      // setLoadingText("Reading Lyrics");
      alert(`Error: ${result.status}`);
    }
  };

  useEffect(() => {
    // console.log(localStorage)
    const token = localStorage.getItem("admin_token");

    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <div className="max-w-lg mx-auto px-4 sm:p-6 bg-white shadow rounded mt-4 sm:mt-10">
      <div className="mb-2 rounded-md border border-yellow-300 bg-yellow-100 px-4 py-2 text-xs text-yellow-800">
        ⚠️ <span className="font-semibold">Notice:</span> Camera scanning is optimized for <b>Google Chrome</b> or <b>Desktop</b>. Other browsers may experience issues while capturing images.
      </div>
      <div className="grid grid-cols-12 gap-2 px-2">
        <h2 className="text-lg sm:text-2xl font-bold mb-6 text-center col-span-10 ml-10 sm:ml-20">
          Upload New Song
        </h2>
        <h1 className="text-2xl text-lg sm:text-2xl font-bold mb-6 text-end col-span-2">
          #{id}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter Song Title"
          value={addsong.title}
          required
          onChange={(e) => setAddsong({ ...addsong, title: e.target.value })}
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Enter Category (English only)"
          value={addsong.category}
          required
          onChange={(e) => setAddsong({ ...addsong, category: e.target.value })}
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        />

        {/* lyrics */}
        <textarea
          rows={10}
          type="text"
          placeholder="Enter Lyrics"
          value={addsong.lyrics}
          required
          onChange={(e) => setAddsong({ ...addsong, lyrics: e.target.value })}
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        />

        {/* Language Select */}
        <select
          value={addsong.language}
          onChange={(e) => setAddsong({ ...addsong, language: e.target.value })}
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        >
          <option value="English">English</option>
          <option value="Bengali">Bengali</option>
          <option value="Hindi">Hindi</option>
        </select>

        {/* Searchkey */}
        <input
          type="text"
          placeholder="Searchkey (comma seperator & English only)"
          value={addsong.searchkey}
          required
          onChange={(e) =>
            setAddsong({ ...addsong, searchkey: e.target.value })
          }
          className="w-full p-2 sm:p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-base"
        />

        {/* Upload files (eng ben hin)  */}
        <div className="grid grid-rows-1 grid-cols-[1fr_auto] gap-1 justify-between">
          <div className="">
            <button
              type="button"
              className="bg-orange-500 text-white py-2 px-2 rounded text-sm sm:text-lg"
              onClick={() => cameraRef.current.click()}
            >
              📷 Scan
            </button>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraRef}
              className="hidden"
              onChange={handleCameraImage}
            />
          </div>
          <div className="flex gap-1 justify-between">
            {/* Hidden file inputs */}
            <input
              type="file"
              accept="image/*"
              ref={engRef}
              className="hidden"
              onChange={(e) => handleOCRFile(e, "eng")}
            />
            <input
              type="file"
              accept="image/*"
              ref={hinRef}
              className="hidden"
              onChange={(e) => handleOCRFile(e, "hin")}
            />
            <input
              type="file"
              accept="image/*"
              ref={benRef}
              className="hidden"
              onChange={(e) => handleOCRFile(e, "ben")}
            />

            {/* Custom upload buttons */}
            <button
              type="button"
              className="bg-blue-500 text-white py-2 rounded text-sm px-3 sm:text-lg"
              onClick={() => engRef.current.click()}
            >
              Upload English
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 rounded text-sm px-3 sm:text-lg"
              onClick={() => hinRef.current.click()}
            >
              Upload Hindi
            </button>
            <button
              type="button"
              className="bg-green-500 text-white py-2 rounded text-sm px-3 sm:text-lg"
              onClick={() => benRef.current.click()}
            >
              Upload Bengali
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-bgColor text-white py-3 rounded hover:bg-bglightColor transition"
        >
          Upload Song
        </button>
      </form>

      {status && (
        <p className="mt-3 text-center text-xs sm:text-sm text-gray-700">
          {status}
        </p>
      )}

      {/* ADD HERE */}
      {showCropper && (
        <CropModal
          image={cameraImage}
          onCancel={() => setShowCropper(false)}
          onNext={async ({ croppedAreaPixels, rotation, language }) => {
            const croppedFile = await getCroppedImg(
              cameraImage,
              croppedAreaPixels,
              rotation,
            );

            await runOCR(croppedFile, language);

            setShowCropper(false);
          }}
        />
      )}

      {loading && <Loader text={loadingText} />}

    </div>
  );
}

// export default UploadSongs;
