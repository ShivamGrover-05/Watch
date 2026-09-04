"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  Sliders,
  Check,
  X,
  Info,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { initGsap } from "@/lib/animations";

export interface WatchVariant {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  collection: string;
  price: string;
  numericPrice: number;
  image: string;
  dialColor: string;
  dialName: string;
  bezel: string;
  caseMaterial: string;
  waterResistance: string;
  calibre: string;
  powerReserve: string;
  thickness: string;
  description: string;
}

export const WATCH_VARIANTS: WatchVariant[] = [
  {
    id: "aurelia",
    code: "01",
    name: "AURELIA",
    subtitle: "Automatic Chronograph",
    collection: "Atelier Series 01",
    price: "$4,800.00",
    numericPrice: 4800,
    image: "/images/watch_aurelia_transparent.png",
    dialColor: "#6B8A99",
    dialName: "Arctic Slate Blue",
    bezel: "Satin Finish Tungsten",
    caseMaterial: "39mm Cold-Forged 904L Steel",
    waterResistance: "100m / 10 ATM",
    calibre: "Calibre 104-G Ice Precision",
    powerReserve: "68 Hours",
    thickness: "8.9 mm",
    description:
      "Inspired by the crystalline seracs of the Swiss Alps, featuring a cold-worked circular grain dial and heat-blued steel hands tempered at 290°C.",
  },
  {
    id: "nocturne",
    code: "02",
    name: "NOCTURNE",
    subtitle: "Automatic Chronometer",
    collection: "Atelier Series 02",
    price: "$5,600.00",
    numericPrice: 5600,
    image: "/images/watch_nocturne_transparent.png",
    dialColor: "#1C1B1A",
    dialName: "Obsidian Onyx",
    bezel: "Titanium Grade 5",
    caseMaterial: "39mm 904L Satin Steel",
    waterResistance: "100m / 10 ATM",
    calibre: "Calibre 104 Automatique",
    powerReserve: "68 Hours",
    thickness: "8.9 mm",
    description:
      "A pure black matte dial engineered with micro-blasted carbon pigment to absorb 99.4% of ambient scatter. Rhodium-plated white gold baton markers.",
  },
  {
    id: "chronos",
    code: "03",
    name: "CHRONOS",
    subtitle: "Mechanical Chronograph",
    collection: "Atelier Series 03",
    price: "$6,200.00",
    numericPrice: 6200,
    image: "/images/watch_chronos_transparent.png",
    dialColor: "#5B643A",
    dialName: "Sunburst Olive Gold",
    bezel: "18k Brushed Champagne Bezel",
    caseMaterial: "39mm Dual-Finish Steel",
    waterResistance: "100m / 10 ATM",
    calibre: "Calibre 104-S Chronometer",
    powerReserve: "72 Hours",
    thickness: "9.1 mm",
    description:
      "A sunray dial brushed radially with olive and champagne gold undertones that shift across warm daylight, framed by hand-beveled diamond indices.",
  },
  {
    id: "eclipse",
    code: "04",
    name: "ÉCLIPSE",
    subtitle: "Automatic Tourbillon",
    collection: "Atelier Series 04",
    price: "$7,100.00",
    numericPrice: 7100,
    image: "/images/watch_eclipse_transparent.png",
    dialColor: "#2A2928",
    dialName: "Phantom Stealth Ceramic",
    bezel: "Matte Black Ceramic",
    caseMaterial: "39mm Monobloc Ceramic",
    waterResistance: "100m / 10 ATM",
    calibre: "Calibre 104-X Phantom Tourbillon",
    powerReserve: "75 Hours",
    thickness: "9.0 mm",
    description:
      "Engineered from high-density sintered zirconium oxide ceramic. Smoked dark sapphire dial with micro-sandblasted anthracite indices and black hands.",
  },
];

interface HeroShowcaseProps {
  onAddToCart: (watch: WatchVariant) => void;
}

