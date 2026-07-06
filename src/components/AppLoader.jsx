import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";

const EASE = [0.76, 0, 0.24, 1];
const GATE_DURATION = 0.85;
const GATE_DELAY = 0.15;

const AppLoader = () => {
  const { revealed } = useLoading();
  const [mounted, setMounted] = useState(true);

  // The static loader baked into index.html has been covering the screen
  // since before this component's own JS even finished downloading — this
  // runs before the browser paints, so swapping to the animated version is
  // invisible (they render pixel-identical navy + logo).
  useLayoutEffect(() => {
    document.getElementById("static-loader")?.remove();
  }, []);

  useEffect(() => {
    if (!revealed) return undefined;
    const timer = setTimeout(
      () => setMounted(false),
      (GATE_DURATION + GATE_DELAY) * 1000 + 100,
    );
    return () => clearTimeout(timer);
  }, [revealed]);

  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] ${revealed ? "pointer-events-none" : "pointer-events-auto"}`}
      aria-hidden={revealed}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-bat-navy"
        initial={false}
        animate={{ y: revealed ? "-100%" : "0%" }}
        transition={{
          duration: GATE_DURATION,
          ease: EASE,
          delay: revealed ? GATE_DELAY : 0,
        }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-bat-navy"
        initial={false}
        animate={{ y: revealed ? "100%" : "0%" }}
        transition={{
          duration: GATE_DURATION,
          ease: EASE,
          delay: revealed ? GATE_DELAY : 0,
        }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-7"
        animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 0.94 : 1 }}
        transition={{ duration: 0.25, ease: "easeIn" }}
      >
        <motion.img
          src="/logo-bat-white.svg"
          alt="BAT"
          className="w-36 md:w-44 h-auto"
          animate={{ scale: [1, 1.045, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="w-28 h-[3px] rounded-full bg-white/15 overflow-hidden">
          <motion.div
            className="h-full w-1/3 rounded-full bg-bat-gold"
            animate={{ x: ["-100%", "220%"] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AppLoader;
