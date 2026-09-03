"use client";

import { X, Trash2, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import { WatchVariant } from "./HeroShowcase";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: { watch: WatchVariant; quantity: number }[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.watch.numericPrice * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md bg-[#FBF9F5] text-[#1C1B1A] h-full p-6 sm:p-8 flex flex-col justify-between border-l border-[#E0DACF] shadow-2xl animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E0DACF] pb-5">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E8056] font-mono font-semibold">
                Atelier Acquisition
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#1C1B1A] mt-1">
                Your Selection
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#76726B] hover:text-[#1C1B1A] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {items.length === 0 ? (
              <div className="py-12 text-center text-[#76726B] text-sm font-light">
                <p>Your acquisition dossier is empty.</p>
                <p className="text-xs text-[#8E8A81] mt-1">
                  Explore the showcase to reserve a timepiece.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.watch.id}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white border border-[#E0DACF] shadow-xs"
                >
                  <div className="relative w-16 h-20 shrink-0 bg-[#F4F1EA] rounded-lg overflow-hidden">
                    <Image
                      src={item.watch.image}
                      alt={item.watch.name}
                      fill
                      className="object-contain p-1 mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-medium text-base text-[#1C1B1A] truncate">
                      {item.watch.name}
                    </p>
                    <p className="text-xs text-[#76726B] font-mono">
                      {item.watch.dialName}
                    </p>
                    <p className="text-xs font-mono font-semibold text-[#9E8056] mt-1">
                      {item.watch.price} × {item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.watch.id)}
                    className="p-2 text-[#8E8A81] hover:text-red-500 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer with Summary & Checkout */}
        <div className="border-t border-[#E0DACF] pt-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#76726B] font-mono">
            <span>INSURED GLOBAL COURIER</span>
            <span className="text-[#1C1B1A] font-medium">COMPLIMENTARY</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#76726B] font-mono">ESTIMATED TOTAL</span>
            <span className="font-mono text-xl font-medium text-[#1C1B1A]">
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            disabled={items.length === 0}
            onClick={() => {
              alert("Thank you for your interest. A private horology concierge will be assigned to fulfill your allocation.");
              onClearCart();
              onClose();
            }}
            className="w-full py-3.5 rounded-full bg-[#1C1B1A] hover:bg-[#33312E] disabled:bg-[#E0DACF] disabled:text-[#8E8A81] text-white font-semibold text-xs tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Private Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#76726B] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9E8056]" />
            <span>Escrow Security • 10-Year Global Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
}
