import React from 'react';
import { motion } from 'framer-motion';

// iPhone frame SVG is landscape natively, so it gets rotated 90deg into portrait.
// Samsung frame SVG is already portrait, so it's placed directly, no rotation needed.
const FRAMES = {
  iphone: {
    src: '/iphone_16.svg',
    alt: 'iPhone 16 Frame',
    rotate: true,
    frameClass: 'w-[280px] h-[570px] sm:w-[320px] sm:h-[652px]',
  },
  samsung: {
    src: '/samsung_phone.svg',
    alt: 'Samsung Galaxy Frame',
    rotate: false,
    frameClass: 'w-[280px] h-[580px] sm:w-[320px] sm:h-[663px]',
  },
};

const PhoneMockup = ({ imgSrc, altText, delay = 0, className = '', variant = 'iphone' }) => {
  const frame = FRAMES[variant] ?? FRAMES.iphone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-block ${className}`}
    >
      {/* Strict portrait container. */}
      <div className={`relative filter drop-shadow-2xl overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-black ${frame.frameClass}`}>

        {/* The screenshot (under the bezel) */}
        <div className="absolute inset-0 z-10 w-full h-full p-2 flex items-center justify-center">
          <div className="relative w-full h-full rounded-[2.2rem] sm:rounded-[2.6rem] overflow-hidden bg-gray-900">
            <img
              src={imgSrc}
              alt={altText}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Frame overlay - rotated into portrait for iPhone, placed as-is for Samsung */}
        {frame.rotate ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 z-20 pointer-events-none w-[570px] h-[280px] sm:w-[652px] sm:h-[320px] flex items-center justify-center">
            <img src={frame.src} alt={frame.alt} className="w-full h-full pointer-events-none" />
          </div>
        ) : (
          <div className="absolute inset-0 z-20 pointer-events-none w-full h-full flex items-center justify-center">
            <img src={frame.src} alt={frame.alt} className="w-full h-full pointer-events-none" />
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default PhoneMockup;
