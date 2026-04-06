"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { useDemoNavigation } from "@/components/demo/useDemoNavigation";

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

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { openBookDemo, openBuyOffset } = useDemoNavigation();

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const pointerIsCoarse = window.matchMedia("(pointer: coarse)").matches;
    const magneticTargets = Array.from(
      sectionElement.querySelectorAll<HTMLElement>("[data-magnetic='true']"),
    );

    if (prefersReducedMotion || pointerIsCoarse) {
      magneticTargets.forEach((target) => gsap.set(target, { x: 0, y: 0 }));
      return;
    }

    const cleanups = magneticTargets.map((target) => {
      const strength = Number(target.dataset.strength ?? 6);
      const moveX = gsap.quickTo(target, "x", {
        duration: 0.28,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(target, "y", {
        duration: 0.28,
        ease: "power3.out",
      });

      const handleMove = (event: PointerEvent) => {
        const bounds = target.getBoundingClientRect();
        const nextX =
          ((event.clientX - bounds.left) / bounds.width - 0.5) * strength * 2;
        const nextY =
          ((event.clientY - bounds.top) / bounds.height - 0.5) * strength * 2;

        moveX(nextX);
        moveY(nextY);
      };

      const handleLeave = () => {
        moveX(0);
        moveY(0);
      };

      const handleClick = () => {
        gsap.fromTo(
          target,
          { scale: 0.97 },
          { scale: 1, duration: 0.18, ease: "power2.out" },
        );
      };

      target.addEventListener("pointermove", handleMove);
      target.addEventListener("pointerleave", handleLeave);
      target.addEventListener("click", handleClick);

      return () => {
        target.removeEventListener("pointermove", handleMove);
        target.removeEventListener("pointerleave", handleLeave);
        target.removeEventListener("click", handleClick);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      className="final-cta-section"
      data-scroll-section="true"
      data-scroll-section-id="pricing"
      id="pricing"
      ref={sectionRef}
    >
      <div className="final-cta-shell">
        <h2 className="final-cta-title">Ready to make retirement the easiest part of reporting?</h2>
        <p className="final-cta-body">
          Walk through the CarbonRoot demo flow for sourcing project supply,
          retiring credits, and exporting certificate-ready proof.
        </p>

        <div className="final-cta-actions">
          <button
            className="final-cta-button final-cta-button-primary"
            data-magnetic="true"
            data-strength="6"
            onClick={() => openBookDemo()}
            type="button"
          >
            <span>Book a Compliance Demo</span>
          </button>

          <button
            className="final-cta-button final-cta-button-secondary"
            data-magnetic="true"
            data-strength="4"
            onClick={() => openBuyOffset("marketplace")}
            type="button"
          >
            <span>Buy Offset</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .final-cta-section {
          background: var(--color-surface);
          padding:
            calc(var(--space-base) * 18)
            calc(var(--space-base) * 12)
            calc(var(--space-base) * 16);
        }

        .final-cta-shell {
          width: min(100%, calc(var(--space-base) * 220));
          margin: 0 auto;
          text-align: center;
        }

        .final-cta-title {
          margin: 0 0 calc(var(--space-base) * 8);
          color: var(--color-text-strong);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 12), 4.8vw, calc(var(--space-base) * 16));
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * -0.4);
          line-height: 1.04;
          text-wrap: balance;
        }

        .final-cta-body {
          max-width: calc(var(--space-base) * 148);
          margin: 0 auto calc(var(--space-base) * 10);
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: clamp(calc(var(--space-base) * 5), 2vw, calc(var(--space-base) * 6));
          font-weight: 500;
          line-height: 1.55;
          text-wrap: balance;
        }

        .final-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: calc(var(--space-base) * 6);
        }

        .final-cta-button {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: calc(var(--space-base) * 15);
          min-width: calc(var(--space-base) * 70);
          padding-inline: calc(var(--space-base) * 10);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 4.5);
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          will-change: transform;
        }

        .final-cta-button span {
          position: relative;
          z-index: 1;
        }

        .final-cta-button-primary {
          border: 1px solid transparent;
          background: var(--color-accent);
          color: var(--color-surface);
          box-shadow: var(--shadow-lifted);
          transition:
            box-shadow var(--transition-fast) var(--ease-standard),
            transform var(--transition-fast) var(--ease-standard);
        }

        .final-cta-button-primary::before {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 0%;
          background: color-mix(in srgb, var(--color-accent-2) 78%, var(--color-highlight) 22%);
          transition: height calc(var(--transition-base) + var(--transition-fast)) var(--ease-smooth);
        }

        .final-cta-button-primary:hover,
        .final-cta-button-primary:focus-visible {
          box-shadow: var(--shadow-lifted);
        }

        .final-cta-button-primary:hover::before,
        .final-cta-button-primary:focus-visible::before {
          height: 100%;
        }

        .final-cta-button-secondary {
          border: 1px solid color-mix(in srgb, var(--color-border) 78%, transparent 22%);
          background:
            linear-gradient(
              90deg,
              color-mix(in srgb, var(--color-accent) 100%, transparent 0%) 0%,
              color-mix(in srgb, var(--color-accent) 100%, transparent 0%) 100%
            )
            left center / 0% 100% no-repeat;
          color: var(--color-accent);
          transition:
            background-size 0.25s var(--ease-standard),
            color var(--transition-fast) var(--ease-standard),
            border-color var(--transition-fast) var(--ease-standard),
            transform var(--transition-fast) var(--ease-standard);
        }

        .final-cta-button-secondary span {
          transition: transform 0.25s var(--ease-standard);
        }

        .final-cta-button-secondary:hover,
        .final-cta-button-secondary:focus-visible {
          background-size: 100% 100%;
          border-color: var(--color-accent);
          color: var(--color-surface);
        }

        .final-cta-button-secondary:hover span,
        .final-cta-button-secondary:focus-visible span {
          transform: translateX(calc(var(--space-base) * 0.5));
        }

        .final-cta-button:focus-visible {
          outline: 1px solid var(--color-accent);
          outline-offset: calc(var(--space-base) * 1);
        }

        @media (max-width: 48rem) {
          .final-cta-section {
            padding:
              calc(var(--space-base) * 14)
              calc(var(--space-base) * 5)
              calc(var(--space-base) * 12);
          }

          .final-cta-actions {
            flex-direction: column;
            gap: calc(var(--space-base) * 4);
          }

          .final-cta-button {
            width: 100%;
            min-width: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .final-cta-button,
          .final-cta-button-primary::before,
          .final-cta-button-secondary,
          .final-cta-button-secondary span {
            transition-duration: 0ms;
          }
        }
      `}</style>
    </section>
  );
}
