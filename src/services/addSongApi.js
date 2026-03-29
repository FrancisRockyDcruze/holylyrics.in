export const addSongToSheet = async (song) => {
  const API_URL = "https://script.google.com/macros/s/AKfycbwC9mZYxCEM19E0I4Q8gYptaaJFSzNWCzUsF5w_1VoUueP1QVTsrsiWfxOvLGQOOke3/exec";
  
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song),
    });

    const data = await res.json(); // ✅ get response
    return data; // ✅ return it
  } catch (err) {
    console.error("Error uploading song:", err);
    return { status: "error", message: err.message };
  }
};