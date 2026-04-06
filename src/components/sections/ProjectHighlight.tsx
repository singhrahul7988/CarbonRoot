"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useDemoNavigation } from "@/components/demo/useDemoNavigation";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABy_zV1w4l2rWYQ2FdTJNi5GECdxLBVBkVjdQ6-VVZMByxcJRJVC6vJBpkFbS6OhPyKD1tKzGKpCzBJeYcTov45ZpZC95pbt8nzAGQBXYi-pOUsRMisZmJZnMRYCf-HqT0x4OR8NcrD1bYPU468DSLCXW_Xi_GWswCWSBR0mfoGgq_qTYtIV_aUUhbW-rFxM5h9Cf0ObQ1SpM1j-vb8Oi8XGOPEbtuSG8DuDtlOfOYWUOK_MdllZbg7lVpp_9YDNlZmSOeWORNrVc";

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

export function ProjectHighlight() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const statCapacityRef = useRef<HTMLSpanElement | null>(null);
  const statScoreRef = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { openProjectDetails } = useDemoNavigation();

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const imageFrameElement = imageFrameRef.current;
    const imageElement = imageRef.current;
    const statCapacityElement = statCapacityRef.current;
    const statScoreElement = statScoreRef.current;

    if (
      !sectionElement ||
      !imageFrameElement ||
      !imageElement ||
      !statCapacityElement ||
      !statScoreElement
    ) {
      return;
    }

    const cleanups: Array<() => void> = [];

    if (prefersReducedMotion) {
      statCapacityElement.textContent = "2.4M";
      statScoreElement.textContent = "9.8/10";
      gsap.set(imageFrameElement, {
        clipPath: "inset(0 0 0 0 round var(--radius-lg))",
        rotationX: 0,
        rotationY: 0,
      });
      gsap.set(imageElement, { scale: 1 });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        imageFrameElement,
        { clipPath: "inset(0 100% 0 0 round var(--radius-lg))" },
        {
          clipPath: "inset(0 0 0 0 round var(--radius-lg))",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageFrameElement,
            start: "top 78%",
            once: true,
          },
        },
      );

      const stats = [
        {
          decimals: 1,
          element: statCapacityElement,
          format: (value: number) => `${value.toFixed(1)}M`,
          value: 2.4,
        },
        {
          decimals: 1,
          element: statScoreElement,
          format: (value: number) => `${value.toFixed(1)}/10`,
          value: 9.8,
        },
      ];

      stats.forEach((stat, index) => {
        const tracker = { value: 0 };

        gsap.to(tracker, {
          value: stat.value,
          duration: 1.4,
          delay: index * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 76%",
            once: true,
          },
          onUpdate: () => {
            stat.element.textContent = stat.format(tracker.value);
          },
        });
      });

      if (window.matchMedia("(pointer: coarse)").matches) {
        return;
      }

      const rotateXTo = gsap.quickTo(imageFrameElement, "rotationX", {
        duration: 0.35,
        ease: "power3.out",
      });
      const rotateYTo = gsap.quickTo(imageFrameElement, "rotationY", {
        duration: 0.35,
        ease: "power3.out",
      });
      const scaleTo = gsap.quickTo(imageElement, "scale", {
        duration: 0.35,
        ease: "power3.out",
      });

      const handleMove = (event: PointerEvent) => {
        const bounds = imageFrameElement.getBoundingClientRect();
        const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
        const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

        rotateXTo(yRatio * -8);
        rotateYTo(xRatio * 12);
        scaleTo(1.04);
      };

      const handleLeave = () => {
        rotateXTo(0);
        rotateYTo(0);
        scaleTo(1);
      };

      imageFrameElement.addEventListener("pointermove", handleMove);
      imageFrameElement.addEventListener("pointerleave", handleLeave);

      cleanups.push(() => {
        imageFrameElement.removeEventListener("pointermove", handleMove);
        imageFrameElement.removeEventListener("pointerleave", handleLeave);
      });
    }, sectionElement);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      className="project-section"
      data-scroll-section="true"
      data-scroll-section-id="impact"
      id="impact"
      ref={sectionRef}
    >
      <div className="project-shell">
        <div className="project-grid">
          <div className="project-copy">
            <span className="project-badge">Active Project Highlight</span>

            <h2 className="project-title">The Luangwa Valley Reforestation</h2>

            <p className="project-body">
              A flagship reforestation program that lets buyers source credits from a
              named project instead of purchasing anonymous supply with limited
              retirement context.
            </p>

            <div className="project-stats">
              <div className="project-stat">
                <span className="project-stat-label">Impact Capacity</span>
                <p className="project-stat-value">
                  <span ref={statCapacityRef}>0.0M</span> <span>tCO2e/yr</span>
                </p>
              </div>

              <div className="project-stat">
                <span className="project-stat-label">Biodiversity Score</span>
                <p className="project-stat-value">
                  <span ref={statScoreRef}>0.0/10</span>
                </p>
              </div>
            </div>

            <button
              className="project-cta"
              onClick={() => openProjectDetails()}
              type="button"
            >
              Explore Project Details
            </button>
          </div>

          <div className="project-visual">
            <div className="project-image-frame" ref={imageFrameRef}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Close view of a young reforestation sapling emerging from rich soil."
                className="project-image"
                ref={imageRef}
                src={PROJECT_IMAGE}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-section {
          position: relative;
          overflow: hidden;
          background: var(--color-accent);
          padding:
            calc(var(--space-base) * 18)
            calc(var(--space-base) * 12)
            calc(var(--space-base) * 18);
        }

        .project-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 18% 14%,
              color-mix(in srgb, var(--color-surface) 4%, transparent 96%) 0%,
              transparent 48%
            ),
            radial-gradient(
              circle at 82% 18%,
              color-mix(in srgb, var(--color-surface) 4%, transparent 96%) 0%,
              transparent 42%
            ),
            repeating-radial-gradient(
              circle at 24% 18%,
              transparent 0 calc(var(--space-base) * 8),
              color-mix(in srgb, var(--color-surface) 3%, transparent 97%)
                calc(var(--space-base) * 8) calc(var(--space-base) * 8.5)
            );
          opacity: 0.72;
          pointer-events: none;
        }

        .project-shell {
          position: relative;
          z-index: 1;
          width: min(100%, calc(var(--space-base) * 360));
          margin: 0 auto;
        }

        .project-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.96fr);
          align-items: center;
          gap: calc(var(--space-base) * 12);
        }

        .project-copy {
          display: grid;
          align-content: start;
          gap: calc(var(--space-base) * 7);
        }

        .project-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          min-height: calc(var(--space-base) * 6);
          padding-inline: calc(var(--space-base) * 4);
          border-radius: var(--radius-sm);
          background: color-mix(in srgb, var(--color-surface) 8%, transparent 92%);
          color: color-mix(in srgb, var(--color-highlight) 24%, var(--color-surface) 76%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 2.5);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.46);
          line-height: 1;
          text-transform: uppercase;
        }

        .project-title {
          max-width: calc(var(--space-base) * 102);
          margin: 0;
          color: var(--color-surface);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 12), 5vw, calc(var(--space-base) * 16));
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * -0.42);
          line-height: 0.98;
          text-wrap: balance;
        }

        .project-body {
          max-width: calc(var(--space-base) * 100);
          margin: 0;
          color: color-mix(in srgb, var(--color-highlight) 14%, var(--color-surface) 86%);
          font-family: var(--font-body);
          font-size: clamp(calc(var(--space-base) * 5), 1.9vw, calc(var(--space-base) * 6));
          font-weight: 500;
          line-height: 1.6;
        }

        .project-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: calc(var(--space-base) * 8);
          padding-top: calc(var(--space-base) * 4);
        }

        .project-stat {
          display: grid;
          gap: calc(var(--space-base) * 2);
          padding-left: calc(var(--space-base) * 6);
          border-left: 2px solid
            color-mix(in srgb, var(--color-highlight) 16%, var(--color-surface) 84%);
        }

        .project-stat-label {
          color: color-mix(in srgb, var(--color-highlight) 28%, var(--color-surface) 72%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 3.5);
          font-weight: 700;
          letter-spacing: calc(var(--space-base) * 0.34);
          line-height: 1;
          text-transform: uppercase;
        }

        .project-stat-value {
          margin: 0;
          color: var(--color-surface);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 9), 2.6vw, calc(var(--space-base) * 12));
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * -0.18);
          line-height: 1;
        }

        .project-stat-value span:last-child {
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 4);
          font-weight: 600;
          letter-spacing: 0;
        }

        .project-cta {
          width: fit-content;
          min-height: calc(var(--space-base) * 14);
          margin-top: calc(var(--space-base) * 8);
          padding-inline: calc(var(--space-base) * 10);
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          background: var(--color-surface);
          color: var(--color-accent);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 4.5);
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          transition:
            background var(--transition-fast) var(--ease-standard),
            transform var(--transition-fast) var(--ease-standard),
            box-shadow var(--transition-fast) var(--ease-standard);
        }

        .project-cta:hover,
        .project-cta:focus-visible {
          background: color-mix(in srgb, var(--color-highlight) 18%, var(--color-surface) 82%);
          box-shadow: var(--shadow-subtle);
          transform: translateY(calc(var(--space-base) * -0.5));
        }

        .project-cta:focus-visible {
          outline: 1px solid var(--color-surface);
          outline-offset: calc(var(--space-base) * 1);
        }

        .project-visual {
          display: flex;
          justify-content: flex-end;
          min-width: 0;
        }

        .project-image-frame {
          width: min(100%, calc(var(--space-base) * 132));
          aspect-ratio: 1.34;
          padding: calc(var(--space-base) * 2);
          border: 1px solid color-mix(in srgb, var(--color-surface) 16%, transparent 84%);
          border-radius: var(--radius-lg);
          background: color-mix(in srgb, var(--color-surface) 5%, transparent 95%);
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform, clip-path;
        }

        .project-image {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-md);
          object-fit: cover;
          will-change: transform;
        }

        @media (max-width: 64rem) {
          .project-section {
            padding-inline: calc(var(--space-base) * 8);
          }

          .project-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: calc(var(--space-base) * 12);
          }

          .project-visual {
            justify-content: flex-start;
          }

          .project-image-frame {
            width: min(100%, calc(var(--space-base) * 160));
          }
        }

        @media (max-width: 48rem) {
          .project-section {
            padding:
              calc(var(--space-base) * 14)
              calc(var(--space-base) * 5)
              calc(var(--space-base) * 14);
          }

          .project-stats {
            grid-template-columns: minmax(0, 1fr);
            gap: calc(var(--space-base) * 5);
          }

          .project-body {
            max-width: calc(var(--space-base) * 78);
          }

          .project-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-cta {
            transition-duration: 0ms;
          }
        }
      `}</style>
    </section>
  );
}
