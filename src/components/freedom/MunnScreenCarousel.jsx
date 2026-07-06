import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, LayoutGrid, Map } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// All three shots share the exact same MacBook mockup — only the screen
// content differs — so cross-fading the full images (instead of splitting
// bezel from screen) already reads as "just the screen changes," since the
// identical bezel pixels never move.
const SCREENS = [
  { id: "villa", img: "/images/freedom/munn_laptop_1_v3.webp", labelKey: "freedom.munnScreen1", Icon: Home },
  { id: "categories", img: "/images/freedom/munn_laptop_2_v3.webp", labelKey: "freedom.munnScreen2", Icon: LayoutGrid },
  { id: "floorplan", img: "/images/freedom/munn_laptop_3_v3.webp", labelKey: "freedom.munnScreen3", Icon: Map },
];

const AUTOPLAY_MS = 4500;

const MunnScreenCarousel = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SCREENS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3]">
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={SCREENS[active].id}
            src={SCREENS[active].img}
            alt={t(SCREENS[active].labelKey)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </AnimatePresence>
      </div>

      {/* Preload the other two so switching never shows a blank frame */}
      <div className="hidden">
        {SCREENS.map((s) => (
          <img key={s.id} src={s.img} alt="" />
        ))}
      </div>

      <div className="relative flex flex-wrap justify-center gap-3 -mt-[13%]">
        {SCREENS.map(({ id, labelKey, Icon }, i) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(i)}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
              active === i ? "text-white" : "text-gray-500 hover:text-bat-navy"
            }`}
          >
            {active === i && (
              <motion.span
                layoutId="munn-tab-pill"
                className="absolute inset-0 bg-bat-navy rounded-full"
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              />
            )}
            <Icon size={16} className="relative z-10" />
            <span className="relative z-10">{t(labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MunnScreenCarousel;
