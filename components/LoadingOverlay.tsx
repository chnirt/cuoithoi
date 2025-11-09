// components/LoadingOverlay.tsx
"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/assets/lottie/loading.json";

interface LoadingOverlayProps {
  show: boolean;
}

export default function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-60 bg-opacity-70 flex items-center justify-center">
      <Lottie animationData={loadingAnimation} loop className="w-40 h-40" />
    </div>
  );
}
