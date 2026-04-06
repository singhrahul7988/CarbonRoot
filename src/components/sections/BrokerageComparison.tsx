"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OLD_WAY_POINTS = [
  "Fragmented sourcing",
  "Unclear project records",
  "Back-and-forth approvals",
  "Late certificate delivery",
];

const CARBONROOT_POINTS = [
  "Project-specific supply",
  "Guided retirement steps",
  "Clear audit trail",
  "Certificate-ready proof",
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

export function BrokerageComparison() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const oldCardRef = useRef<HTMLDivElement | null>(null);
  const newCardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const oldCardElement = oldCardRef.current;
    const newCardElement = newCardRef.current;

    if (!sectionElement || !oldCardElement || !newCardElement) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set([oldCardElement, newCardElement], {
        clearProps: "all",
        opacity: 1,
        scale: 1,
        y: 0,
      });
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .fromTo(
          oldCardElement,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power4.out",
          },
        )
        .fromTo(
          newCardElement,
          { y: 24, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power4.out",
          },
          0.16,
        );
    }, sectionElement);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      className="comparison-section"
      data-scroll-section="true"
      data-scroll-section-id="brokerage-comparison"
      id="brokerage-comparison"
      ref={sectionRef}
    >
      <div className="comparison-shell">
        <h2 className="comparison-title">From sourcing chaos to a clear retirement trail</h2>

        <div className="comparison-grid">
          <article className="comparison-card comparison-card-old" ref={oldCardRef}>
            <div className="comparison-label-row">
              <span className="comparison-label">The Old Way</span>
            </div>

            <ul className="comparison-copy">
              {OLD_WAY_POINTS.map((point) => (
                <li className="comparison-item" key={point}>
                  <span aria-hidden="true" className="comparison-bullet" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div aria-hidden="true" className="comparison-lines">
              <span className="comparison-line comparison-line-full" />
              <span className="comparison-line comparison-line-short" />
            </div>
          </article>

          <article className="comparison-card comparison-card-new" ref={newCardRef}>
            <div className="comparison-label-row comparison-label-row-contrast">
              <span className="comparison-label comparison-label-contrast">
                The CarbonRoot Way
              </span>
            </div>

            <ul className="comparison-copy comparison-copy-contrast">
              {CARBONROOT_POINTS.map((point) => (
                <li className="comparison-item" key={point}>
                  <span aria-hidden="true" className="comparison-bullet comparison-bullet-contrast" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div aria-hidden="true" className="comparison-lines comparison-lines-contrast">
              <span className="comparison-line comparison-line-contrast comparison-line-full" />
              <span className="comparison-line comparison-line-contrast comparison-line-short" />
            </div>
          </article>
        </div>
      </div>

      <style jsx>{`
        .comparison-section {
          background: var(--color-surface);
          padding:
            calc(var(--space-base) * 18)
            calc(var(--space-base) * 12)
            calc(var(--space-base) * 18);
          border-top: 1px solid color-mix(in srgb, var(--color-border) 18%, transparent 82%);
          border-bottom: 1px solid color-mix(in srgb, var(--color-border) 18%, transparent 82%);
        }

        .comparison-shell {
          width: min(100%, calc(var(--space-base) * 360));
          margin: 0 auto;
        }

        .comparison-title {
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

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: calc(var(--space-base) * 7);
        }

        .comparison-card {
          position: relative;
          display: grid;
          gap: calc(var(--space-base) * 8);
          min-height: calc(var(--space-base) * 60);
          padding: calc(var(--space-base) * 10);
          border: 1px solid color-mix(in srgb, var(--color-border) 34%, transparent 66%);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .comparison-card-old {
          background: color-mix(
            in srgb,
            var(--color-surface-alt) 82%,
            var(--color-surface) 18%
          );
        }

        .comparison-card-new {
          background: var(--color-accent);
        }

        .comparison-label-row {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
        }

        .comparison-label {
          color: color-mix(in srgb, var(--color-text-muted) 80%, var(--color-text-primary) 20%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 3);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.42);
          line-height: 1;
          text-transform: uppercase;
        }

        .comparison-label-contrast {
          color: color-mix(in srgb, var(--color-highlight) 48%, var(--color-surface) 52%);
        }

        .comparison-copy {
          position: relative;
          z-index: 1;
          max-width: calc(var(--space-base) * 96);
          display: grid;
          gap: calc(var(--space-base) * 4);
          margin: 0;
          padding: 0;
          list-style: none;
          color: color-mix(in srgb, var(--color-text-primary) 76%, var(--color-text-muted) 24%);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 6.5), 2.3vw, calc(var(--space-base) * 8));
          font-weight: 700;
          letter-spacing: calc(var(--space-base) * -0.16);
          line-height: 1.18;
        }

        .comparison-copy-contrast {
          color: var(--color-surface);
        }

        .comparison-item {
          display: flex;
          align-items: flex-start;
          gap: calc(var(--space-base) * 3);
        }

        .comparison-bullet {
          width: calc(var(--space-base) * 2);
          height: calc(var(--space-base) * 2);
          margin-top: calc(var(--space-base) * 2.25);
          border-radius: 999px;
          background: color-mix(in srgb, var(--color-text-primary) 28%, transparent 72%);
          flex: 0 0 auto;
        }

        .comparison-bullet-contrast {
          background: color-mix(in srgb, var(--color-highlight) 46%, var(--color-surface) 54%);
        }

        .comparison-lines {
          position: relative;
          z-index: 1;
          align-self: end;
          display: grid;
          gap: calc(var(--space-base) * 4);
          margin-top: auto;
        }

        .comparison-line {
          display: block;
          height: calc(var(--space-base) * 1.25);
          border-radius: 999px;
          background: color-mix(in srgb, var(--color-border) 22%, var(--color-surface) 78%);
        }

        .comparison-line-contrast {
          background: color-mix(in srgb, var(--color-highlight) 22%, var(--color-surface) 78%);
          opacity: 0.34;
        }

        .comparison-line-full {
          width: 100%;
        }

        .comparison-line-short {
          width: 78%;
        }

        @media (max-width: 64rem) {
          .comparison-section {
            padding-inline: calc(var(--space-base) * 8);
          }

          .comparison-grid {
            gap: calc(var(--space-base) * 6);
          }

          .comparison-card {
            min-height: calc(var(--space-base) * 58);
            padding: calc(var(--space-base) * 8);
          }
        }

        @media (max-width: 48rem) {
          .comparison-section {
            padding:
              calc(var(--space-base) * 14)
              calc(var(--space-base) * 5)
              calc(var(--space-base) * 14);
          }

          .comparison-title {
            margin-bottom: calc(var(--space-base) * 10);
          }

          .comparison-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .comparison-card {
            min-height: calc(var(--space-base) * 52);
            gap: calc(var(--space-base) * 6);
          }

          .comparison-copy {
            max-width: calc(var(--space-base) * 74);
            font-size: calc(var(--space-base) * 6.5);
          }
        }
      `}</style>
    </section>
  );
}
