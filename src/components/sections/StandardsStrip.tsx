"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

const TRUST_ITEMS = [
  {
    label: "Gold Standard",
    mark: "GS",
    note: "Climate impact verification",
  },
  {
    label: "Verra",
    mark: "VERRA",
    note: "Registry-backed issuance",
  },
  {
    label: "Science Based Targets",
    mark: "SBTi",
    note: "Target-setting alignment",
  },
  {
    label: "United Nations",
    mark: "UN",
    note: "Institutional climate framing",
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

export function StandardsStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const items = Array.from(
      sectionElement.querySelectorAll<HTMLElement>("[data-trust-item='true']"),
    );

    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      items.forEach((item) => {
        gsap.set(item, { opacity: 1, filter: "grayscale(0)" });
      });
      return;
    }

    const cleanups = items.map((item) => {
      const siblings = items.filter((candidate) => candidate !== item);

      const handleEnter = () => {
        gsap.to(item, {
          opacity: 1,
          filter: "grayscale(0)",
          duration: 0.22,
          ease: "power2.out",
          overwrite: true,
        });

        gsap.to(siblings, {
          opacity: 0.42,
          filter: "grayscale(1)",
          duration: 0.22,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const handleLeave = () => {
        gsap.to(items, {
          opacity: 0.62,
          filter: "grayscale(1)",
          duration: 0.22,
          ease: "power2.out",
          overwrite: true,
        });
      };

      item.addEventListener("pointerenter", handleEnter);
      item.addEventListener("pointerleave", handleLeave);

      return () => {
        item.removeEventListener("pointerenter", handleEnter);
        item.removeEventListener("pointerleave", handleLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      className="standards-section"
      data-scroll-section="true"
      data-scroll-section-id="standards-strip"
      id="standards-strip"
      ref={sectionRef}
    >
      <div className="standards-shell">
        <p className="standards-label">Institutional Standards &amp; Verifications</p>

        <div className="standards-grid">
          {TRUST_ITEMS.map(({ label, mark, note }) => (
            <div className="trust-item" data-trust-item="true" key={label}>
              <div aria-hidden="true" className="trust-mark">
                {mark}
              </div>
              <div className="trust-copy">
                <span>{label}</span>
                <small>{note}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .standards-section {
          background: var(--color-surface-alt);
          padding:
            calc(var(--space-base) * 8)
            calc(var(--space-base) * 12)
            calc(var(--space-base) * 9);
          border-bottom: 1px solid color-mix(in srgb, var(--color-border) 18%, transparent 82%);
        }

        .standards-shell {
          width: min(100%, calc(var(--space-base) * 360));
          margin: 0 auto;
        }

        .standards-label {
          margin: 0 0 calc(var(--space-base) * 8);
          color: color-mix(in srgb, var(--color-text-muted) 76%, var(--color-text-primary) 24%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 2.5);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.48);
          line-height: 1;
          text-align: center;
          text-transform: uppercase;
        }

        .standards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: center;
          gap: calc(var(--space-base) * 8);
        }

        .trust-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: calc(var(--space-base) * 4);
          min-height: calc(var(--space-base) * 18);
          padding: calc(var(--space-base) * 4);
          border-radius: var(--radius-md);
          color: color-mix(in srgb, var(--color-text-primary) 48%, var(--color-text-muted) 52%);
          opacity: 0.62;
          filter: grayscale(1);
        }

        .trust-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: calc(var(--space-base) * 18);
          min-height: calc(var(--space-base) * 10);
          padding-inline: calc(var(--space-base) * 3);
          border: 1px solid color-mix(in srgb, var(--color-border) 44%, transparent 56%);
          border-radius: 999px;
          color: var(--color-text-strong);
          font-family: var(--font-display);
          font-size: calc(var(--space-base) * 3.5);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.24);
          line-height: 1;
          text-transform: uppercase;
          flex: 0 0 auto;
        }

        .trust-copy {
          display: grid;
          gap: calc(var(--space-base) * 1.5);
        }

        .trust-copy span {
          color: var(--color-text-strong);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 4.6), 1.6vw, calc(var(--space-base) * 5.2));
          font-weight: 700;
          letter-spacing: calc(var(--space-base) * -0.06);
          line-height: 1.1;
        }

        .trust-copy small {
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 2.8);
          font-weight: 600;
          letter-spacing: calc(var(--space-base) * 0.08);
          line-height: 1.4;
        }

        @media (max-width: 64rem) {
          .standards-section {
            padding-inline: calc(var(--space-base) * 8);
          }

          .standards-grid {
            gap: calc(var(--space-base) * 6);
          }

          .trust-item {
            gap: calc(var(--space-base) * 3);
            padding: calc(var(--space-base) * 3);
          }
        }

        @media (max-width: 48rem) {
          .standards-section {
            padding:
              calc(var(--space-base) * 7)
              calc(var(--space-base) * 5)
              calc(var(--space-base) * 8);
          }

          .standards-label {
            margin-bottom: calc(var(--space-base) * 6);
            line-height: 1.4;
          }

          .standards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap:
              calc(var(--space-base) * 5)
              calc(var(--space-base) * 4);
          }

          .trust-item {
            justify-content: flex-start;
            min-height: calc(var(--space-base) * 16);
          }
        }
      `}</style>
    </section>
  );
}
