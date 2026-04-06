"use client";

import { useEffect, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { clearLenis, createLenis } from "@/lib/lenis";
import {
  HERO_REVEAL_DELAY,
  SECTION_REVEAL_ENTER,
  SECTION_REVEAL_INITIAL,
  SECTION_REVEAL_TRIGGER,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}

export function ScrollOrchestrator() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-section='true']"),
    );
    const hero = sections.find((section) => section.dataset.scrollSectionId === "hero");
    const remainingSections = sections.filter((section) => section !== hero);
    let lenis = null as ReturnType<typeof createLenis> | null;
    let refreshTimeoutId = 0;
    let isDisposed = false;
    const tickerCallback = (time: number) => {
      lenis?.raf(time * 1000);
    };
    const scheduleRefresh = () => {
      if (isDisposed) {
        return;
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (!isDisposed) {
            ScrollTrigger.refresh();
          }
        });
      });
    };
    const handlePageShow = () => {
      scheduleRefresh();
    };

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(sections, { clearProps: "opacity,scale,transform" });
        return;
      }

      if (hero) {
        gsap.fromTo(
          hero,
          SECTION_REVEAL_INITIAL,
          {
            ...SECTION_REVEAL_ENTER,
            delay: HERO_REVEAL_DELAY,
          },
        );
      }

      remainingSections.forEach((section) => {
        gsap.fromTo(
          section,
          SECTION_REVEAL_INITIAL,
          {
            ...SECTION_REVEAL_ENTER,
            scrollTrigger: {
              ...SECTION_REVEAL_TRIGGER,
              trigger: section,
            },
          },
        );
      });
    }, document.body);

    if (!prefersReducedMotion) {
      lenis = createLenis();
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
      scheduleRefresh();
      refreshTimeoutId = window.setTimeout(scheduleRefresh, 180);
      window.addEventListener("load", scheduleRefresh);
      window.addEventListener("pageshow", handlePageShow);

      void document.fonts?.ready
        .then(() => {
          scheduleRefresh();
        })
        .catch(() => undefined);
    }

    return () => {
      isDisposed = true;
      context.revert();

      if (lenis) {
        window.clearTimeout(refreshTimeoutId);
        window.removeEventListener("load", scheduleRefresh);
        window.removeEventListener("pageshow", handlePageShow);
        gsap.ticker.remove(tickerCallback);
        clearLenis();
      }
    };
  }, [prefersReducedMotion]);

  return null;
}
