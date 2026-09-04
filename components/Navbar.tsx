"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Volume2, VolumeX } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#E5E0D8] py-3.5 shadow-xs text-[#1C1B1A]"
          : "bg-transparent py-5 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex flex-col text-left focus:outline-none cursor-pointer"
            aria-label="Aurelia Atelier Home"
          >
            <span
              className={`font-serif tracking-[0.25em] text-xl sm:text-2xl font-semibold transition-colors ${
                isScrolled
                  ? "text-[#1C1B1A] group-hover:text-[#9E8056]"
                  : "text-white group-hover:text-[#E6C88B]"
              }`}
            >
              AURELIA
            </span>
            <span
              className={`text-[9px] tracking-[0.3em] uppercase font-light -mt-0.5 transition-colors ${
                isScrolled ? "text-[#76726B]" : "text-[#C5A880]"
              }`}
            >
              Genève • Haute Horlogerie
            </span>
          </button>
        </div>

        {/* Center: Editorial Navigation (Desktop) */}
        <nav
          className={`hidden md:flex items-center gap-8 lg:gap-10 text-[11px] tracking-[0.22em] uppercase font-medium transition-colors ${
            isScrolled ? "text-[#57544E]" : "text-zinc-200"
          }`}
        >
          <button
            onClick={() => scrollToSection("collection")}
            className={`transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
              isScrolled ? "hover:text-[#1C1B1A]" : "hover:text-white"
            }`}
          >
            Showcase
          </button>
          <button
            onClick={() => scrollToSection("craftsmanship")}
            className={`transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
              isScrolled ? "hover:text-[#1C1B1A]" : "hover:text-white"
            }`}
          >
            Craftsmanship
          </button>
          <button
            onClick={() => scrollToSection("calibre")}
            className={`transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
              isScrolled ? "hover:text-[#1C1B1A]" : "hover:text-white"
            }`}
          >
            Calibre VIII
          </button>
          <button
            onClick={() => scrollToSection("inquire")}
            className={`transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${
              isScrolled ? "hover:text-[#1C1B1A]" : "hover:text-white"
            }`}
          >
            Private Allocation
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Subtle Ambient Sound Toggle */}
          <button
            onClick={() => setSoundActive(!soundActive)}
            className={`hidden sm:flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase transition-colors p-2 rounded-full border cursor-pointer ${
              isScrolled
                ? "text-[#6E6A63] hover:text-[#1C1B1A] border-[#E0DACF] hover:border-[#C5A880] bg-white/50"
                : "text-zinc-300 hover:text-white border-white/20 hover:border-[#C5A880] bg-white/10 backdrop-blur-xs"
            }`}
            title={soundActive ? "Mute mechanical chime" : "Play mechanical chime"}
            aria-label="Toggle ambient chime"
          >
            {soundActive ? (
              <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden lg:inline text-[9px]">
              {soundActive ? "Ticking Active" : "Silence"}
            </span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={`relative flex items-center gap-2 transition-colors p-2 sm:px-3 sm:py-1.5 rounded-full border shadow-xs cursor-pointer ${
              isScrolled
                ? "text-[#1C1B1A] hover:text-[#9E8056] border-[#E0DACF] hover:border-[#C5A880] bg-white/70"
                : "text-white hover:text-[#E6C88B] border-white/20 hover:border-[#C5A880] bg-white/10 backdrop-blur-xs"
            }`}
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] tracking-[0.18em] uppercase font-light">
              Acquisition
            </span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C5A880] text-[#0B1320] text-[9px] font-bold flex items-center justify-center -ml-0.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors cursor-pointer ${
              isScrolled ? "text-[#1C1B1A] hover:text-[#9E8056]" : "text-white hover:text-[#E6C88B]"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5]/98 border-b border-[#E5E0D8] px-6 py-8 flex flex-col gap-6 text-sm tracking-[0.2em] uppercase shadow-lg text-[#1C1B1A]">
          <button
            onClick={() => scrollToSection("collection")}
            className="text-left hover:text-[#9E8056] cursor-pointer"
          >
            Showcase
          </button>
          <button
            onClick={() => scrollToSection("craftsmanship")}
            className="text-left hover:text-[#9E8056] cursor-pointer"
          >
            Craftsmanship
          </button>
          <button
            onClick={() => scrollToSection("calibre")}
            className="text-left hover:text-[#9E8056] cursor-pointer"
          >
            Calibre VIII
          </button>
          <button
            onClick={() => scrollToSection("inquire")}
            className="text-left text-[#9E8056] font-semibold cursor-pointer"
          >
            Private Allocation
          </button>
        </div>
      )}
    </header>
  );
}
