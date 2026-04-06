import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;

type ScrollToTarget = HTMLElement | string | number;

type ScrollToOptions = {
  immediate?: boolean;
  offset?: number;
};

export function createLenis() {
  const lenis = new Lenis({
    duration: 1.1,
    lerp: 0.1,
    smoothWheel: true,
    touchMultiplier: 1.05,
    wheelMultiplier: 0.95,
  });

  lenis.on("scroll", ScrollTrigger.update);
  lenisInstance = lenis;

  return lenis;
}

export function clearLenis() {
  lenisInstance?.destroy();
  lenisInstance = null;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToTarget(
  target: ScrollToTarget,
  { immediate = false, offset = 0 }: ScrollToOptions = {},
) {
  if (!lenisInstance) {
    if (typeof target === "string") {
      const element = document.querySelector<HTMLElement>(target);
      if (element) {
        const top = window.scrollY + element.getBoundingClientRect().top + offset;
        window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
      }
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({
        top: target + offset,
        behavior: immediate ? "auto" : "smooth",
      });
      return;
    }

    const top = window.scrollY + target.getBoundingClientRect().top + offset;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
    return;
  }

  lenisInstance.scrollTo(target, {
    immediate,
    offset,
  });
}
