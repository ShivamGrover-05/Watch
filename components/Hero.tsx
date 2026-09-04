"use client";

import { useRef, useEffect, useState } from "react";
import { initGsap } from "@/lib/animations";
import { ChevronDown, Compass, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
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
            // Autoplay restricted; poster image remains gracefully displayed
          });
      }
    }

    // Prefers-reduced-motion accessibility
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && video) {
      video.pause();
    }

    // Subtle entrance animation using existing GSAP architecture
    const { gsap } = initGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-tagline",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 1, delay: 0.1 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.6"
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          detailsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToCollection = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const el = document.getElementById("collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100svh] h-[100svh] flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 bg-[#080E18] text-zinc-100 overflow-hidden select-none"
    >
      {/* ===================================================================== */}
      {/* HERO VIDEO BACKGROUND LAYER (100% COVERAGE • HIGH PERFORMANCE)         */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-video-poster.jpg"
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-90"
          }`}
        >
          <source src="/videos/hero-section-video.mp4" type="video/mp4" />
        </video>

        {/* Extremely subtle, delicate navy overlay to preserve full video detail & ensure crisp typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D18]/85 via-transparent to-[#070D18]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[#080E18]/25 pointer-events-none" />

        {/* Minimal fine architectural grid lines matching luxury aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Seamless bottom fade into collection section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-t from-[#080E18] via-[#080E18]/60 to-transparent pointer-events-none" />
      </div>

      {/* ===================================================================== */}
      {/* TOP TICKER BAR                                                        */}
      {/* ===================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-zinc-300/80 font-mono hero-tagline border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span>ÉDITION MANUFACTURE • HAUTE HORLOGERIE</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-zinc-400">
          <span>LAT 46.2044° N • LON 6.1432° E</span>
          <span className="text-zinc-600">|</span>
          <span>GENÈVE • SWITZERLAND</span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CENTERPIECE HERO CONTENT                                              */}
      {/* ===================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10 flex flex-col items-center text-center">
        {/* Editorial Subtitle */}
        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
          <span className="h-[1px] w-6 sm:w-10 bg-[#C5A880]/60" />
          <p className="text-[10px] sm:text-xs tracking-[0.38em] uppercase text-[#E6C88B] font-mono font-medium">
            Atelier Horloger • In-House Calibre 104
          </p>
          <span className="h-[1px] w-6 sm:w-10 bg-[#C5A880]/60" />
        </div>

        {/* Main Headline */}
        <div ref={headlineRef} className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.02em] font-medium leading-[1.04] text-white">
            AURELIA ATELIER
          </h1>
          <p className="font-serif italic text-lg sm:text-2xl lg:text-3xl text-zinc-200 mt-2 font-light">
            Time, Refined.
          </p>
        </div>

        {/* Subtext Paragraph */}
        <p
          ref={subtextRef}
          className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-zinc-300/90 max-w-xl mx-auto font-light leading-relaxed tracking-wide px-4"
        >
          Mastered chronometry and architectural timepieces. Hand-finished in Geneva
          with cold-worked circular grain dials and heat-blued steel hands.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-md mx-auto"
        >
          <button
            onClick={scrollToCollection}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FAF8F5] hover:bg-white text-[#0B1320] font-semibold text-xs tracking-[0.22em] uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Explore Timepieces</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#0B1320] group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#calibre"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#C5A880] text-zinc-200 hover:text-white text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Calibre Story</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </a>
        </div>

        {/* Key Metrics Badges */}
        <div className="mt-8 hidden sm:flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
            <Compass className="w-3 h-3 text-[#E6C88B]" />
            <span className="tracking-widest uppercase text-[10px] font-mono">39mm Cold-Forged 904L</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-[#E6C88B]" />
            <span className="tracking-widest uppercase text-[10px] font-mono">68h Power Reserve</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
            <ShieldCheck className="w-3 h-3 text-[#E6C88B]" />
            <span className="tracking-widest uppercase text-[10px] font-mono">Geneva Seal Standard</span>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BOTTOM BAR & SCROLL INVITATION                                        */}
      {/* ===================================================================== */}
      <div
        ref={detailsRef}
        className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-mono"
      >
        <div className="flex items-center gap-2">
          <span>ANNUAL ALLOCATION</span>
          <span className="text-zinc-600">•</span>
          <span className="text-[#E6C88B]">250 PIECES WORLDWIDE</span>
        </div>

        <button
          onClick={scrollToCollection}
          className="flex items-center gap-2 text-zinc-200 hover:text-[#E6C88B] transition-colors group cursor-pointer"
          aria-label="Scroll down to watch collection showcase"
        >
          <span className="tracking-[0.25em]">DISCOVER THE COLLECTION</span>
          <div className="w-6 h-6 rounded-full border border-white/25 flex items-center justify-center group-hover:border-[#C5A880] transition-colors">
            <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>

        <div className="hidden sm:block">
          <span>HANDMADE IN VALIS / GENÈVE</span>
        </div>
      </div>
    </section>
  );
}
