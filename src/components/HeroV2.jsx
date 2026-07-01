import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import AnimatedSection from "./AnimatedSection";

// Lazy load Spline to prevent it from blocking the initial render
const Spline = lazy(() => import("@splinetool/react-spline"));

// The library resolving isn't the same as the scene being ready to look at —
// Spline's own onLoad fires once it has actually rendered a first frame.
// We fade it in only then, so it never pops in abruptly; the ambient glows
// in Layer 1 keep the background from looking empty in the meantime.
function SplineScene({ scene, className }) {
  const [ready, setReady] = useState(false);

  return (
    <Suspense fallback={null}>
      <div
        className={`w-full h-full transition-opacity duration-1000 ease-out ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <Spline scene={scene} className={className} onLoad={() => setReady(true)} />
      </div>
    </Suspense>
  );
}

const HeroV2 = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#fafcff]">
      {/* ── Layer 1: Ambient Glows ── */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-bat-blue/10 rounded-full blur-[120px] pointer-events-none z-0 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-bat-gold/10 rounded-full blur-[120px] pointer-events-none z-0 -translate-x-1/4 translate-y-1/4" />

      {/* ── Layer 2: Full Screen 3D Spline Canvas ── */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full object-cover"
        />
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
