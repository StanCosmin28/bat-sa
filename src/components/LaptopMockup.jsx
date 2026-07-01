import React from 'react';
import { motion } from 'framer-motion';

// Pure CSS/Tailwind laptop mockup — no SVG frame exists for this yet (only
// iphone_16.svg and samsung_phone.svg do, see PhoneMockup.jsx). Built so a
// real SVG frame can replace the bezel <div> later: keep the screenshot
// layer (the aspect-[16/10] div below) in the same place, just swap the
// bezel/base divs for an <img> frame overlay, the same pattern PhoneMockup
// uses.
const LaptopMockup = ({ imgSrc, altText, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-block w-full ${className}`}
    >
      <div className="relative w-full max-w-[760px] mx-auto filter drop-shadow-2xl">

        {/* ── Bezel / lid — replace this div with a real SVG frame <img> later,
             keeping the screen div directly below it untouched ── */}
        <div className="relative rounded-t-xl bg-[#1a1a1a] p-[10px] sm:p-3">
          {/* Camera notch */}
          <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/70 z-20" />

          {/* Screen (the actual screenshot layer) */}
          <div className="relative aspect-[16/10] rounded-[3px] overflow-hidden bg-gray-900">
            <img
              src={imgSrc}
              alt={altText}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* ── Base / keyboard deck — pure CSS, no image ── */}
        <div className="relative mx-auto h-3 sm:h-4 w-[104%] -translate-x-[2%] rounded-b-[6px] bg-gradient-to-b from-gray-300 to-gray-400">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-1.5 rounded-b-md bg-gray-400/70" />
        </div>
      </div>

      {/* Ground shadow — same ambient-occlusion technique used for the hero phones */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-black/15 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  );
};

export default LaptopMockup;
