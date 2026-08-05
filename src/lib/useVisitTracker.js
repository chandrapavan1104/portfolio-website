import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { logVisit } from "./analytics";

// Logs one visit per route change. The admin page is skipped so my own
// dashboard checks never show up in the numbers.
const IGNORED_PREFIXES = ["/admin"];

export default function useVisitTracker() {
  const location = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    const path = location.pathname;

    // StrictMode double-invokes effects in development; this keeps that from
    // firing the same visit twice.
    if (lastPath.current === path) {
      return;
    }

    lastPath.current = path;

    if (IGNORED_PREFIXES.some((prefix) => path.startsWith(prefix))) {
      return;
    }

    logVisit(path);
  }, [location.pathname]);
}
