"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { initGsap } from "@/lib/animations";
import { ArrowDown, Compass, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const watchVisualRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-tagline",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.2 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4 },
          "-=0.8"
        )
        .fromTo(
          watchVisualRef.current,
          { opacity: 0, scale: 0.88, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: "power2.out" },
          "-=1.0"
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=1.0"
        )
        .fromTo(
          detailsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.8"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToReveal = () => {
    const el = document.getElementById("reveal-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 bg-[#08090A] text-zinc-100 overflow-hidden"
    >
      {/* Subtle architectural grid lines & glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#c5a880]/10 to-transparent rounded-full blur-[140px] opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Tagline & Issue Number */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-mono hero-tagline">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
          <span>EDITION NOIR • LIMITED PRODUCTION</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>CALIBRE 104 AUTOMATIQUE</span>
          <span className="text-zinc-600">|</span>
          <span>VALIS / GENÈVE</span>
        </div>
      </div>

      {/* Centerpiece: Headline & Featured Timepiece Silhouette */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left Column: Bold Editorial Typography */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#c5a880] mb-4 font-semibold">
            Haute Horlogerie Suisse
          </p>
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-[-0.02em] font-medium leading-[1.05] text-white"
          >
            PRECISION IN <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-[#e6c88b] to-zinc-400">
              STILLNESS.
            </span>
          </h1>

          <p
            ref={subtextRef}
            className="mt-6 sm:mt-8 text-sm sm:text-base text-zinc-400 max-w-lg font-light leading-relaxed tracking-wide"
          >
            A monobloc architectural titanium case harmonized with an in-house
            escapement. Built for those who measure existence by clarity, not
            velocity.
          </p>

          {/* Quick Metrics Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-zinc-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="tracking-widest uppercase text-[10px]">39mm Titanium</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="tracking-widest uppercase text-[10px]">68h Reserve</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="tracking-widest uppercase text-[10px]">COSC Certified</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Watch Composition with Shadow */}
        <div
          ref={watchVisualRef}
          className="relative flex-1 flex items-center justify-center w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]"
        >
          {/* Background circular decorative dial halo */}
          <div className="absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full border border-white/10 flex items-center justify-center pointer-events-none">
            <div className="w-[260px] sm:w-[320px] h-[260px] sm:h-[320px] rounded-full border border-dashed border-[#c5a880]/20 animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-0 bg-radial from-[#c5a880]/15 via-transparent to-transparent rounded-full" />
          </div>

          {/* Watch Image */}
          <div className="relative z-10 w-[240px] sm:w-[300px] lg:w-[340px] aspect-[3/4] drop-shadow-[0_35px_50px_rgba(0,0,0,0.85)] group transition-transform duration-700 hover:scale-105">
            <Image
              src="/images/watch_nocturne.jpg"
              alt="Aurelia Monolith Nocturne Luxury Watch"
              fill
              sizes="(max-width: 768px) 280px, 360px"
              priority
              className="object-contain filter contrast-[1.03]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar: Scroll Invitation & Coordinates */}
      <div
        ref={detailsRef}
        className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-mono"
      >
        <div className="flex items-center gap-4">
          <span>LAT 46.2044° N</span>
          <span className="text-zinc-600">•</span>
          <span>LON 6.1432° E</span>
        </div>

        <button
          onClick={scrollToReveal}
          className="flex items-center gap-2.5 text-zinc-300 hover:text-[#c5a880] transition-colors group cursor-pointer"
        >
          <span className="tracking-[0.3em]">EXPLORE ATELIER REVEAL</span>
          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#c5a880] transition-colors">
            <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>

        <div>
          <span>SWISS CHRONOMETER ATELIER</span>
        </div>
      </div>
    </section>
  );
}
