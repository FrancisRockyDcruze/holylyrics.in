// ../utils/deviceCheck.js
export const isMobile = () => {
  if (typeof window === "undefined") return false; // server-side safety
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};