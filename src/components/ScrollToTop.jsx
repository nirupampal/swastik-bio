// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top when the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // clear any smooth scroll animation
    });
  }, [pathname]);

  return null;
}