"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { useDemoNavigation } from "@/components/demo/useDemoNavigation";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjG2vPSw3VXZ0-3xkHrESSzQ4OwkNodZlPvtyqlCwFsQiO6eqouUO5iB_uvMv3jGxkTmmGL7bmhZp1mLsClENWZDvX-cSLSZ-GDpi2O_Rm_OIb8b4sw0f7Dc3BJLLaTFmUC1SLel7DLY4PmMxYgKhPaCxk6b_SxA_X5VipB8P0x64hDXWViXLFjLpMhj0cnZ8VSloooX8XhPBE0Ux-RSp2yyI_A-FYCaT25g4q_ZDU4kc_pmhA6UsR6Kx2PD8sLOiOy9VRrxM7EUA";

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

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const proofCardRef = useRef<HTMLButtonElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { openBookDemo, openBuyOffset, openCertificate } = useDemoNavigation();

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const proofCardElement = proofCardRef.current;
    const scanElement = scanRef.current;

    if (!sectionElement || !proofCardElement || !scanElement) {
      return;
    }

    const pointerIsCoarse = window.matchMedia("(pointer: coarse)").matches;
    const cleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      const magneticTargets = gsap.utils.toArray<HTMLElement>(
        sectionElement.querySelectorAll("[data-magnetic='true']"),
      );

      if (!prefersReducedMotion) {
        gsap.fromTo(
          proofCardElement,
          { y: 28, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            delay: 0.35,
            ease: "power4.out",
          },
        );

        gsap
          .timeline({ repeat: -1, repeatDelay: 12 })
          .fromTo(
            scanElement,
            { xPercent: -110, opacity: 0 },
            {
              xPercent: 110,
              duration: 2.4,
              ease: "none",
              keyframes: [
                { opacity: 0, duration: 0 },
                { opacity: 0.18, duration: 1.2 },
                { opacity: 0, duration: 1.2 },
              ],
            },
          );
      } else {
        gsap.set(proofCardElement, { clearProps: "all", opacity: 1, y: 0, scale: 1 });
        gsap.set(scanElement, { opacity: 0 });
      }

      if (prefersReducedMotion || pointerIsCoarse) {
        magneticTargets.forEach((target) => gsap.set(target, { x: 0, y: 0 }));
        return;
      }

      magneticTargets.forEach((target) => {
        const strength = Number(target.dataset.strength ?? 6);
        const quickX = gsap.quickTo(target, "x", {
          duration: 0.28,
          ease: "power3.out",
        });
        const quickY = gsap.quickTo(target, "y", {
          duration: 0.28,
          ease: "power3.out",
        });

        const handleMove = (event: PointerEvent) => {
          const bounds = target.getBoundingClientRect();
          const nextX =
            ((event.clientX - bounds.left) / bounds.width - 0.5) * strength * 2;
          const nextY =
            ((event.clientY - bounds.top) / bounds.height - 0.5) * strength * 2;

          quickX(nextX);
          quickY(nextY);
        };

        const handleLeave = () => {
          quickX(0);
          quickY(0);
        };

        const handlePress = () => {
          gsap.fromTo(
            target,
            { scale: 0.97 },
            { scale: 1, duration: 0.18, ease: "power2.out" },
          );
        };

        target.addEventListener("pointermove", handleMove);
        target.addEventListener("pointerleave", handleLeave);
        target.addEventListener("click", handlePress);

        cleanups.push(() => {
          target.removeEventListener("pointermove", handleMove);
          target.removeEventListener("pointerleave", handleLeave);
          target.removeEventListener("click", handlePress);
        });
      });
    }, sectionElement);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      className="hero-section"
      data-scroll-section="true"
      data-scroll-section-id="hero"
      id="hero"
      ref={sectionRef}
    >
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="hero-badge">The Earth&apos;s Ledger</span>

          <h1 className="hero-title">
            Source verified carbon credits. Retire them with proof.
          </h1>

          <p className="hero-body">
            CarbonRoot helps teams buy credits from specific projects, retire them
            permanently, and generate certificate-grade records for compliance and
            reporting.
          </p>

          <div className="hero-actions">
            <button
              className="primary-cta"
              data-magnetic="true"
              data-strength="6"
              onClick={() => openBookDemo()}
              type="button"
            >
              <span>Book a Compliance Demo</span>
            </button>

            <button
              className="secondary-action"
              onClick={() => openBuyOffset("marketplace")}
              type="button"
            >
              <span>Buy Offset</span>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-shell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="High resolution aerial forest canopy representing verified carbon project supply."
              className="hero-image"
              fetchPriority="high"
              src={HERO_IMAGE}
            />

            <button
              className="proof-card"
              onClick={() => openCertificate()}
              ref={proofCardRef}
              type="button"
            >
              <div aria-hidden="true" className="proof-scan" ref={scanRef} />

              <div className="proof-header">
                <span className="proof-label">Verified Impact Certificate</span>
                <span aria-hidden="true" className="proof-icon">
                  CR
                </span>
              </div>

              <div aria-hidden="true" className="proof-lines">
                <span className="proof-line proof-line-primary" />
                <span className="proof-line proof-line-secondary" />
              </div>

              <div className="proof-footer">
                <div className="proof-meta">
                  <span className="proof-meta-label">Project ID</span>
                  <strong className="proof-meta-value">CR-2024-AMZ-08</strong>
                </div>

                <p className="proof-volume">
                  12,400 <span>tCO2e</span>
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
