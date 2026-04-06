"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

import { useDemoNavigation } from "@/components/demo/useDemoNavigation";
import { scrollToTarget } from "@/lib/lenis";

const NAV_LINKS = [
  { label: "Supply", href: "/supply" },
  { label: "Impact", href: "/impact" },
  { label: "Compliance", href: "/compliance" },
  { label: "Pricing", href: "/pricing" },
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

export function Nav() {
  const navRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { openBookDemo, openBuyOffset } = useDemoNavigation();

  const getScrollOffset = () => {
    const navElement = navRef.current;

    if (!navElement) {
      return 0;
    }

    return -(navElement.getBoundingClientRect().height + 16);
  };

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    if (closeMenu) {
      setMenuOpen(false);
    }

    const offset = href === "#top" ? 0 : getScrollOffset();
    const target = href === "#top" ? 0 : href;

    scrollToTarget(target, {
      immediate: prefersReducedMotion,
      offset,
    });
  };

  useEffect(() => {
    const navElement = navRef.current;

    if (!navElement) {
      return;
    }

    const magneticTargets = Array.from(
      navElement.querySelectorAll<HTMLElement>("[data-magnetic='true']"),
    );

    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      magneticTargets.forEach((target) => {
        gsap.set(target, { x: 0, y: 0 });
      });

      return;
    }

    const cleanups = magneticTargets.map((target) => {
      const moveX = gsap.quickTo(target, "x", {
        duration: 0.22,
        ease: "power2.out",
      });
      const moveY = gsap.quickTo(target, "y", {
        duration: 0.22,
        ease: "power2.out",
      });

      const handleMove = (event: PointerEvent) => {
        const bounds = target.getBoundingClientRect();
        const strength = Number(target.dataset.strength ?? 4);
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

      target.addEventListener("pointermove", handleMove);
      target.addEventListener("pointerleave", handleLeave);

      return () => {
        target.removeEventListener("pointermove", handleMove);
        target.removeEventListener("pointerleave", handleLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [prefersReducedMotion]);

  return (
    <header className="nav-shell" data-sticky-nav="true" ref={navRef}>
      <nav aria-label="Primary navigation" className="nav-inner">
        <a className="brand-mark" href="#top" onClick={(event) => handleAnchorClick(event, "#top")}>
          CarbonRoot
        </a>

        <div className="nav-links" role="list">
          {NAV_LINKS.map((link) => (
            <Link
              className="nav-link"
              data-magnetic="true"
              data-strength="4"
              href={link.href}
              key={link.label}
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="utility-link"
            onClick={() => openBuyOffset("marketplace")}
            type="button"
          >
            Buy Offset
          </button>

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
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="menu-toggle"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link
            className="mobile-link"
            href={link.href}
            key={link.label}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
