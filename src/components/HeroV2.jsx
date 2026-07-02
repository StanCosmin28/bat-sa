import React, { Suspense, lazy, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import AnimatedSection from "./AnimatedSection";

// Lazy load Spline to prevent it from blocking the initial render
const Spline = lazy(() => import("@splinetool/react-spline"));

// Spline's engine is ~1.3MB+ gzip on its own (physics/WASM init blocks the
// main thread while it starts up) — too heavy to justify on mobile. Mobile
// gets a ~170KB pre-rendered loop of the same animation instead; desktop
// keeps the live, interactive Spline canvas.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const handleChange = (e) => setIsDesktop(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

// The library resolving isn't the same as the scene being ready to look at —
// Spline's own onLoad fires once it has actually rendered a first frame.
// We fade it in only then, so it never pops in abruptly; the ambient glows
// in Layer 1 keep the background from looking empty in the meantime.
//
// `active` tracks whether the hero is actually on screen. Spline runs its
// own render loop (WASM physics + three.js) that keeps burning CPU/GPU even
// while scrolled far out of view — `app.stop()/play()` (exposed via onLoad)
// pauses that loop without unmounting the canvas, so there's no reload/flash
// when the user scrolls back up.
function SplineScene({ scene, className, active }) {
  const [ready, setReady] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    if (!appRef.current) return;
    if (active) appRef.current.play();
    else appRef.current.stop();
  }, [active]);

  return (
    <Suspense fallback={null}>
      <div
        className={`w-full h-full transition-opacity duration-1000 ease-out ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <Spline
          scene={scene}
          className={className}
          onLoad={(app) => {
            appRef.current = app;
            if (!active) app.stop();
            setReady(true);
          }}
        />
      </div>
    </Suspense>
  );
}

// Skip back to this point (not to 0) once the clip ends, so only the very
// first playthrough shows the full intro — every repeat afterwards feels
// like a shorter, later-starting cycle instead of visibly resetting to the
// same opening beat each time.
const LOOP_RESTART_SECONDS = 4;

// No poster — a still frame that then "jumps" into motion once the video
// buffers reads as broken. Stay on the plain background (Layer 1's glows)
// and fade the video in only once it can actually play.
function MobileHeroVideo({ active }) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef(null);

  // Same idea as the desktop Spline canvas: pause decoding once the hero
  // scrolls out of view instead of leaving it playing off-screen forever.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) video.play().catch(() => {});
    else video.pause();
  }, [active]);

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${ready ? "opacity-100" : "opacity-0"}`}
      autoPlay
      muted
      playsInline
      onCanPlay={() => setReady(true)}
      onEnded={() => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = LOOP_RESTART_SECONDS;
        video.play();
      }}
    >
      <source src="/videos/hero-robot-mobile.webm" type="video/webm" />
      <source src="/videos/hero-robot-mobile.mp4" type="video/mp4" />
    </video>
  );
}

const HeroV2 = () => {
  const { t } = useLanguage();
  const isDesktop = useIsDesktop();
  const sectionRef = useRef(null);
  // Starts true (hero is what's on screen on first paint); IntersectionObserver
  // flips it once the user scrolls the hero out of the viewport, so the
  // Spline canvas / mobile video can stop doing work while it's not visible.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#fafcff]">
      {/* ── Layer 1: Ambient Glows ── */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-bat-blue/10 rounded-full blur-[120px] pointer-events-none z-0 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-bat-gold/10 rounded-full blur-[120px] pointer-events-none z-0 -translate-x-1/4 translate-y-1/4" />

      {/* ── Layer 2: Hero Visual — live Spline canvas on desktop, a ~170KB pre-rendered loop on mobile ── */}
      <div className="absolute inset-0 z-10 w-full h-full">
        {isDesktop ? (
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full object-cover"
            active={inView}
          />
        ) : (
          <MobileHeroVideo active={inView} />
        )}
      </div>

      {/* ── Layer 3: Gradient Protection for Text ── */}
      {/* Taller gradient on mobile to ensure perfect legibility over the robot */}
      <div className="absolute inset-x-0 bottom-0 h-[75vh] md:h-[60vh] bg-gradient-to-t from-white via-white/90 to-transparent z-20 pointer-events-none" />

      {/* ── Layer 4: Content overlaid on top ── */}
      <div className="container mx-auto px-6 lg:px-16 relative z-30 h-full flex flex-col justify-end pb-12 md:pb-20 pointer-events-none">
        <div className="w-full max-w-4xl pointer-events-none">
          <AnimatedSection staggerChildren delay={0.15} staggerDelay={0.25} itemDuration={1}>
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-bat-blue/20 bg-white/70 text-bat-blue text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-sm pointer-events-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bat-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-bat-blue"></span>
              </span>
              {t("home.heroKicker")}
            </div>

            {/* Massive Overlaid Title - Adjusted for mobile */}
            <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black md:leading-[1.05] tracking-tight text-bat-navy pointer-events-auto">
              {t("home.heroTitle")}
              <br />
              <span className="relative inline-block mt-1 md:mt-2">
                <span className="relative bg-gradient-to-br from-bat-blue via-blue-600 to-bat-navy bg-clip-text text-transparent">
                  {t("home.heroTitleHighlight")}
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 md:mt-6 text-base md:text-xl text-gray-700 max-w-2xl font-light leading-relaxed pointer-events-auto">
              {t("home.heroSubtitle")}
            </p>

            {/* Actions */}
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/products"
                className="pointer-events-auto group relative inline-flex items-center justify-center gap-2 bg-bat-navy text-white font-semibold py-3 px-8 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-6px_rgba(15,23,42,0.4)] hover:-translate-y-0.5 whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-bat-blue to-bat-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  {t("common.discover")}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
              <Link
                to="/freedom"
                className="pointer-events-auto inline-flex items-center justify-center gap-2 bg-white/80 border border-gray-200 hover:border-bat-blue/50 hover:bg-white text-bat-navy font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm whitespace-nowrap"
              >
                {t("home.teaserBtn")}
                <ArrowUpRight size={18} className="text-gray-400" />
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Small interaction hint in the bottom right corner (hidden on mobile, visible on desktop) */}
        {/* <div className="absolute bottom-8 right-6 md:right-16 z-30 pointer-events-none opacity-60 hidden md:flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Interactive 3D</span>
          <div className="w-1.5 h-1.5 rounded-full bg-bat-blue animate-pulse"></div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroV2;
