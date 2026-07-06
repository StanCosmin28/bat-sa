import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

const LoadingContext = createContext({
  revealed: true,
  markHeroReady: () => {},
});

export const useLoading = () => useContext(LoadingContext);

// Home's hero carries the heavy assets (Spline/WASM or the fallback video) —
// every other route has nothing worth blocking on, so it's marked ready
// immediately. A safety ceiling still applies everywhere in case Spline
// fails to load on a bad connection, so the splash can never hang forever.
// Set generously above realistic load times for the Spline+physics chunks
// (~1.3MB gzipped combined) on a throttled connection — the index.html
// static splash is already covering the wait, so there's no cost to giving
// the real asset signal time to arrive instead of cutting it off early.
const MIN_DISPLAY_MS = 500;
const MAX_WAIT_MS = 9000;

export const LoadingProvider = ({ children }) => {
  const location = useLocation();
  const isHome = useRef(location.pathname === "/").current;

  const [heroReady, setHeroReady] = useState(!isHome);
  const [fontsReady, setFontsReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const mountTimeRef = useRef(null);
  if (mountTimeRef.current === null) mountTimeRef.current = Date.now();

  useEffect(() => {
    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) setFontsReady(true);
      });
    } else {
      setFontsReady(true);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const failsafe = setTimeout(() => {
      setHeroReady(true);
      setFontsReady(true);
    }, MAX_WAIT_MS);
    return () => clearTimeout(failsafe);
  }, []);

  useEffect(() => {
    if (revealed || !heroReady || !fontsReady) return undefined;
    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
    const timer = setTimeout(() => setRevealed(true), remaining);
    return () => clearTimeout(timer);
  }, [heroReady, fontsReady, revealed]);

  const markHeroReady = () => setHeroReady(true);

  return (
    <LoadingContext.Provider value={{ revealed, markHeroReady }}>
      {children}
    </LoadingContext.Provider>
  );
};
