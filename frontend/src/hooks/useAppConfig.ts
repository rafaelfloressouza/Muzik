import { useEffect } from "react";

export default function useAppConfig() {
  // Make browsers context menu not open on right click
  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => event.preventDefault();
    document.addEventListener("contextmenu", handleRightClick);
    return () => document.removeEventListener("contextmenu", handleRightClick);
  }, []);
}
