"use client";

import { useState, useRef, useEffect } from "react";
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
    image: "/images/watch_glacier.jpg",
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
    image: "/images/watch_nocturne.jpg",
    dialColor: "#171719",
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
    image: "/images/watch_solstice.jpg",
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
    image: "/images/watch_eclipse.jpg",
    dialColor: "#222326",
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

interface VisualShowcaseProps {
  onAddToCart: (watch: WatchVariant) => void;
}

export default function VisualShowcase({ onAddToCart }: VisualShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const isTransitioningRef = useRef(false);
  const currentSlideRef = useRef<HTMLDivElement>(null);
  const incomingSlideRef = useRef<HTMLDivElement>(null);

  const currentWatch = WATCH_VARIANTS[currentIndex];
  const incomingWatch = incomingIndex !== null ? WATCH_VARIANTS[incomingIndex] : null;

  const triggerTransition = (targetIndex: number) => {
    if (targetIndex === currentIndex || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    const dir = targetIndex > currentIndex ? 1 : -1;
    setDirection(dir);
    setIncomingIndex(targetIndex);
  };

  useEffect(() => {
    if (incomingIndex === null) return;

    const { gsap } = initGsap();
    const currentEl = currentSlideRef.current;
    const incomingEl = incomingSlideRef.current;

    if (!currentEl || !incomingEl) {
      isTransitioningRef.current = false;
      return;
    }

    // Position the incoming content outside the viewport
    // Forward (dir = 1): incoming starts at +100%
    // Backward (dir = -1): incoming starts at -100%
    gsap.set(incomingEl, {
      xPercent: direction * 100,
      opacity: 1,
    });

    const currentImage = currentEl.querySelector(".watch-image");
    const incomingImage = incomingEl.querySelector(".watch-image");

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setCurrentIndex(incomingIndex);
        setIncomingIndex(null);
        gsap.set(currentEl, { xPercent: 0 });
        isTransitioningRef.current = false;
      },
    });

    // Animate outgoing content away and incoming into position simultaneously
    tl.to(
      currentEl,
      {
        xPercent: -direction * 100,
        duration: 0.8,
      },
      0
    )
    .to(
      incomingEl,
      {
        xPercent: 0,
        duration: 0.8,
      },
      0
    );

    // Premium subtle image scale interpolation (1 -> 0.97 out, 1.03 -> 1 in)
    if (currentImage) {
      tl.to(
        currentImage,
        {
          scale: 0.97,
          duration: 0.8,
        },
        0
      );
    }

    if (incomingImage) {
      tl.fromTo(
        incomingImage,
        { scale: 1.03 },
        { scale: 1, duration: 0.8 },
        0
      );
    }
  }, [incomingIndex, direction]);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % WATCH_VARIANTS.length;
    triggerTransition(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + WATCH_VARIANTS.length) % WATCH_VARIANTS.length;
    triggerTransition(prevIdx);
  };

  const handleAddToCart = () => {
    onAddToCart(currentWatch);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  // Render ONLY the moving watch content (Watch Image on Left + Watch Information on Right)
  const renderWatchSlide = (watch: WatchVariant) => (
    <div className="watch-slide w-full h-full flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 px-4 sm:px-8">
      {/* LEFT: Watch Image */}
      <div className="watch-image flex-1 flex items-center justify-center relative w-full max-w-[320px] sm:max-w-[380px]">
        {/* Soft shadow ground disc */}
        <div className="absolute -bottom-4 w-44 sm:w-56 h-6 bg-black/15 rounded-full blur-xl pointer-events-none" />

        <div className="relative w-[210px] sm:w-[270px] lg:w-[310px] aspect-[3/4]">
          <Image
            src={watch.image}
            alt={watch.name}
            fill
            sizes="(max-width: 768px) 240px, 320px"
            priority
            className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>

      {/* RIGHT: Watch Information & Text */}
      <div className="watch-info flex-1 flex flex-col justify-center text-center lg:text-left w-full max-w-lg lg:pl-6">
        <div>
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-mono font-medium">
            {watch.code} • {watch.collection}
          </span>
        </div>

        <div className="mt-1">
          <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-zinc-950 font-normal tracking-tight">
            {watch.name}
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-zinc-600 mt-0.5">
            {watch.subtitle}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-center lg:justify-start gap-4">
          <span className="text-2xl sm:text-3xl font-mono font-medium text-zinc-900 tracking-tight">
            {watch.price}
          </span>
          <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded bg-zinc-100 text-zinc-600 font-mono">
            In Stock • Insured Delivery
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
            {watch.description}
          </p>
        </div>

        {/* Quick Dial Color Pill & Characteristics Button */}
        <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-300 bg-white text-xs font-medium text-zinc-800 shadow-sm">
            <span
              className="w-3 h-3 rounded-full border border-black/20"
              style={{ backgroundColor: watch.dialColor }}
            />
            <span>{watch.dialName}</span>
          </div>

          <button
            onClick={() => setSpecsOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400 text-xs font-medium text-zinc-800 transition-all shadow-sm group cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-zinc-600 group-hover:rotate-45 transition-transform" />
            <span>Specifications</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="showcase"
      className="watch-showcase relative min-h-screen py-24 sm:py-32 px-4 sm:px-8 bg-[#ECEEF0] text-zinc-900 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* STATIC BACKGROUND: Completely Fixed, Does NOT Move */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E2E5E8] via-[#ECEEF0] to-[#E5E7EA] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white/40 rounded-full blur-3xl pointer-events-none" />

      {/* STATIC SECTION HEADER: Completely Fixed, Does NOT Move */}
      <div className="relative z-10 text-center max-w-2xl mb-8 sm:mb-10">
        <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-mono font-semibold">
          Horizontal Watch Viewport • Atelier Showcase
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-zinc-900 mt-2 tracking-tight font-medium">
          The Atelier Collection
        </h2>
        <p className="mt-3 text-sm text-zinc-600 font-light leading-relaxed">
          Four distinct expressions of architectural Swiss horology. Select a
          timepiece to switch models.
        </p>
      </div>

      {/* STATIC WATCH SELECTOR: Position completely fixed, only active state changes */}
      <div className="relative z-20 mb-8 w-full max-w-3xl flex items-center justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-zinc-200/80 shadow-md w-full">
          {WATCH_VARIANTS.map((watch, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={watch.id}
                onClick={() => triggerTransition(idx)}
                className={`relative px-4 py-2.5 rounded-xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-zinc-950 text-white shadow-md scale-[1.02]"
                    : "hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] tracking-widest ${
                      isActive ? "text-[#c5a880]" : "text-zinc-400"
                    }`}
                  >
                    {watch.code}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: watch.dialColor }}
                  />
                </div>
                <div className="mt-1 font-serif font-medium text-xs sm:text-sm tracking-wider uppercase truncate">
                  {watch.name}
                </div>

                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#c5a880] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* STATIC PRODUCT FRAME / CARD: Outer Layout Remains 100% Fixed */}
      <div className="watch-layout relative z-10 w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.18)] border border-white/60 p-6 sm:p-10 flex flex-col justify-between">
        {/* STATIC WATERMARK: Behind content, fixed */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[18vw] sm:text-[13vw] font-black tracking-widest text-zinc-900/[0.03] uppercase">
            AURELIA
          </span>
        </div>

        {/* STATIC CARD HEADER: Fixed */}
        <div className="relative z-20 flex items-center justify-between border-b border-zinc-100 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSpecsOpen(true)}
              className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-zinc-700 hover:text-black font-semibold transition-colors cursor-pointer"
            >
              <span className="text-base leading-none">≡</span>
              <span>AURELIA GENÈVE</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#c5a880] shadow-sm" />
            <span className="font-serif text-xs sm:text-sm tracking-[0.2em] font-medium text-zinc-800">
              atelier.
            </span>
          </div>

          <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-mono text-zinc-400">
            CALIBRE 104 • EDITION 2026
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE DEDICATED WATCH-CONTENT-VIEWPORT                                      */}
        {/* ONLY THE CONTENT INSIDE THIS VIEWPORT SLIDES HORIZONTALLY                 */}
        {/* ========================================================================= */}
        <div className="watch-content-viewport relative w-full h-[480px] sm:h-[460px] lg:h-[420px] overflow-hidden my-4 sm:my-6">
          {/* Current Active Slide (Watch Image + Watch Information) */}
          <div
            ref={currentSlideRef}
            className="w-full h-full absolute inset-0 will-change-transform"
          >
            {renderWatchSlide(currentWatch)}
          </div>

          {/* Incoming Slide during transition */}
          {incomingWatch && (
            <div
              ref={incomingSlideRef}
              className="w-full h-full absolute inset-0 will-change-transform"
            >
              {renderWatchSlide(incomingWatch)}
            </div>
          )}
        </div>

        {/* STATIC CARD FOOTER: Completely Fixed */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-5 text-xs">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 text-zinc-600 hover:text-black font-medium transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="tracking-[0.1em] uppercase text-[11px]">Previous Model</span>
          </button>

          <button
            onClick={() => setSpecsOpen(true)}
            className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-mono text-zinc-500 hover:text-zinc-900 transition-colors py-1 px-3 rounded-full hover:bg-zinc-100 cursor-pointer"
          >
            <span>Calibre Dossier</span>
            <span className="text-base leading-none">• • •</span>
          </button>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-zinc-950 hover:bg-[#c5a880] text-white hover:text-zinc-950 font-medium transition-all shadow-lg hover:shadow-xl active:scale-95 group cursor-pointer"
          >
            <span className="text-[11px] tracking-[0.18em] uppercase font-semibold">
              Reserve Piece
            </span>
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* STATIC PREVIOUS / NEXT FLOATING BUTTONS: Fixed to card frame */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-black shadow-md border border-zinc-200 transition-all hover:scale-105 cursor-pointer"
          aria-label="Previous watch model"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-black shadow-md border border-zinc-200 transition-all hover:scale-105 cursor-pointer"
          aria-label="Next watch model"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Added to Cart Feedback Toast */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-zinc-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-5 h-5 rounded-full bg-[#c5a880] text-black flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs">
            <p className="font-semibold">{currentWatch.name} Reserved</p>
            <p className="text-zinc-400 text-[10px]">Allocation secured in dossier</p>
          </div>
        </div>
      )}

      {/* Characteristics Specifications Drawer Modal */}
      {specsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 border border-zinc-200">
            <button
              onClick={() => setSpecsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close specifications modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#c5a880] text-[10px] tracking-[0.3em] uppercase font-mono font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Manufacture Specifications</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 mt-1 font-medium">
              {currentWatch.name} — Technical Dossier
            </h3>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="text-zinc-400 uppercase text-[9px] tracking-wider font-mono">
                  Calibre & Movement
                </p>
                <p className="font-semibold text-zinc-900 mt-1">{currentWatch.calibre}</p>
                <p className="text-zinc-500 text-[11px] mt-0.5">28,800 vibrations/hour (4 Hz)</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="text-zinc-400 uppercase text-[9px] tracking-wider font-mono">
                  Power Reserve
                </p>
                <p className="font-semibold text-zinc-900 mt-1">{currentWatch.powerReserve}</p>
                <p className="text-zinc-500 text-[11px] mt-0.5">Dual-barrel bi-directional winding</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="text-zinc-400 uppercase text-[9px] tracking-wider font-mono">
                  Case Architecture
                </p>
                <p className="font-semibold text-zinc-900 mt-1">{currentWatch.caseMaterial}</p>
                <p className="text-zinc-500 text-[11px] mt-0.5">Profile thickness: {currentWatch.thickness}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="text-zinc-400 uppercase text-[9px] tracking-wider font-mono">
                  Dial & Crystal
                </p>
                <p className="font-semibold text-zinc-900 mt-1">{currentWatch.dialName}</p>
                <p className="text-zinc-500 text-[11px] mt-0.5">Double-domed anti-reflective sapphire</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="text-zinc-400 uppercase text-[9px] tracking-wider font-mono">
                  Water Resistance
                </p>
                <p className="font-semibold text-zinc-900 mt-1">{currentWatch.waterResistance}</p>
                <p className="text-zinc-500 text-[11px] mt-0.5">Screw-down crown with quad-seal</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="text-zinc-400 uppercase text-[9px] tracking-wider font-mono">
                  Origin Certification
                </p>
                <p className="font-semibold text-zinc-900 mt-1">Swiss Made • Geneva Seal</p>
                <p className="text-zinc-500 text-[11px] mt-0.5">Individually numbered atelier piece</p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 font-mono uppercase">Retail Allocation</span>
                <p className="text-xl font-mono font-medium text-zinc-950">{currentWatch.price}</p>
              </div>
              <button
                onClick={() => {
                  handleAddToCart();
                  setSpecsOpen(false);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-[#c5a880] text-white hover:text-black text-xs font-medium transition-colors cursor-pointer"
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
