"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PRODUCT_LINKS = [
  { label: "Marketplace", href: "/supply" },
  { label: "Compliance API", href: "/compliance" },
  { label: "Project Submission", href: "/project-submission" },
] as const;
const RESOURCE_LINKS = [
  { label: "ESG Standards", href: "/compliance" },
  { label: "Certifications", href: "/supply" },
  { label: "Privacy Policy", href: "/pricing" },
  { label: "Audit Logs", href: "/impact" },
] as const;

export function Footer() {
  return (
    <footer
      className="footer-shell"
      data-scroll-section="true"
      data-scroll-section-id="footer"
      id="footer"
    >
      <div className="footer-grid">
        <div className="footer-brand-block">
          <p className="footer-brand">CarbonRoot</p>
          <p className="footer-brand-copy">
            Securing the planet&apos;s future through institutional-grade carbon
            verification.
          </p>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Product</p>
          <ul className="footer-list">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label}>
                <Link className="footer-link" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Resources</p>
          <ul className="footer-list">
            {RESOURCE_LINKS.map((link) => (
              <li key={link.label}>
                <Link className="footer-link" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Newsletter</p>
          <form className="footer-form">
            <input
              aria-label="Email"
              className="footer-input"
              placeholder="Email"
              type="email"
            />
            <button className="footer-submit" type="submit">
              <ArrowRight aria-hidden="true" className="footer-submit-icon" />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-legal">
        <p>&copy; 2024 CarbonRoot. Earth&apos;s Ledger. All rights reserved.</p>
      </div>

      <style jsx>{`
        .footer-shell {
          background: var(--color-surface-alt);
          border-top: 1px solid color-mix(in srgb, var(--color-border) 22%, transparent 78%);
          padding-top: calc(var(--space-base) * 14);
          padding-bottom: calc(var(--space-base) * 10);
        }

        .footer-grid,
        .footer-legal {
          width: min(100%, calc(var(--space-base) * 360));
          margin: 0 auto;
          padding-inline: calc(var(--space-base) * 12);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1fr 1fr;
          gap: calc(var(--space-base) * 10);
        }

        .footer-brand-block,
        .footer-column {
          display: grid;
          align-content: start;
          gap: calc(var(--space-base) * 6);
        }

        .footer-brand {
          margin: 0;
          color: var(--color-text-strong);
          font-family: var(--font-display);
          font-size: calc(var(--space-base) * 6);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.24);
          line-height: 1;
          text-transform: uppercase;
        }

        .footer-brand-copy {
          max-width: calc(var(--space-base) * 52);
          margin: 0;
          color: color-mix(in srgb, var(--color-text-muted) 84%, var(--color-text-primary) 16%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 4);
          font-weight: 500;
          line-height: 1.55;
        }

        .footer-heading {
          margin: 0;
          color: color-mix(in srgb, var(--color-text-muted) 74%, var(--color-text-primary) 26%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 2.5);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.42);
          line-height: 1;
          text-transform: uppercase;
        }

        .footer-list {
          display: grid;
          gap: calc(var(--space-base) * 4);
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .footer-link {
          color: color-mix(in srgb, var(--color-text-muted) 84%, var(--color-text-primary) 16%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 4);
          font-weight: 500;
          line-height: 1.5;
          text-decoration: none;
          transition: color var(--transition-fast) var(--ease-standard);
        }

        .footer-link:hover,
        .footer-link:focus-visible {
          color: var(--color-text-strong);
        }

        .footer-form {
          display: flex;
          align-items: stretch;
          width: 100%;
          max-width: calc(var(--space-base) * 60);
        }

        .footer-input {
          flex: 1 1 auto;
          min-height: calc(var(--space-base) * 10);
          border: 1px solid transparent;
          border-right: 0;
          border-radius: var(--radius-sm) 0 0 var(--radius-sm);
          background: var(--color-surface);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 4);
          font-weight: 500;
          line-height: 1;
          padding:
            calc(var(--space-base) * 3)
            calc(var(--space-base) * 4);
          outline: none;
          transition:
            border-color var(--transition-fast) var(--ease-standard),
            box-shadow var(--transition-fast) var(--ease-standard);
        }

        .footer-input::placeholder {
          color: color-mix(in srgb, var(--color-text-muted) 68%, var(--color-surface) 32%);
        }

        .footer-input:focus {
          border-color: color-mix(in srgb, var(--color-accent) 22%, var(--color-border) 78%);
          box-shadow: inset 0 0 0 1px
            color-mix(in srgb, var(--color-accent) 18%, transparent 82%);
        }

        .footer-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: calc(var(--space-base) * 11);
          min-height: calc(var(--space-base) * 10);
          border: 1px solid transparent;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          background: var(--color-accent);
          color: var(--color-surface);
          cursor: pointer;
          transition:
            background var(--transition-fast) var(--ease-standard),
            transform var(--transition-fast) var(--ease-standard);
        }

        .footer-submit:hover,
        .footer-submit:focus-visible {
          background: var(--color-accent-2);
          transform: translateX(calc(var(--space-base) * 0.25));
        }

        .footer-submit-icon {
          width: calc(var(--space-base) * 4);
          height: calc(var(--space-base) * 4);
        }

        .footer-legal {
          margin-top: calc(var(--space-base) * 12);
          padding-top: calc(var(--space-base) * 6);
          border-top: 1px solid color-mix(in srgb, var(--color-border) 22%, transparent 78%);
        }

        .footer-legal p {
          margin: 0;
          color: color-mix(in srgb, var(--color-text-muted) 78%, var(--color-text-primary) 22%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 3.5);
          font-weight: 500;
          line-height: 1.5;
        }

        .footer-link:focus-visible,
        .footer-input:focus-visible,
        .footer-submit:focus-visible {
          outline: 1px solid var(--color-accent);
          outline-offset: calc(var(--space-base) * 1);
        }

        @media (max-width: 64rem) {
          .footer-grid,
          .footer-legal {
            padding-inline: calc(var(--space-base) * 8);
          }

          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: calc(var(--space-base) * 10);
          }
        }

        @media (max-width: 48rem) {
          .footer-shell {
            padding-top: calc(var(--space-base) * 12);
            padding-bottom: calc(var(--space-base) * 8);
          }

          .footer-grid,
          .footer-legal {
            padding-inline: calc(var(--space-base) * 5);
          }

          .footer-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: calc(var(--space-base) * 8);
          }

          .footer-form {
            max-width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-link,
          .footer-input,
          .footer-submit {
            transition-duration: 0ms;
          }
        }
      `}</style>
    </footer>
  );
}
