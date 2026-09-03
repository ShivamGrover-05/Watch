"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { initGsap } from "@/lib/animations";

export default function EditorialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      // Parallax on macro image
      gsap.fromTo(
        imageRef.current,
        { y: -30, scale: 1.04 },
        {
          y: 30,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Quote reveal
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counters fade in
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craftsmanship"
      ref={containerRef}
      className="relative min-h-screen py-28 sm:py-36 px-6 sm:px-12 bg-[#F4F1EA] text-[#1C1B1A] overflow-hidden"
    >
      {/* Editorial Watermark & Architectural Coordinates */}
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] tracking-[0.35em] uppercase text-[#76726B] font-mono border-b border-[#E0DACF] pb-6 mb-16 sm:mb-24">
        <span>ESSAY 04 • THE CHRONOMETRIC DISCIPLINE</span>
        <span className="hidden sm:inline">VALLÉE DE JOUX, SWITZERLAND</span>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Large Statement Typography */}
        <div ref={quoteRef} className="max-w-4xl">
          <p className="text-[#9E8056] text-xs sm:text-sm tracking-[0.35em] uppercase font-mono font-medium mb-4">
            The Philosophy of Stillness
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-[#1C1B1A]">
            WE DO NOT MEASURE HOW FAST TIME RUSHES.{" "}
            <span className="italic font-light text-[#76726B]">
              WE HONOR HOW DEEPLY IT RESONATES.
            </span>
          </h2>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large High-Resolution Macro Movement Visual with Parallax */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#E0DACF] shadow-xl bg-[#EBE7DF]">
              <div ref={imageRef} className="relative w-full h-[120%] -top-[10%]">
                <Image
                  src="/images/macro_movement.jpg"
                  alt="Aurelia In-House Calibre 104 Movement"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover filter contrast-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase font-mono text-white">
                <span className="tracking-widest">Macro Plate • 100mm Optical</span>
                <span className="tracking-widest text-[#E6C88B]">28,800 VPH</span>
              </div>
            </div>
          </div>

          {/* Right: Concise Copy & Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] font-medium">
              Côtes de Genève & Hand-Anglage
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[#57544E] font-light leading-relaxed">
              Every bridge is hand-beveled at a 45-degree angle with gentian
              wood pegs and diamond paste. A process requiring sixteen hours of
              uninterrupted handwork per timepiece.
            </p>
            <p className="mt-4 text-sm text-[#57544E] font-light leading-relaxed">
              The balance wheel operates in a micro-lubricated ceramic bearing,
              canceling friction variations caused by magnetic fields and
              temperature fluctuations.
            </p>

            {/* Micro Metrics Column */}
            <div
              ref={statsRef}
              className="mt-10 pt-8 border-t border-[#E0DACF] grid grid-cols-2 gap-6"
            >
              <div className="p-4 rounded-xl bg-white/70 border border-[#E5E0D8]">
                <span className="text-3xl sm:text-4xl font-mono font-light text-[#1C1B1A]">
                  0.002
                </span>
                <span className="text-xs font-mono text-[#9E8056] ml-1">mm</span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#76726B] font-mono mt-1">
                  Machining Tolerance
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-[#E5E0D8]">
                <span className="text-3xl sm:text-4xl font-mono font-light text-[#1C1B1A]">
                  184
                </span>
                <span className="text-xs font-mono text-[#9E8056] ml-1">h</span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#76726B] font-mono mt-1">
                  Individual Regulation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
