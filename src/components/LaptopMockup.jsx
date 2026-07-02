import React from 'react';
import { motion } from 'framer-motion';

// Pure CSS/Tailwind laptop mockup, built as a real 3D scene (not a flat
// front-on graphic): `perspective` on the outer wrapper + independent
// `rotateX` on the screen and base, hinged at the shared edge via
// origin-bottom/origin-top, plus a constant rotateY twist on the whole
// group for a 3/4 angle. No SVG frame exists for this yet (only
// iphone_16.svg and samsung_phone.svg do, see PhoneMockup.jsx) — if one
// ever gets added, swap the bezel/base divs for an <img> overlay and keep
// the screenshot layer (the aspect-[16/10] div below) where it is.
const LaptopMockup = ({ imgSrc, altText, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-block w-full [perspective:2000px] ${className}`}
    >
      <div className="relative w-full max-w-[760px] mx-auto [transform-style:preserve-3d] [transform:rotateY(-20deg)_rotateX(2deg)] filter drop-shadow-2xl">

        {/* ── Screen / lid — tilted back slightly around its bottom hinge ── */}
        <div className="relative origin-bottom rounded-t-xl bg-[#1a1a1a] p-[10px] sm:p-3 [transform:rotateX(-4deg)]">
          {/* Camera notch */}
          <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/70 z-20" />

          {/* Screen (the actual screenshot layer) */}
          <div className="relative aspect-[16/10] rounded-[3px] overflow-hidden bg-gray-900">
            <img
              src={imgSrc}
              alt={altText}
              className="w-full h-full object-cover object-top"
            />
            {/* Glass glare, sells the tilt */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ── Base / keyboard deck — laid back around its top hinge, so it
             reads as the top surface of the laptop seen from above ── */}
        <div className="relative mx-auto w-[104%] -ml-[2%] h-10 sm:h-14 origin-top [transform:rotateX(80deg)]">
          <div className="absolute inset-0 rounded-b-xl bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]">
            {/* Trackpad */}
            <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 sm:h-9 rounded-md bg-black/10 border border-black/10" />
          </div>
          {/* Front lip edge */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-1.5 rounded-b-md bg-gray-400/80" />
        </div>
      </div>

      {/* Ground shadow — shifted to follow the rotateY twist */}
      <div className="absolute -bottom-2 left-[42%] -translate-x-1/2 w-[65%] h-8 bg-black/15 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  );
};

export default LaptopMockup;
