import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * This component automatically scrolls to the top of the page
 * whenever the route changes.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};
