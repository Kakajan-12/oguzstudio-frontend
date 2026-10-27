"use client";

import { useEffect, useState } from "react";

/** `true` once the window is scrolled further than `threshold` pixels down */
export function useScrolled(threshold: number) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return isScrolled;
}
