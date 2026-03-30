import { useEffect, useState } from "react";
import { getSongs } from "../services/api";
import FavDesktopLayout from "./FavDesktopLayout";
import FavMobileLayout from "./FavMobileLayout";
import { isMobile } from "../utils/deviceCheck"; // simple utility to detect mobile

export default function Favorites() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all songs
  const loadSongs = async () => {
    try {
      setLoading(true);
      const data = await getSongs();
      setSongs(data);
    } catch (err) {
      console.error("Failed to load songs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  // Detect mobile or desktop
  return isMobile() ? (
    <FavMobileLayout songs={songs} loading={loading} reload={loadSongs} isMobilePreview = "true" />
  ) : (
    <FavDesktopLayout songs={songs} loading={loading} reload={loadSongs} isMobilePreview = "false"/>
  );
}