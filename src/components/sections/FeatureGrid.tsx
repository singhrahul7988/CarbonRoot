"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { BadgeCheck, Gauge, Microscope } from "lucide-react";

const FEATURE_CARDS = [
  {
    body:
      "Buy from named projects with documented origin, monitoring records, and clear retirement eligibility.",
    bullets: ["Project-level sourcing", "Verification records"],
    icon: Microscope,
    title: "Verified Project Supply",
  },
  {
    body:
      "Route purchases through a guided compliance workflow so teams can plan, approve, and retire credits without manual reconciliation.",
    bullets: ["Approval workflow", "Planned retirement"],
    icon: Gauge,
    title: "Retirement Workflow",
  },
  {
    body:
      "Every retirement creates a certificate-backed record with ledger references, project data, and auditor-friendly evidence.",
    bullets: ["Ledger reference", "Audit-ready certificate"],
    icon: BadgeCheck,
    title: "Certificate-Grade Proof",
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

export function FeatureGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const cards = Array.from(
      sectionElement.querySelectorAll<HTMLElement>("[data-feature-card='true']"),
    );

    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "transform" });
        const light = card.querySelector<HTMLElement>("[data-card-light='true']");
        if (light) {
          gsap.set(light, { opacity: 0 });
        }
      });
      return;
    }

    const cleanups = cards.map((card) => {
      const light = card.querySelector<HTMLElement>("[data-card-light='true']");
      const moveX = gsap.quickTo(card, "rotationY", {
        duration: 0.3,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(card, "rotationX", {
        duration: 0.3,
        ease: "power3.out",
      });
      const moveLift = gsap.quickTo(card, "y", {
        duration: 0.3,
        ease: "power3.out",
      });
      const moveLightX = light
        ? gsap.quickTo(light, "x", {
            duration: 0.3,
            ease: "power3.out",
          })
        : null;
      const moveLightY = light
        ? gsap.quickTo(light, "y", {
            duration: 0.3,
            ease: "power3.out",
          })
        : null;
      const fadeLight = light
        ? gsap.quickTo(light, "opacity", {
            duration: 0.3,
            ease: "power3.out",
          })
        : null;

      const handleMove = (event: PointerEvent) => {
        const bounds = card.getBoundingClientRect();
        const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
        const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

        moveX(xRatio * 14);
        moveY(yRatio * -10);
        moveLift(-6);

        if (moveLightX && moveLightY && fadeLight) {
          moveLightX(xRatio * 24);
          moveLightY(yRatio * 24);
          fadeLight(0.14);
        }
      };

      const handleLeave = () => {
        moveX(0);
        moveY(0);
        moveLift(0);

        if (moveLightX && moveLightY && fadeLight) {
          moveLightX(0);
          moveLightY(0);
          fadeLight(0);
        }
      };

      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);

      return () => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      className="feature-section"
      data-scroll-section="true"
      data-scroll-section-id="supply"
      id="supply"
      ref={sectionRef}
    >
      <div className="feature-shell">
        <div className="feature-grid">
          {FEATURE_CARDS.map(({ body, bullets, icon: Icon, title }) => (
            <article className="feature-card" data-feature-card="true" key={title}>
              <div aria-hidden="true" className="feature-card-light" data-card-light="true" />

              <div className="feature-icon-shell">
                <Icon aria-hidden="true" className="feature-icon" strokeWidth={2} />
              </div>

              <h3 className="feature-title">{title}</h3>
              <p className="feature-body">{body}</p>

              <ul className="feature-list">
                {bullets.map((bullet) => (
                  <li className="feature-list-item" key={bullet}>
                    <span aria-hidden="true" className="feature-check" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feature-section {
          background: var(--color-bg);
          padding:
            calc(var(--space-base) * 18)
            calc(var(--space-base) * 12)
            calc(var(--space-base) * 20);
        }

        .feature-shell {
          width: min(100%, calc(var(--space-base) * 360));
          margin: 0 auto;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: calc(var(--space-base) * 10);
          perspective: calc(var(--space-base) * 300);
        }

        .feature-card {
          position: relative;
          overflow: hidden;
          display: grid;
          align-content: start;
          gap: calc(var(--space-base) * 5);
          min-height: calc(var(--space-base) * 92);
          padding: calc(var(--space-base) * 8);
          border-radius: var(--radius-md);
          background: color-mix(
            in srgb,
            var(--color-surface-alt) 62%,
            var(--color-surface) 38%
          );
          border: 1px solid color-mix(in srgb, var(--color-border) 28%, transparent 72%);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          transform-style: preserve-3d;
          transition:
            background var(--transition-fast) var(--ease-standard),
            box-shadow var(--transition-fast) var(--ease-standard),
            border-color var(--transition-fast) var(--ease-standard);
          will-change: transform;
        }

        .feature-card:hover {
          background: var(--color-surface);
          border-color: color-mix(in srgb, var(--color-accent) 22%, var(--color-border) 78%);
          box-shadow: var(--shadow-lifted);
        }

        .feature-card-light {
          position: absolute;
          inset: auto auto calc(var(--space-base) * -14) calc(var(--space-base) * -10);
          width: calc(var(--space-base) * 36);
          height: calc(var(--space-base) * 36);
          border-radius: 999px;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--color-highlight) 42%, transparent 58%) 0%,
            transparent 72%
          );
          opacity: 0;
          pointer-events: none;
        }

        .feature-icon-shell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: calc(var(--space-base) * 12);
          height: calc(var(--space-base) * 12);
          border-radius: var(--radius-sm);
          background: var(--color-accent);
          color: var(--color-surface);
        }

        .feature-icon {
          width: calc(var(--space-base) * 6);
          height: calc(var(--space-base) * 6);
          flex: 0 0 auto;
        }

        .feature-title {
          margin: calc(var(--space-base) * 3) 0 0;
          color: var(--color-text-strong);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 8), 2.2vw, calc(var(--space-base) * 10));
          font-weight: 700;
          letter-spacing: calc(var(--space-base) * -0.16);
          line-height: 1.15;
        }

        .feature-body {
          margin: 0;
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: clamp(calc(var(--space-base) * 5), 1.7vw, calc(var(--space-base) * 6));
          font-weight: 500;
          line-height: 1.55;
        }

        .feature-list {
          display: grid;
          gap: calc(var(--space-base) * 4);
          margin: calc(var(--space-base) * 6) 0 0;
          padding: 0;
          list-style: none;
        }

        .feature-list-item {
          display: flex;
          align-items: center;
          gap: calc(var(--space-base) * 3);
          color: color-mix(in srgb, var(--color-text-primary) 78%, var(--color-text-muted) 22%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 4);
          font-weight: 600;
          line-height: 1.35;
        }

        .feature-check {
          display: inline-flex;
          width: calc(var(--space-base) * 2);
          height: calc(var(--space-base) * 2);
          border-radius: 999px;
          background: var(--color-accent);
          flex: 0 0 auto;
        }

        @media (max-width: 64rem) {
          .feature-section {
            padding-inline: calc(var(--space-base) * 8);
          }

          .feature-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: calc(var(--space-base) * 8);
          }

          .feature-card {
            min-height: calc(var(--space-base) * 80);
          }
        }

        @media (max-width: 48rem) {
          .feature-section {
            padding:
              calc(var(--space-base) * 14)
              calc(var(--space-base) * 5)
              calc(var(--space-base) * 14);
          }

          .feature-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: calc(var(--space-base) * 6);
          }

          .feature-card {
            min-height: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .feature-card {
            transition-duration: 0ms;
          }
        }
      `}</style>
    </section>
  );
}
