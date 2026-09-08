"use client";

import { useRef, useEffect, useState } from "react";

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Autoplay handling with fallback
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoLoaded(true))
          .catch(() => {
            // Autoplay restricted fallback
          });
      }
    }

    // Prefers-reduced-motion accessibility
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && video) {
      video.pause();
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] h-[100svh] bg-[#080E18] overflow-hidden select-none flex items-center justify-center"
    >
      {/* Hero Video Display */}
      <video
        ref={videoRef}
        src="/videos/hero-section-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-90"
        }`}
      >
        <source src="/videos/hero-section-video.mp4" type="video/mp4" />
        <source src="/videos/hero section video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
