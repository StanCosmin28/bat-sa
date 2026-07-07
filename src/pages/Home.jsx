import { lazy, Suspense, useEffect } from "react";
import HeroV2 from "../components/HeroV2";
import Pillars from "../components/home/Pillars";

// Everything below the fold is split into its own chunk — none of it needs
// to be in the bundle the user pays for on first paint. The dynamic imports
// are kicked off again in an idle callback right after mount (see below),
// so by the time someone actually scrolls down the chunk is already cached
// and Suspense resolves instantly instead of showing a fallback.
const Industries = lazy(() => import("../components/home/Industries"));
const IosShowcase = lazy(() => import("../components/home/IosShowcase"));
const Integrations = lazy(() => import("../components/home/Integrations"));
const AndroidShowcase = lazy(
  () => import("../components/home/AndroidShowcase"),
);
const FreedomTeaser = lazy(() => import("../components/home/FreedomTeaser"));
const ContactCta = lazy(() => import("../components/home/ContactCta"));

const belowFoldChunks = [
  () => import("../components/home/Industries"),
  () => import("../components/home/IosShowcase"),
  () => import("../components/home/Integrations"),
  () => import("../components/home/AndroidShowcase"),
  () => import("../components/home/FreedomTeaser"),
  () => import("../components/home/ContactCta"),
];

const Home = () => {
  useEffect(() => {
    // requestIdleCallback lets the browser finish painting the hero (and
    // starting the Spline/video fetch) before spending bandwidth on chunks
    // the user hasn't scrolled to yet. Falls back to a short timeout on
    // Safari, which doesn't implement it.
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => belowFoldChunks.forEach((load) => load()));
    return () => cancelIdle(id);
  }, []);

  return (
    <div className="bg-white">
      <HeroV2 />
      <Pillars />
      <Suspense fallback={null}>
        <Industries />
      </Suspense>
      <Suspense fallback={null}>
        <IosShowcase />
      </Suspense>
      <Suspense fallback={null}>
        <Integrations />
      </Suspense>
      <Suspense fallback={null}>
        <AndroidShowcase />
      </Suspense>
      <Suspense fallback={null}>
        <FreedomTeaser />
      </Suspense>
      <Suspense fallback={null}>
        <ContactCta />
      </Suspense>
    </div>
  );
};

export default Home;
