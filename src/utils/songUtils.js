export const filterSongsByLanguage = (songs, language) => {
  return songs.filter(
    (s) =>
      s["language*"].toLowerCase() === language.toLowerCase() &&
      s["Status*"].toLowerCase() === "ready"
  );
};

export const getCurrentSongs = (songs, page, songsPerPage) => {
  const start = (page - 1) * songsPerPage;
  const end = start + songsPerPage;
  return songs.slice(start, end);
};

export const getTotalPages = (songs, songsPerPage) => {
  return Math.ceil(songs.length / songsPerPage);
};

export const loadInitialSong = (songs, language = "english") => {
  const langSongs = songs.filter(
    (s) =>
      s["language*"].toLowerCase() === language.toLowerCase() &&
      s["Status*"].toLowerCase() === "ready"
  );
  return langSongs[0] || null;
};