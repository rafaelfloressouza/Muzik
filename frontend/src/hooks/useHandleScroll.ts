import { MutableRefObject, useEffect, useState } from "react";

export default function useHandleScroll(
  divRef: MutableRefObject<HTMLDivElement | null>,
  scrollChanged: (scrollTop: number) => void
) {
  const [scrollTop, setScrollTop] = useState<number>(0);

  // useEffects
  useEffect(() => {
    const scrollHostElement = divRef.current;
    if (!scrollHostElement) return;
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return () => {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Handlers
  const handleScroll = () => {
    const scrollHostElement = divRef?.current;
    if (!scrollHostElement) return;
    setScrollTop(scrollHostElement.scrollTop);
    scrollChanged(scrollHostElement.scrollTop);
  };

  return scrollTop;
}
