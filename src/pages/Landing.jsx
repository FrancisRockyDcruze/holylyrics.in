import { useEffect, useState } from "react";  

// Import layouts
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

export default function Landing(
    layoutProps
) {
  
  // ------------------------------
  // Render correct layout
  // ------------------------------

  return layoutProps.isMobile ? (
    <MobileLayout {...layoutProps} />
  ) : (
    <DesktopLayout {...layoutProps} />
  );
}