export const addSongToSheet = async (song) => {
  const API_URL = "https://script.google.com/macros/s/AKfycbyZNrSsWVTDxxcI0xGdx4uR3cqs-ZXY4-HM-0LABtjIhsN78AzmTFOVvrjBLDB7eUEQ/exec";
  
  // console.log(song)
  
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song),
    });

    const data = await res.json(); // ✅ get response
    console.log(data);

    return data; // ✅ return it
  } catch (err) {
    console.error("Error uploading song:", err);
    return { status: "error", message: err.message };
  }
};