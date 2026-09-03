"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { initGsap } from "@/lib/animations";
import { Award, Compass, Eye, Shield } from "lucide-react";

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const atelierImgRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      // Smooth scale on the atelier craftsman photo
      gsap.fromTo(
        atelierImgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Card elevation
      gsap.fromTo(
        contentCardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentCardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="calibre"
      ref={containerRef}
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 bg-[#EFECE4] text-[#1C1B1A] overflow-hidden"
    >
      {/* Background Architectural Watermark */}
      <div className="absolute top-1/3 right-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.035] text-right">
        <span className="font-serif text-[22vw] leading-none font-bold text-[#1C1B1A]">
          CALIBRE
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#9E8056] font-mono font-semibold">
            Act V • The Human Instrument
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1C1B1A] mt-2 font-normal tracking-tight">
            Assembled by Hand. <br />
            <span className="italic font-light text-[#76726B]">
              Preserved for Generations.
            </span>
          </h2>
        </div>

        {/* Dynamic Composition: Atelier Visual with Layered Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Layered Atelier Visual */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#D8D2C5] bg-[#E5E0D8]">
              <div ref={atelierImgRef} className="relative w-full h-full">
                <Image
                  src="/images/editorial_atelier.jpg"
                  alt="Master Horologist assembling Aurelia Watch in Swiss Atelier"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>

              {/* Subtle Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              {/* Visual Annotation Overlay */}
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#E6C88B] font-mono">
                    Bench 07 • Master Watchmaker
                  </span>
                  <p className="font-serif text-xl sm:text-2xl mt-1">
                    Jean-Luc Perret, Horloger Émérite
                  </p>
                </div>
                <div className="text-left sm:text-right font-mono text-[10px] text-zinc-300 tracking-widest uppercase">
                  <span>34 YEARS DEDICATED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Narrative Card */}
          <div
            ref={contentCardRef}
            className="lg:col-span-4 bg-white/80 backdrop-blur-xl border border-[#D5CFBF] rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center text-[#9E8056] mb-6">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-[#1C1B1A] font-medium">
                The Poinçon de Genève
              </h3>
              <p className="mt-4 text-sm text-[#57544E] font-light leading-relaxed">
                Only timepieces manufactured strictly within the canton of
                Geneva with flawless hand decoration qualify. Each Aurelia
                watch carries this stamp etched directly onto the mainplate.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E0D8] space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#57544E]">
                <Eye className="w-4 h-4 text-[#9E8056]" />
                <span>Microscope inspected under 50x magnification</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#57544E]">
                <Compass className="w-4 h-4 text-[#9E8056]" />
                <span>5-position chronometer balance tuning</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#57544E]">
                <Shield className="w-4 h-4 text-[#9E8056]" />
                <span>10-year comprehensive atelier guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
