import React, { Suspense, lazy, useState, useEffect } from "react";

// Bare utility page — just the Spline canvas, full-bleed, no nav/footer.
// Open this on desktop Chrome with the mobile device toolbar on, wait for
// it to fully load, then screen-record ~5-8s of the animation to turn into
// the mobile fallback video/GIF. Safe to delete once that's captured.
const Spline = lazy(() => import("@splinetool/react-spline"));

// The scene reacts to mouse position, which means a real cursor shows up in
// the recording. This hides the OS cursor (CSS) and drives a slow synthetic
// circular mousemove sweep instead, so the robot animates on its own and
// there's nothing to actually move or click while recording.
function useAutoMouseSweep() {
  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radiusX = window.innerWidth * 0.25;
    const radiusY = window.innerHeight * 0.18;
    let angle = 0;

    const interval = setInterval(() => {
      angle += 0.015;
      const x = centerX + Math.cos(angle) * radiusX;
      const y = centerY + Math.sin(angle) * radiusY;
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: x, clientY: y, bubbles: true }));
    }, 16);

    return () => clearInterval(interval);
  }, []);
}

const SplinePreview = () => {
  const [ready, setReady] = useState(false);
  useAutoMouseSweep();

  return (
    <div className="fixed inset-0 bg-[#fafcff] cursor-none">
      <Suspense fallback={null}>
        <div className={`w-full h-full transition-opacity duration-1000 ease-out ${ready ? "opacity-100" : "opacity-0"}`}>
          <Spline
            scene="https://prod.spline.design/6gw7k4PgCQ2-XzVw/scene.splinecode"
            className="w-full h-full object-cover"
            onLoad={() => setReady(true)}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default SplinePreview;
