"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { initGsap } from "@/lib/animations";
import { ArrowDown, Compass, ShieldCheck, Sparkles } from "lucide-react";

export default function CinematicOpening() {
  const containerRef = useRef<HTMLDivElement>(null);
  const darkIntroRef = useRef<HTMLDivElement>(null);
  const fragmentsContainerRef = useRef<HTMLDivElement>(null);
  const geometricPanelsRef = useRef<HTMLDivElement>(null);
  const diagonalWipeRef = useRef<HTMLDivElement>(null);
  const productPreviewRef = useRef<HTMLDivElement>(null);
  const watchVisualRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGsap();

    const ctx = gsap.context(() => {
      // Main pinned master timeline for Phases 01 -> 05
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      // PHASE 01: Near-black opening with subtle coordinate drift (0% -> 15%)
      tl.to(
        darkIntroRef.current,
        {
          opacity: 0.85,
          scale: 0.98,
          ease: "none",
        },
        0
      )

      // PHASE 02: Horizontal Fragment Reveal (15% -> 40%)
      // Multiple horizontal strips slice into view progressively
      .fromTo(
        ".fragment-strip-1",
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "power2.out" },
        0.12
      )
      .fromTo(
        ".fragment-strip-2",
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "power2.out" },
        0.18
      )
      .fromTo(
        ".fragment-strip-3",
        { xPercent: -80, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "power2.out" },
        0.24
      )
      .fromTo(
        ".fragment-strip-4",
        { xPercent: 120, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "power2.out" },
        0.30
      )

      // PHASE 03: Geometric Panel Reveal (35% -> 60%)
      // Architectural multi-tone panels slide and unfold
      .fromTo(
        ".geo-panel-left",
        { xPercent: -100, scaleY: 0.8 },
        { xPercent: 0, scaleY: 1, ease: "power2.inOut" },
        0.35
      )
      .fromTo(
        ".geo-panel-right",
        { xPercent: 100, scaleY: 0.9 },
        { xPercent: 0, scaleY: 1, ease: "power2.inOut" },
        0.38
      )
      .fromTo(
        ".geo-panel-center",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power2.out" },
        0.42
      )

      // PHASE 04: Dramatic Diagonal Wipe (50% -> 80%)
      // Diagonal sheared polygon sweeps across the screen (matching reference 00:01 - 00:02)
      .fromTo(
        diagonalWipeRef.current,
        {
          clipPath: "polygon(40% 0%, 75% 0%, 35% 100%, 0% 100%)",
          opacity: 0.2,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          ease: "power2.inOut",
        },
        0.52
      )

      // PHASE 05: Product Page Entrance (70% -> 100%)
      // The showcase card glides into place, watch rises, typography staggers
      .fromTo(
        productPreviewRef.current,
        {
          scale: 0.85,
          y: 60,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "power3.out",
        },
        0.68
      )
      .fromTo(
        watchVisualRef.current,
        {
          scale: 0.75,
          y: 70,
          opacity: 0,
          rotate: -5,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          rotate: 0,
          ease: "power2.out",
        },
        0.74
      )
      .fromTo(
        titleRef.current,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        0.82
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToCollection = () => {
    const el = document.getElementById("showcase");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full bg-[#08090A] text-zinc-100 overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* PHASE 01: BLACK INTRO WITH MINIMAL COORDINATES                            */}
      {/* ========================================================================= */}
      <div
        ref={darkIntroRef}
        className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-12 pointer-events-none"
      >
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
            <span>AURELIA ATELIER • GENÈVE</span>
          </div>
          <div className="hidden sm:block">
            <span>CALIBRE 104 • CHRONOMÉTRIE</span>
          </div>
        </div>

        {/* Minimalist Central Title */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-[#c5a880] font-mono font-medium mb-3">
            Haute Horlogerie Suisse
          </p>
          <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl tracking-tight text-white font-normal leading-[1.05]">
            PRECISION IN <br />
            <span className="italic font-light text-zinc-400">STILLNESS.</span>
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-light tracking-widest max-w-md mx-auto uppercase">
            Scroll to initiate architectural sequence
          </p>
        </div>

        {/* Coordinates */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-mono border-t border-white/5 pt-4">
          <span>LAT 46.2044° N</span>
          <span className="flex items-center gap-2 text-zinc-300">
            <span>SCROLL PROGRESSION</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </span>
          <span>LON 6.1432° E</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHASE 02: HORIZONTAL FRAGMENT REVEAL STRIPS                               */}
      {/* ========================================================================= */}
      <div
        ref={fragmentsContainerRef}
        className="absolute inset-0 z-15 pointer-events-none flex flex-col justify-around py-16 px-4"
      >
        {/* Strip 1 */}
        <div className="fragment-strip-1 w-[80%] max-w-3xl h-10 bg-[#121316] border-y border-white/10 flex items-center justify-between px-6 shadow-2xl backdrop-blur-md">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-400">
            [ CALIBRE 104 AUTOMATIQUE ]
          </span>
          <span className="text-[9px] font-mono text-[#c5a880] tracking-widest">
            28,800 VPH
          </span>
        </div>

        {/* Strip 2 */}
        <div className="fragment-strip-2 w-[70%] max-w-2xl h-12 ml-auto bg-[#18191D] border-y border-white/10 flex items-center justify-between px-6 shadow-2xl">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-400">
            [ 39MM GRADE 5 TITANIUM ]
          </span>
          <span className="text-[9px] font-mono text-zinc-400 tracking-widest">
            ±1.2 SEC/DAY
          </span>
        </div>

        {/* Strip 3 */}
        <div className="fragment-strip-3 w-[85%] max-w-4xl h-14 bg-[#23242A] border-y border-white/10 flex items-center justify-between px-6 shadow-2xl">
          <span className="font-serif tracking-[0.3em] uppercase text-xs text-white">
            AURELIA • ATELIER SÉRIE 01
          </span>
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#c5a880]">
            LIMITED PRODUCTION
          </span>
        </div>

        {/* Strip 4 */}
        <div className="fragment-strip-4 w-[60%] max-w-xl h-8 ml-auto bg-[#131417] border-y border-white/10 flex items-center justify-between px-6 shadow-2xl">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-400">
            [ VALLÉE DE JOUX • SWITZERLAND ]
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHASE 03: GEOMETRIC ARCHITECTURAL PANELS                                  */}
      {/* ========================================================================= */}
      <div
        ref={geometricPanelsRef}
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden"
      >
        {/* Left Architectural Panel */}
        <div className="geo-panel-left absolute left-0 top-0 bottom-0 w-[35%] bg-[#121316] border-r border-white/10 shadow-2xl" />

        {/* Right Architectural Panel */}
        <div className="geo-panel-right absolute right-0 top-0 bottom-0 w-[40%] bg-[#1A1B20] border-l border-white/10 shadow-2xl" />

        {/* Center Tone Accent Block (echoing reference video 00:00) */}
        <div className="geo-panel-center relative w-[80%] max-w-3xl h-24 sm:h-28 flex items-center shadow-2xl border border-white/10">
          <div className="h-full w-1/4 bg-[#141518] border-r border-white/10" />
          <div className="h-full w-1/4 bg-[#212227] border-r border-white/10 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#3B3C42] border border-white/20" />
          </div>
          <div className="h-full w-1/4 bg-[#34353C] border-r border-white/10" />
          <div className="h-full w-1/4 bg-[#757780]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHASE 04 & 05: DRAMATIC DIAGONAL WIPE & PRODUCT ENTRANCE                   */}
      {/* ========================================================================= */}
      <div
        ref={diagonalWipeRef}
        className="absolute inset-0 z-30 w-full h-full bg-[#ECEEF0] flex items-center justify-center p-4 sm:p-10 shadow-2xl overflow-hidden"
        style={{
          clipPath: "polygon(40% 0%, 75% 0%, 35% 100%, 0% 100%)",
        }}
      >
        {/* The Emerging Showcase Card Stage (Matches Reference Video 00:03) */}
        <div
          ref={productPreviewRef}
          className="relative w-full max-w-5xl h-[85vh] max-h-[640px] bg-white rounded-2xl sm:rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)] border border-white/80 flex flex-col justify-between p-6 sm:p-10 overflow-hidden"
        >
          {/* Background Watermark Typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.05]">
            <span className="font-serif text-[18vw] font-black tracking-widest text-zinc-950 uppercase">
              AURELIA
            </span>
          </div>

          {/* Top Bar (Reference 00:03: ≡ HELLOPOD | Logo | To Catalog) */}
          <div className="relative z-10 flex items-center justify-between border-b border-zinc-100 pb-4 text-zinc-800 text-[10px] sm:text-[11px] tracking-[0.25em] font-medium uppercase">
            <div className="flex items-center gap-3">
              <span className="font-bold text-base leading-none">≡</span>
              <span>AURELIA GENÈVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880]" />
              <span className="font-serif tracking-widest text-zinc-900 font-semibold text-xs sm:text-sm">
                atelier.
              </span>
            </div>
            <div className="text-zinc-500 font-mono text-[10px]">
              CALIBRE VIII • 2026
            </div>
          </div>

          {/* Center Stage: Entering Timepiece & Headline */}
          <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-8 my-auto">
            <div
              ref={watchVisualRef}
              className="relative w-[210px] sm:w-[280px] aspect-[3/4] drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)]"
            >
              <Image
                src="/images/watch_nocturne.jpg"
                alt="Aurelia Watch Reveal"
                fill
                sizes="280px"
                priority
                className="object-contain"
              />
            </div>

            <div ref={titleRef} className="text-center md:text-left max-w-md">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#c5a880] font-mono font-semibold">
                Inception • Phase 05
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-zinc-950 mt-1 font-normal tracking-tight">
                The Monolith
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                Hand-regulated Swiss chronometer. Dual-finish 904L steel with
                carbon micro-pigment obsidian dial.
              </p>

              <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                <span className="text-2xl font-mono font-medium text-zinc-900">
                  $4,200.00
                </span>
                <span className="text-[10px] tracking-widest uppercase px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full font-mono">
                  Numbered Atelier Piece
                </span>
              </div>

              <div className="mt-6">
                <button
                  onClick={scrollToCollection}
                  className="px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-[#c5a880] text-white hover:text-black text-xs tracking-wider uppercase font-medium transition-all shadow-md cursor-pointer"
                >
                  Enter Interactive Collection ↓
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Card Bar */}
          <div className="relative z-10 flex items-center justify-between border-t border-zinc-100 pt-4 text-[10px] tracking-[0.25em] text-zinc-500 uppercase font-mono">
            <span>DIAGONAL APERTURE LOCK</span>
            <span className="text-zinc-800 font-semibold">
              SCROLL DOWN FOR DIRECTIONAL SHOWCASE ▾
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
