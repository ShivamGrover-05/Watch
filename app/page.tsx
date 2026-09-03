"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroShowcase, { WatchVariant } from "@/components/HeroShowcase";
import EditorialSection from "@/components/EditorialSection";
import StorySection from "@/components/StorySection";
import FinalCTA from "@/components/FinalCTA";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  const [cartItems, setCartItems] = useState<{ watch: WatchVariant; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (watch: WatchVariant) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.watch.id === watch.id);
      if (existing) {
        return prev.map((item) =>
          item.watch.id === watch.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { watch, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.watch.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#F8F6F1] text-[#1C1B1A] selection:bg-[#C5A880] selection:text-[#1C1B1A] overflow-x-hidden">
        {/* Navigation Bar */}
        <Navbar
          cartCount={totalQuantity}
          onOpenCart={() => setCartOpen(true)}
        />

        {/* HERO SECTION: Full-Screen Width, Cardless, Horizontal Watch Slide */}
        <HeroShowcase onAddToCart={handleAddToCart} />

        {/* EDITORIAL SECTION: Craftsmanship & Horology Philosophy */}
        <EditorialSection />

        {/* STORY SECTION: Master Horologist Workbench & Movement */}
        <StorySection />

        {/* FINAL CTA: Paper Texture Outro & Inquire */}
        <FinalCTA />

        {/* Interactive Acquisition Drawer */}
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
        />
      </main>
    </SmoothScroll>
  );
}
