"use client";

import { useEffect, useRef, useState } from "react";

import { Building2, Zap } from "lucide-react";
import { gsap } from "gsap";

import { useDemoNavigation } from "@/components/demo/useDemoNavigation";

const SOLUTION_CARDS = [
  {
    body:
      "For teams that need approvals, shared access, and retirement records tied to internal reporting workflows.",
    cta: "Book a Compliance Demo",
    icon: Building2,
    title: "Compliance Teams",
    variant: "primary" as const,
  },
  {
    body:
      "For operators who want a faster path to source project supply and retire it without building a custom workflow first.",
    cta: "Buy Offset",
    icon: Zap,
    title: "Fast Procurement",
    variant: "secondary" as const,
  },
];

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

export function Solutions() {
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
          { duration: 0.18, ease: "power2.out", scale: 1 },
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
      className="solutions-section"
      data-scroll-section="true"
      data-scroll-section-id="compliance"
      id="compliance"
      ref={sectionRef}
    >
      <div className="solutions-shell">
        <h2 className="solutions-title">Built for operational buyers, not speculative holders</h2>

        <div className="solutions-grid">
          {SOLUTION_CARDS.map(({ body, cta, icon: Icon, title, variant }) => (
            <article className="solution-card" key={title}>
              <div className="solution-copy">
                <span className="solution-icon-shell">
                  <Icon aria-hidden="true" className="solution-icon" strokeWidth={2.1} />
                </span>

                <h3 className="solution-card-title">{title}</h3>
                <p className="solution-card-body">{body}</p>
              </div>

              <button
                className={
                  variant === "primary"
                    ? "solution-button solution-button-primary"
                    : "solution-button solution-button-secondary"
                }
                data-magnetic="true"
                data-strength={variant === "primary" ? "6" : "4"}
                onClick={() =>
                  variant === "primary"
                    ? openBookDemo()
                    : openBuyOffset("marketplace")
                }
                type="button"
              >
                <span>{cta}</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .solutions-section {
          background: var(--color-surface);
          padding:
            calc(var(--space-base) * 18)
            calc(var(--space-base) * 12)
            calc(var(--space-base) * 18);
        }

        .solutions-shell {
          width: min(100%, calc(var(--space-base) * 360));
          margin: 0 auto;
        }

        .solutions-title {
          margin: 0 0 calc(var(--space-base) * 12);
          color: var(--color-text-strong);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 10), 4vw, calc(var(--space-base) * 14));
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * -0.35);
          line-height: 1.04;
          text-align: center;
          text-wrap: balance;
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: calc(var(--space-base) * 12);
        }

        .solution-card {
          display: flex;
          flex-direction: column;
          gap: calc(var(--space-base) * 8);
          min-height: calc(var(--space-base) * 78);
          padding: calc(var(--space-base) * 10);
          border: 1px solid color-mix(in srgb, var(--color-border) 34%, transparent 66%);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          transition:
            border-color var(--transition-fast) var(--ease-standard),
            box-shadow var(--transition-fast) var(--ease-standard);
        }

        .solution-card:hover {
          border-color: color-mix(in srgb, var(--color-accent) 30%, var(--color-border) 70%);
          box-shadow: var(--shadow-subtle);
        }

        .solution-copy {
          display: grid;
          gap: calc(var(--space-base) * 5);
        }

        .solution-icon-shell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: calc(var(--space-base) * 12);
          height: calc(var(--space-base) * 12);
          color: var(--color-accent);
        }

        .solution-icon {
          width: calc(var(--space-base) * 8);
          height: calc(var(--space-base) * 8);
          flex: 0 0 auto;
        }

        .solution-card-title {
          margin: 0;
          color: var(--color-text-strong);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 8), 2.4vw, calc(var(--space-base) * 10));
          font-weight: 700;
          letter-spacing: calc(var(--space-base) * -0.18);
          line-height: 1.15;
        }

        .solution-card-body {
          margin: 0;
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: clamp(calc(var(--space-base) * 5), 1.8vw, calc(var(--space-base) * 6));
          font-weight: 500;
          line-height: 1.55;
        }

        .solution-button {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: calc(var(--space-base) * 14);
          margin-top: auto;
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 4.5);
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          will-change: transform;
        }

        .solution-button span {
          position: relative;
          z-index: 1;
        }

        .solution-button-primary {
          border: 1px solid transparent;
          background: var(--color-accent);
          color: var(--color-surface);
          box-shadow: var(--shadow-subtle);
          transition:
            box-shadow var(--transition-fast) var(--ease-standard),
            transform var(--transition-fast) var(--ease-standard);
        }

        .solution-button-primary::before {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 0%;
          background: color-mix(in srgb, var(--color-accent-2) 78%, var(--color-highlight) 22%);
          transition: height calc(var(--transition-base) + var(--transition-fast)) var(--ease-smooth);
        }

        .solution-button-primary:hover,
        .solution-button-primary:focus-visible {
          box-shadow: var(--shadow-lifted);
        }

        .solution-button-primary:hover::before,
        .solution-button-primary:focus-visible::before {
          height: 100%;
        }

        .solution-button-secondary {
          border: 2px solid var(--color-accent);
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
            transform var(--transition-fast) var(--ease-standard);
        }

        .solution-button-secondary span {
          transition: transform 0.25s var(--ease-standard);
        }

        .solution-button-secondary:hover,
        .solution-button-secondary:focus-visible {
          background-size: 100% 100%;
          color: var(--color-surface);
        }

        .solution-button-secondary:hover span,
        .solution-button-secondary:focus-visible span {
          transform: translateX(calc(var(--space-base) * 0.5));
        }

        .solution-button:focus-visible {
          outline: 1px solid var(--color-accent);
          outline-offset: calc(var(--space-base) * 1);
        }

        @media (max-width: 64rem) {
          .solutions-section {
            padding-inline: calc(var(--space-base) * 8);
          }

          .solutions-grid {
            gap: calc(var(--space-base) * 8);
          }

          .solution-card {
            min-height: calc(var(--space-base) * 72);
            padding: calc(var(--space-base) * 8);
          }
        }

        @media (max-width: 48rem) {
          .solutions-section {
            padding:
              calc(var(--space-base) * 14)
              calc(var(--space-base) * 5)
              calc(var(--space-base) * 14);
          }

          .solutions-title {
            margin-bottom: calc(var(--space-base) * 10);
          }

          .solutions-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: calc(var(--space-base) * 6);
          }

          .solution-card {
            min-height: calc(var(--space-base) * 64);
          }

          .solution-card-body {
            max-width: calc(var(--space-base) * 76);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .solution-card,
          .solution-button-primary,
          .solution-button-primary::before,
          .solution-button-secondary,
          .solution-button-secondary span {
            transition-duration: 0ms;
          }
        }
      `}</style>
    </section>
  );
}