export default function HeroShowcase({ onAddToCart }: HeroShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedHeading, setDisplayedHeading] = useState(WATCH_VARIANTS[0].name);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const imageTrackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isTransitioningRef = useRef(false);

  const currentWatch = WATCH_VARIANTS[currentIndex];

  const triggerTransition = (targetIndex: number) => {
    if (targetIndex === currentIndex || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    const dir = targetIndex > currentIndex ? 1 : -1;
    const targetWatch = WATCH_VARIANTS[targetIndex];

    const { gsap } = initGsap();
    const imageTrack = imageTrackRef.current;
    const headingEl = headingRef.current;

    // Support prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!imageTrack || !headingEl || prefersReducedMotion) {
      setCurrentIndex(targetIndex);
      setDisplayedHeading(targetWatch.name);
      if (imageTrack) gsap.set(imageTrack, { xPercent: -targetIndex * 25 });
      isTransitioningRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        isTransitioningRef.current = false;
      },
    });

    // 1. WATCH IMAGE ANIMATION: Directional horizontal slide across the 400% track
    tl.to(
      imageTrack,
      {
        xPercent: -targetIndex * 25,
        duration: 0.78,
        ease: "power3.inOut",
        force3D: true,
      },
      0
    );

    // 2. WATCH HEADING ANIMATION: Subtle synchronized directional slide (28px travel)
    // Current heading exits in transition direction
    tl.to(
      headingEl,
      {
        x: -dir * 28,
        opacity: 0,
        duration: 0.32,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(targetIndex);
          setDisplayedHeading(targetWatch.name);
          gsap.set(headingEl, { x: dir * 28, opacity: 0 });
        },
      },
      0
    );

    // Incoming heading enters smoothly from opposite side to 0
    tl.to(
      headingEl,
      {
        x: 0,
        opacity: 1,
        duration: 0.44,
        ease: "power2.out",
      },
      0.34
    );
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % WATCH_VARIANTS.length;
    triggerTransition(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + WATCH_VARIANTS.length) % WATCH_VARIANTS.length;
    triggerTransition(prevIdx);
  };

  const handleAddToCart = (watch: WatchVariant) => {
    onAddToCart(watch);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  return (
    <section
      id="collection"
      className="collection-section relative min-h-screen w-full bg-[#F8F6F1] text-[#1C1B1A] flex flex-col justify-between pt-20 pb-8 overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* STATIC LIGHT BACKGROUND: Warm Ivory with soft natural lighting            */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Natural ambient warm light pool */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E6] to-[#EFEAE1] rounded-full blur-[140px] opacity-75" />

        {/* Subtle washi paper tactile overlay */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none">
          <Image
            src="/images/paper_texture.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Minimal architectural hairline grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1b1a05_1px,transparent_1px),linear-gradient(to_bottom,#1c1b1a05_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        {/* Faint Architectural Watermark (Fixed) */}
        <div className="absolute inset-0 flex items-center justify-center select-none opacity-[0.035]">
          <span className="font-serif text-[22vw] font-black tracking-widest text-[#1C1B1A] uppercase">
            AURELIA
          </span>
        </div>
      </div>

      {/* STATIC TOP TICKER BAR: Fixed */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#6E6A63] font-mono border-b border-[#E5E0D8] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          <span>ÉDITION IVOIRE • HAUTE HORLOGERIE</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>LAT 46.2044° N • LON 6.1432° E</span>
          <span className="text-[#C5BFB5]">|</span>
          <span>SWISS CHRONOMETER ATELIER</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO STAGE: STATIC ART-DIRECTED FRAME                                     */}
      {/* ONLY WATCH IMAGE + WATCH HEADING ANIMATE. ALL ELSE STAYS 100% STATIC.     */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-auto py-2">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
          {/* ===================================================================== */}
          {/* LEFT: SLIDING WATCH IMAGE (TRUE TRANSPARENT PNG WITH NATURAL SHADOW)  */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Soft, natural photographic ground shadows (Static, not baked in image) */}
            <div className="absolute -bottom-6 w-56 sm:w-72 h-8 bg-[#1C1B1A]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-2 w-36 sm:w-48 h-4 bg-[#1C1B1A]/15 rounded-full blur-sm pointer-events-none" />

            {/* Viewport for watch photographs */}
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px] xl:max-w-[460px] h-[380px] sm:h-[460px] lg:h-[500px] overflow-hidden">
              <div
                ref={imageTrackRef}
                className="flex w-[400%] h-full will-change-transform transform-gpu"
                style={{
                  transform: `translate3d(0%, 0, 0)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {WATCH_VARIANTS.map((watch, idx) => (
                  <div
                    key={watch.id}
                    className="w-1/4 h-full shrink-0 flex items-center justify-center relative"
                  >
                    {/* Isolated transparent watch with realistic natural drop shadow */}
                    <div className="relative w-[230px] sm:w-[300px] lg:w-[360px] xl:w-[380px] aspect-[3/4] drop-shadow-[0_20px_28px_rgba(28,27,26,0.18)]">
                      <Image
                        src={watch.image}
                        alt={watch.name}
                        fill
                        sizes="(max-width: 768px) 280px, (max-width: 1200px) 360px, 420px"
                        priority={idx === 0}
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* RIGHT: PRODUCT DETAILS (STATIC LAYOUT • ONLY HEADING ANIMATES)        */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left max-w-xl mx-auto lg:mx-0 w-full">
            {/* Static Ticker / Series Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#9E8056] font-mono font-semibold">
                {currentWatch.code} • {currentWatch.collection}
              </span>
              <span className="text-[#C5BFB5]">•</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#76726B] font-mono">
                {currentWatch.calibre}
              </span>
            </div>

            {/* WATCH NAME / HEADING: SYNCHRONIZED DIRECTIONAL HORIZONTAL TRANSITION */}
            <div className="relative h-[68px] sm:h-[84px] lg:h-[92px] overflow-hidden flex items-center justify-center lg:justify-start mt-1">
              <h1
                ref={headingRef}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#1C1B1A] font-medium tracking-[-0.02em] leading-none select-none will-change-transform"
              >
                {displayedHeading}
              </h1>
            </div>

            {/* Static Subtitle (Updates smoothly in place) */}
            <p className="font-serif italic text-base sm:text-xl text-[#57544E] mt-1 font-light">
              {currentWatch.subtitle}
            </p>

            {/* Static Price & Guarantee Badge */}
            <div className="mt-3.5 flex items-center justify-center lg:justify-start gap-4">
              <span className="text-3xl sm:text-4xl font-mono font-medium text-[#1C1B1A] tracking-tight">
                {currentWatch.price}
              </span>
              <span className="text-[10px] tracking-widest uppercase px-3 py-1 bg-[#EDE8DF] border border-[#E0DACF] text-[#57544E] rounded-full font-mono">
                In Stock • Atelier Allocation
              </span>
            </div>

            {/* Static Description Paragraph */}
            <p className="mt-4 text-xs sm:text-sm text-[#66635C] font-light leading-relaxed max-w-lg mx-auto lg:mx-0 min-h-[44px]">
              {currentWatch.description}
            </p>

            {/* STATIC ACTION CONTROLS: 100% FIXED IN POSITION */}
            <div className="static-actions-row mt-6 pt-4 border-t border-[#E5E0D8]">
              {/* Row 1: Dial Swatch Pill + Specifications Button */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#EDE8DF] border border-[#E0DACF] text-xs font-medium text-[#1C1B1A] shadow-xs">
                  <span
                    className="w-3 h-3 rounded-full border border-black/15 transition-colors duration-500"
                    style={{ backgroundColor: currentWatch.dialColor }}
                  />
                  <span className="transition-all duration-300 font-sans">
                    {currentWatch.dialName}
                  </span>
                </div>

                <button
                  onClick={() => setSpecsOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE8DF] border border-[#E0DACF] hover:border-[#C5A880] text-xs font-medium text-[#1C1B1A] hover:text-[#9E8056] transition-all group cursor-pointer shadow-xs"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#9E8056] group-hover:rotate-45 transition-transform" />
                  <span>Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#76726B] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Row 2: Reserve Timepiece CTA + Technical Dossier Button */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => handleAddToCart(currentWatch)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1C1B1A] hover:bg-[#33312E] text-[#FAF8F5] font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-md hover:shadow-lg active:scale-95 group cursor-pointer"
                >
                  <span>Reserve Timepiece</span>
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>

                <button
                  onClick={() => setSpecsOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/70 hover:bg-white border border-[#D5CFBF] text-[#57544E] hover:text-[#1C1B1A] text-xs tracking-widest uppercase transition-colors cursor-pointer shadow-xs"
                >
                  <span>Technical Dossier</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STATIC PREV / NEXT CHEVRONS: Fixed to viewport edges */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 hover:bg-white text-[#57544E] hover:text-[#1C1B1A] border border-[#E0DACF] shadow-sm backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
          aria-label="Previous timepiece"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 hover:bg-white text-[#57544E] hover:text-[#1C1B1A] border border-[#E0DACF] shadow-sm backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
          aria-label="Next timepiece"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* STATIC BOTTOM WATCH SELECTOR: Fixed, Ivory Pill with Active Indicator      */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-6 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-1.5 rounded-2xl bg-[#EDE8DF]/90 backdrop-blur-md border border-[#E0DACF] shadow-sm">
          {WATCH_VARIANTS.map((watch, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={watch.id}
                onClick={() => triggerTransition(idx)}
                className={`relative px-4 py-3 rounded-xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-white text-[#1C1B1A] shadow-sm border border-[#D5CFBF] scale-[1.02]"
                    : "hover:bg-white/50 text-[#76726B] hover:text-[#1C1B1A] border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] tracking-widest ${
                      isActive ? "text-[#9E8056] font-semibold" : "text-[#8E8A81]"
                    }`}
                  >
                    {watch.code}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/15"
                    style={{ backgroundColor: watch.dialColor }}
                  />
                </div>
                <div className="mt-1.5 font-serif font-medium text-xs sm:text-sm tracking-wider uppercase truncate">
                  {watch.name}
                </div>

                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#C5A880] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Added to Cart Feedback Toast */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#1C1B1A] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-5 h-5 rounded-full bg-[#C5A880] text-[#1C1B1A] flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs">
            <p className="font-semibold">{currentWatch.name} Reserved</p>
            <p className="text-zinc-400 text-[10px]">Allocation secured in dossier</p>
          </div>
        </div>
      )}

      {/* Characteristics Specifications Drawer Modal (Refined Light Theme) */}
      {specsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-[#FBF9F5] text-[#1C1B1A] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 border border-[#E0DACF]">
            <button
              onClick={() => setSpecsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-[#76726B] hover:text-[#1C1B1A] transition-colors cursor-pointer"
              aria-label="Close specifications modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#9E8056] text-[10px] tracking-[0.3em] uppercase font-mono font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Manufacture Specifications</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] mt-1 font-medium">
              {currentWatch.name} — Technical Dossier
            </h3>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#E0DACF]">
                <p className="text-[#76726B] uppercase text-[9px] tracking-wider font-mono">
                  Calibre & Movement
                </p>
                <p className="font-semibold text-[#1C1B1A] mt-1">{currentWatch.calibre}</p>
                <p className="text-[#66635C] text-[11px] mt-0.5">28,800 vibrations/hour (4 Hz)</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E0DACF]">
                <p className="text-[#76726B] uppercase text-[9px] tracking-wider font-mono">
                  Power Reserve
                </p>
                <p className="font-semibold text-[#1C1B1A] mt-1">{currentWatch.powerReserve}</p>
                <p className="text-[#66635C] text-[11px] mt-0.5">Dual-barrel bi-directional winding</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E0DACF]">
                <p className="text-[#76726B] uppercase text-[9px] tracking-wider font-mono">
                  Case Architecture
                </p>
                <p className="font-semibold text-[#1C1B1A] mt-1">{currentWatch.caseMaterial}</p>
                <p className="text-[#66635C] text-[11px] mt-0.5">Profile thickness: {currentWatch.thickness}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E0DACF]">
                <p className="text-[#76726B] uppercase text-[9px] tracking-wider font-mono">
                  Dial & Crystal
                </p>
                <p className="font-semibold text-[#1C1B1A] mt-1">{currentWatch.dialName}</p>
                <p className="text-[#66635C] text-[11px] mt-0.5">Double-domed anti-reflective sapphire</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E0DACF]">
                <p className="text-[#76726B] uppercase text-[9px] tracking-wider font-mono">
                  Water Resistance
                </p>
                <p className="font-semibold text-[#1C1B1A] mt-1">{currentWatch.waterResistance}</p>
                <p className="text-[#66635C] text-[11px] mt-0.5">Screw-down crown with quad-seal</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E0DACF]">
                <p className="text-[#76726B] uppercase text-[9px] tracking-wider font-mono">
                  Origin Certification
                </p>
                <p className="font-semibold text-[#1C1B1A] mt-1">Swiss Made • Geneva Seal</p>
                <p className="text-[#66635C] text-[11px] mt-0.5">Individually numbered atelier piece</p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#76726B] font-mono uppercase">Retail Allocation</span>
                <p className="text-xl font-mono font-medium text-[#1C1B1A]">{currentWatch.price}</p>
              </div>
              <button
                onClick={() => {
                  handleAddToCart(currentWatch);
                  setSpecsOpen(false);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1C1B1A] hover:bg-[#33312E] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-md"
              >
                <span>Reserve This Piece</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
