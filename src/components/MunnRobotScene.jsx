import React, { Suspense, lazy } from 'react';
import { Loader2 } from "lucide-react";

// Lazy load Spline to prevent it from blocking the initial render
const Spline = lazy(() => import('@splinetool/react-spline'));

export default function MunnRobotScene({ className }) {
  return (
    <div className={className}>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100">
            <Loader2 className="w-10 h-10 animate-spin text-bat-blue" />
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
}
