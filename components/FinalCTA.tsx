"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Send } from "lucide-react";
import { initGsap } from "@/lib/animations";

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperWrapperRef = useRef<HTMLDivElement>(null);
  const brandEmblemRef = useRef<HTMLDivElement>(null);
  const logoWordmarkRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      // Scrubbed Paper Texture Expansion (PHASE 10: Scroll-Driven Paper Transition)
      const paperTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      paperTl.fromTo(
        paperWrapperRef.current,
        {
          clipPath: "inset(12% 10% 12% 10% round 24px)",
          scale: 0.94,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          ease: "power2.inOut",
        }
      );

      // PHASE 11: Logo Reveal (Embossed on Paper)
      const logoTl = gsap.timeline({
        scrollTrigger: {
          trigger: brandEmblemRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      logoTl
        .fromTo(
          brandEmblemRef.current,
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power2.out" }
        )
        .fromTo(
          logoWordmarkRef.current,
          {
            opacity: 0,
            y: 25,
            letterSpacing: "0.15em",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.28em",
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.8"
        )
        .fromTo(
          formRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="inquire"
      ref={containerRef}
      className="relative min-h-screen py-24 sm:py-36 px-4 sm:px-12 flex flex-col justify-between overflow-hidden text-zinc-900 bg-[#F8F6F1]"
    >
      {/* PHASE 10: TACTILE CRUMPLED PAPER TEXTURE WITH EXPANDING CLIP-PATH */}
      <div
        ref={paperWrapperRef}
        className="absolute inset-0 z-0 will-change-transform shadow-2xl"
      >
        <Image
          src="/images/paper_texture.jpg"
          alt="Artisanal Crumpled Paper Texture"
          fill
          priority
          sizes="100vw"
          className="object-cover filter contrast-[1.03] opacity-98"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-black/5 to-black/20 pointer-events-none" />
      </div>

      {/* Top Header on Paper */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-zinc-900/15 pb-6 text-[10px] tracking-[0.3em] uppercase font-mono text-zinc-700">
        <span>PHASE 10–12 • MANUFACTURE OUTRO</span>
        <button
          onClick={scrollToTop}
          className="hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center: Brand Mark & Logo Reveal on Paper (PHASE 11 & 12) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto py-12 sm:py-16">
        <div>
          {/* Circular Atelier Seal */}
          <div
            ref={brandEmblemRef}
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 rounded-full border-2 border-zinc-900 flex items-center justify-center shadow-md bg-white/30 backdrop-blur-sm"
          >
            <span className="font-serif font-bold text-xl sm:text-2xl text-zinc-900">
              A
            </span>
          </div>

          {/* Letterspaced Embossed Logo Wordmark */}
          <h2
            ref={logoWordmarkRef}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl text-zinc-950 font-normal leading-none uppercase"
          >
            AURELIA
          </h2>

          <p
            ref={taglineRef}
            className="font-serif italic text-2xl sm:text-4xl text-zinc-800 mt-3 font-light"
          >
            Mastered for eternity.
          </p>

          <p className="mt-6 text-xs sm:text-sm text-zinc-700 max-w-md mx-auto font-light leading-relaxed">
            Due to our hand-finishing standard, annual production is strictly
            restricted to 250 serialized pieces worldwide.
          </p>
        </div>

        {/* PHASE 12: Private Allocation Inquiry Form */}
        <div ref={formRef} className="mt-10 sm:mt-12 max-w-md mx-auto">
          {submitted ? (
            <div className="p-6 rounded-2xl bg-zinc-950 text-white shadow-xl flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#c5a880] text-black flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <p className="font-semibold text-sm">Dossier Request Received</p>
                <p className="text-zinc-400 mt-0.5">
                  Our private concierge will contact you within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your private email..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white/85 backdrop-blur-sm border border-zinc-400/80 text-zinc-900 text-xs placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-zinc-950 hover:bg-[#c5a880] text-white hover:text-black font-medium text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inquire</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          <p className="mt-3 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
            Discreet consultation • Bespoke engraving available
          </p>
        </div>
      </div>

      {/* Footer Minimalist Navigation */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-zinc-900/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-700 font-mono">
        <div>
          © 2026 AURELIA ATELIER HORLOGER. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-6 tracking-widest uppercase text-[10px]">
          <a href="#hero" className="hover:text-black transition-colors">
            Showcase
          </a>
          <a href="#craftsmanship" className="hover:text-black transition-colors">
            Craft
          </a>
          <a href="#calibre" className="hover:text-black transition-colors">
            Calibre
          </a>
          <span className="text-zinc-400">•</span>
          <span>GENÈVE, SWITZERLAND</span>
        </div>
      </div>
    </section>
  );
}
