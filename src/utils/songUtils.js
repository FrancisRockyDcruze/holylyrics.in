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

export const getCategorySongs = (songs, tag) => {
  const categorySongs = songs.filter(
    (s) => {
      const categories = s["category*"].split(',').map(c => c.trim());
      return categories.includes(tag);
    }
  )
  // return categorySongs[0] || null;
  return categorySongs;
};

  export const getAllTags = (songs) => {
    const allTags = songs
    .flatMap(song => song["category*"].split(",")) // split categories
    .map(tag => tag.trim()) // remove extra spaces
    .filter(tag => tag.length > 0); // remove empty values

    return [...new Set(allTags)]; // remove duplicates
  }