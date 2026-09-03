"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { initGsap } from "@/lib/animations";

export default function ScrollReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const watchLayerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const geometricBarRef = useRef<HTMLDivElement>(null);
  const cardPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGsap();

    const ctx = gsap.context(() => {
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 0% -> 25%: Minimal composition bars animate and diagonal sheared mask begins opening
      pinTimeline
        .to(
          geometricBarRef.current,
          {
            scaleX: 1.4,
            opacity: 0.4,
            ease: "none",
          },
          0
        )
        // Diagonal clip-path expansion mimicking 00:01 - 00:02 of reference video
        .fromTo(
          maskRef.current,
          {
            clipPath: "polygon(35% 0%, 65% 0%, 30% 100%, 0% 100%)",
            opacity: 0.1,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            ease: "power2.inOut",
          },
          0.1
        )
        // 30% -> 60%: Main visual enters and scales up through the aperture
        .fromTo(
          watchLayerRef.current,
          {
            scale: 0.72,
            y: 80,
            opacity: 0,
            rotate: -4,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            rotate: 0,
            ease: "power2.out",
          },
          0.25
        )
        // Floating editorial statement reveals
        .fromTo(
          textLayerRef.current,
          {
            opacity: 0,
            y: 50,
            letterSpacing: "0.5em",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.25em",
            ease: "power1.out",
          },
          0.4
        )
        // 60% -> 85%: Visual expands and transitions smoothly into the card showcase stage
        .to(
          cardPreviewRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
          },
          0.6
        )
        // Fade out geometric bars at end
        .to(
          geometricBarRef.current,
          {
            opacity: 0,
            ease: "power1.out",
          },
          0.7
        );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="reveal-section" ref={triggerRef} className="relative h-screen w-full overflow-hidden bg-[#08090A]">
      <div ref={sectionRef} className="relative w-full h-full flex items-center justify-center">
        {/* Background Minimalist Ambient Grid */}
        <div className="absolute inset-0 bg-[#08090A] flex items-center justify-center overflow-hidden">
          {/* Reference Video 00:00 Initial Minimalist Geometric Bars */}
          <div
            ref={geometricBarRef}
            className="absolute z-10 w-[85%] max-w-4xl h-16 sm:h-20 flex items-center shadow-2xl transition-all"
          >
            <div className="h-full w-1/4 bg-[#18191C] border-r border-white/5" />
            <div className="h-full w-1/4 bg-[#27282D] border-r border-white/5 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#3F4046]" />
            </div>
            <div className="h-full w-1/4 bg-[#4A4B52] border-r border-white/5" />
            <div className="h-full w-1/4 bg-[#8E9099]" />
          </div>

          <p className="absolute bottom-12 text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-mono">
            [ SCROLL PROGRESSION • ARCHITECTURAL APERTURE ]
          </p>
        </div>

        {/* Dynamic Sheared Mask Layer (Reference Video 00:01 - 00:02) */}
        <div
          ref={maskRef}
          className="absolute inset-0 z-20 w-full h-full bg-[#ECEEF0] flex items-center justify-center p-6 sm:p-12 overflow-hidden shadow-2xl"
          style={{
            clipPath: "polygon(35% 0%, 65% 0%, 30% 100%, 0% 100%)",
          }}
        >
          {/* Subtle Studio Card Stage inside the mask */}
          <div
            ref={cardPreviewRef}
            className="relative w-full max-w-5xl h-[85vh] max-h-[640px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-zinc-200/80 flex flex-col justify-between p-6 sm:p-10 overflow-hidden"
          >
            {/* Background Watermark Typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06]">
              <span className="font-serif text-[18vw] font-black tracking-tighter text-zinc-950">
                AURELIA
              </span>
            </div>

            {/* Top Bar of Stage */}
            <div className="relative z-10 flex items-center justify-between border-b border-zinc-100 pb-4 text-zinc-800 text-[11px] tracking-[0.2em] font-medium uppercase">
              <div className="flex items-center gap-3">
                <span className="w-4 h-[1px] bg-zinc-800" />
                <span>ATELIER GENÈVE</span>
              </div>
              <div className="font-serif tracking-widest text-zinc-900 font-semibold">
                CALIBRE VIII
              </div>
              <div className="text-zinc-500 font-mono text-[10px]">
                N° 001/100
              </div>
            </div>

            {/* Center Visual & Title within aperture */}
            <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-8 my-auto">
              <div ref={watchLayerRef} className="relative w-[200px] sm:w-[260px] aspect-[3/4]">
                <Image
                  src="/images/watch_nocturne.jpg"
                  alt="Aurelia Watch Reveal"
                  fill
                  sizes="260px"
                  className="object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.25)]"
                />
              </div>

              <div ref={textLayerRef} className="text-center md:text-left max-w-md">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a880] font-mono font-semibold">
                  Aperture Phase 02
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-zinc-900 mt-2 font-medium">
                  The Monolith
                </h3>
                <p className="mt-3 text-sm text-zinc-600 font-light leading-relaxed">
                  Forged from aeronautical-grade 904L titanium and regulated to
                  an accuracy of ±1.2 seconds per day.
                </p>
                <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                  <span className="text-xl font-mono font-medium text-zinc-900">
                    $4,200.00
                  </span>
                  <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-full font-mono">
                    In Stock • Bespoke
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 flex items-center justify-between border-t border-zinc-100 pt-4 text-[10px] tracking-[0.25em] text-zinc-500 uppercase font-mono">
              <span>SWIPE DOWN TO INTERACT</span>
              <span>SCROLL TO ENTER SHOWCASE ▾</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
