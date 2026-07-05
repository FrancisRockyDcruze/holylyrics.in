import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function CropModal({
  image,
  onCancel,
  onNext,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [language, setLanguage] = useState("eng");
  const [loadingScan, setLoadingScan] = useState(false);
  const [loadingText, setLoadingText] = useState("Preparing loading...");

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    // alert("cropmodal 1");
    setCroppedAreaPixels(croppedPixels);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">

      <div className="bg-white rounded-lg shadow-lg w-[95%] max-w-md p-4">

        <h2 className="text-xl font-bold text-center mb-3">
          Scan Song
        </h2>

        {/* Crop Area */}
        <div className="relative w-full h-80 bg-gray-200 rounded overflow-hidden">

          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={3 / 4}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
          />

        </div>

        {/* Zoom */}
        <div className="mt-4">

          <label className="text-sm font-semibold">
            Zoom
          </label>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />

        </div>

        {/* Rotate */}
        <div className="flex justify-between mt-4">

          <button
            type="button"
            className="px-3 py-2 rounded bg-gray-200"
            onClick={() => setRotation((r) => r - 90)}
          >
            ↺ Rotate
          </button>

          <button
            type="button"
            className="px-3 py-2 rounded bg-gray-200"
            onClick={() => setRotation((r) => r + 90)}
          >
            Rotate ↻
          </button>

        </div>

        {/* Language */}

        <div className="mt-4">

          <label className="text-sm font-semibold">
            OCR Language
          </label>

          <select
            className="border rounded w-full p-2 mt-1"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="eng">English</option>
            <option value="hin">Hindi</option>
            <option value="ben">Bengali</option>
          </select>

        </div>

        {/* Buttons */}

        <div className="flex justify-between mt-5">

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
  onClick={async () => {
    setLoadingScan(true);
    setLoadingText("🤖 Reading lyrics...");

    try {
      await onNext({
        croppedAreaPixels,
        rotation,
        language,
      });
    } finally {
      setLoadingScan(false);
    }
  }}
  className="px-4 py-2 rounded bg-blue-600 text-white"
>
  Next
</button>

        </div>

      </div>

    </div>
  );
}