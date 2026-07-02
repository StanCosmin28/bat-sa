import React from "react";
import { motion } from "framer-motion";

// Pure CSS/Tailwind device frame — same technique as LaptopMockup. The
// iphone_16.svg / samsung_phone.svg assets looked right as flat icons but
// turned out to be solid silhouettes with an opaque #333 "screen" baked in
// (no transparent cutout), so layering them over a real screenshot just
// hid the screenshot behind solid gray/black no matter what image was
// passed in. Building the bezel ourselves guarantees the screenshot is
// always the thing actually visible.
const VARIANTS = {
  iphone: {
    frameClass: "w-[280px] h-[570px] sm:w-[320px] sm:h-[652px]",
    frameRadius: "rounded-[2.5rem] sm:rounded-[3rem]",
    screenRadius: "rounded-[2rem] sm:rounded-[2.4rem]",
    notch: "pill",
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
      {/* Bezel */}
      <div
        className={`relative filter drop-shadow-2xl bg-black p-2 sm:p-2.5 ${v.frameRadius} ${v.frameClass}`}
      >
        {/* Side buttons, pure detail */}
        <div className="absolute -left-[2px] top-20 sm:top-24 w-[2px] h-6 sm:h-8 bg-black/80 rounded-l-sm" />
        <div className="absolute -left-[2px] top-32 sm:top-40 w-[2px] h-10 sm:h-12 bg-black/80 rounded-l-sm" />
        <div className="absolute -right-[2px] top-28 sm:top-36 w-[2px] h-12 sm:h-16 bg-black/80 rounded-r-sm" />

        {/* Screen (the actual screenshot layer) */}
        <div
          className={`relative w-full h-full overflow-hidden bg-gray-900 ${v.screenRadius}`}
        >
          {/* <img
            src={imgSrc}
            alt={altText}
            className="w-full h-full object-cover object-top"
          /> */}
        </div>

        {/* Notch / camera cutout, drawn on top of the screen */}
        {v.notch === "pill" ? (
          <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-black rounded-full z-20 pointer-events-none" />
        ) : (
          <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-black rounded-full ring-4 ring-black/40 z-20 pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
};

export default PhoneMockup;
