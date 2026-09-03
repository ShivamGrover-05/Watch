"use client";

import { useEffect, useRef } from "react";
import { initGsap, gsap } from "@/lib/animations";

export function useGsapContext(
  callback: (context: gsap.Context) => void,
  scope?: React.RefObject<HTMLElement | null>,
  dependencies: any[] = []
) {
  const isLoaded = useRef(false);

  useEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope?.current || undefined);

    isLoaded.current = true;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
