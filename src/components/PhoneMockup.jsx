import React from "react";
import { motion } from "framer-motion";

// iPhone uses the real iphone_16.svg asset, as-is — no CSS layered on top.
// The original file (public/iphone_16.svg) is authored landscape with the
// dynamic island near the left edge, so public/iphone_16_portrait.svg is a
// one-time, lossless re-export of the exact same art rotated 90deg into
// portrait (same paths, wrapped in a single rotation transform + swapped
// viewBox — nothing redrawn, resized, or added). Its screen is a real
// transparent cutout, so the screenshot is layered underneath it (screen
// rect below, from numerically sampling the SVG's own path coordinates —
// see git history) and the frame renders on top, unchanged.
const IPHONE_SVG = "/iphone_16_portrait.svg";
const IPHONE_SCREEN = { left: "5.05%", top: "2.25%", width: "89.9%", height: "95.5%" };

const VARIANTS = {
  iphone: {
    frameClass: "w-[280px] h-[570px] sm:w-[320px] sm:h-[652px]",
  },
  samsung: {
    frameClass: "w-[280px] h-[580px] sm:w-[320px] sm:h-[663px]",
    frameRadius: "rounded-[2rem] sm:rounded-[2.4rem]",
    screenRadius: "rounded-[1.6rem] sm:rounded-[1.9rem]",
    notch: "dot",
  },
};

const PhoneMockup = ({
  imgSrc,
  altText,
  delay = 0,
  className = "",
  variant = "iphone",
  screenClassName = "",
  screenBg = "bg-gray-900",
}) => {
  const v = VARIANTS[variant] ?? VARIANTS.iphone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-block ${className}`}
    >
      {variant === "iphone" ? (
        <div className={`relative filter drop-shadow-2xl ${v.frameClass}`}>
          <div
            className="absolute overflow-hidden rounded-[2rem] sm:rounded-[2.4rem] bg-gray-900 p-0.5"
            style={IPHONE_SCREEN}
          >
            <img
              src={imgSrc}
              alt={altText}
              className="w-full h-full object-cover object-top rounded-[1.8rem] sm:rounded-[2.2rem]"
            />
          </div>
          <img src={IPHONE_SVG} alt="" className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
      ) : (
        <div
          className={`relative filter drop-shadow-2xl bg-black p-2 sm:p-2.5 ${v.frameRadius} ${v.frameClass}`}
        >
          {/* Side buttons, pure detail */}
          <div className="absolute -left-[2px] top-20 sm:top-24 w-[2px] h-6 sm:h-8 bg-black/80 rounded-l-sm" />
          <div className="absolute -left-[2px] top-32 sm:top-40 w-[2px] h-10 sm:h-12 bg-black/80 rounded-l-sm" />
          <div className="absolute -right-[2px] top-28 sm:top-36 w-[2px] h-12 sm:h-16 bg-black/80 rounded-r-sm" />

          {/* Screen (the actual screenshot layer) */}
          <div
            className={`relative w-full h-full overflow-hidden p-0.5 ${screenBg} ${v.screenRadius} ${screenClassName}`}
          >
            <img
              src={imgSrc}
              alt={altText}
              className="w-full h-full object-cover object-top rounded-[1.5rem] sm:rounded-[1.8rem]"
            />
          </div>

          {/* Notch / camera cutout, drawn on top of the screen */}
          <div className="absolute top-6 sm:top-7 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-black rounded-full ring-4 ring-black/40 z-20 pointer-events-none" />
        </div>
      )}
    </motion.div>
  );
};

export default PhoneMockup;
