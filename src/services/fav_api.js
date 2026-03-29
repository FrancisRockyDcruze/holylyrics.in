export const saveFavoriteToSheet = async (song, favValue) => {
  const API_URL = "https://script.google.com/macros/s/AKfycbyfNRM3LBRY8D83-070ywRXiR3OVGIR9uznus7rGvJ_n3K2OQWV_ymoy6ZF_EYgwAba/exec";
  try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          id: song.id,
          fav: favValue, // 0 or 1
          // favPos: 
        }),
      });
    } catch (err) {
      console.error(err);
    }
};