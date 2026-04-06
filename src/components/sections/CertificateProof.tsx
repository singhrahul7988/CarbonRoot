"use client";

import { useDemoNavigation } from "@/components/demo/useDemoNavigation";

export function CertificateProof() {
  const { openCertificate } = useDemoNavigation();

  return (
    <section
      className="certificate-section"
      data-scroll-section="true"
      data-scroll-section-id="certificate-proof"
      id="certificate-proof"
    >
      <div className="certificate-shell">
        <div className="certificate-intro">
          <h2 className="certificate-title">Proof your auditor can follow</h2>
          <p className="certificate-subtitle">
            Every retirement creates a certificate with the project, volume, and
            ledger reference tied together in one record.
          </p>
        </div>

        <div className="certificate-stage">
          <div className="certificate-glow" aria-hidden="true" />

          <article className="certificate-card">
            <div className="certificate-watermark" aria-hidden="true">
              <svg
                className="certificate-watermark-svg"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0 100 Q 25 0 50 100 Q 75 0 100 100"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="0.1"
                />
              </svg>
            </div>

            <div className="certificate-grid">
              <div className="certificate-content">
                <div className="certificate-heading-block">
                  <h3 className="certificate-heading">Certificate of Retirement</h3>
                  <p className="certificate-ref">Ref ID: CR-8839-2024-X</p>
                </div>

                <div className="certificate-fields">
                  <div className="certificate-field">
                    <span className="certificate-field-label">Beneficiary</span>
                    <span className="certificate-field-value">
                      Global Logistics Corp
                    </span>
                  </div>

                  <div className="certificate-field">
                    <span className="certificate-field-label">Impact Volume</span>
                    <span className="certificate-field-value">25,000 mtCO2e</span>
                  </div>

                  <div className="certificate-field">
                    <span className="certificate-field-label">Vintage Period</span>
                    <span className="certificate-field-value">
                      Jan 2023 - Dec 2023
                    </span>
                  </div>

                  <div className="certificate-seal-block">
                    <span className="certificate-seal">
                      <span aria-hidden="true" className="certificate-seal-mark">
                        CR
                      </span>
                    </span>

                    <div className="certificate-seal-copy">
                      <span className="certificate-field-label certificate-field-label-tight">
                        Authenticated by
                      </span>
                      <span className="certificate-seal-value">CarbonRoot Audits</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="certificate-verify"
                onClick={() => openCertificate()}
                type="button"
              >
                <div className="certificate-qr-shell" aria-hidden="true">
                  <div className="certificate-qr-grid">
                    <span className="certificate-qr-cell certificate-qr-cell-bright" />
                    <span className="certificate-qr-cell" />
                    <span className="certificate-qr-cell certificate-qr-cell-bright" />
                    <span className="certificate-qr-cell" />
                    <span className="certificate-qr-cell certificate-qr-cell-bright" />
                    <span className="certificate-qr-cell" />
                    <span className="certificate-qr-cell certificate-qr-cell-bright" />
                    <span className="certificate-qr-cell" />
                    <span className="certificate-qr-cell certificate-qr-cell-bright" />
                  </div>
                </div>

                <div className="certificate-verify-copy">
                  <span className="certificate-verify-label">Verify on Ledger</span>
                  <span className="certificate-verify-rule" aria-hidden="true" />
                </div>
              </button>
            </div>
          </article>
        </div>
      </div>

      <style jsx>{`
        .certificate-section {
          background: var(--color-surface);
          overflow: hidden;
          padding:
            calc(var(--space-base) * 18)
            calc(var(--space-base) * 12)
            calc(var(--space-base) * 18);
        }

        .certificate-shell {
          width: min(100%, calc(var(--space-base) * 360));
          margin: 0 auto;
        }

        .certificate-intro {
          max-width: calc(var(--space-base) * 150);
          margin: 0 auto calc(var(--space-base) * 14);
          text-align: center;
        }

        .certificate-title {
          margin: 0 0 calc(var(--space-base) * 6);
          color: var(--color-text-strong);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 12), 4.8vw, calc(var(--space-base) * 16));
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * -0.4);
          line-height: 1.04;
          text-wrap: balance;
        }

        .certificate-subtitle {
          margin: 0;
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: clamp(calc(var(--space-base) * 5), 2vw, calc(var(--space-base) * 6));
          font-weight: 500;
          line-height: 1.55;
        }

        .certificate-stage {
          position: relative;
          max-width: calc(var(--space-base) * 260);
          margin: 0 auto;
        }

        .certificate-glow {
          position: absolute;
          inset: calc(var(--space-base) * 10) calc(var(--space-base) * 20)
            calc(var(--space-base) * -8);
          border-radius: 999px;
          background: color-mix(in srgb, var(--color-highlight) 14%, transparent 86%);
          filter: blur(calc(var(--space-base) * 30));
          transform: scale(1.08);
          z-index: 0;
        }

        .certificate-card {
          position: relative;
          z-index: 1;
          overflow: hidden;
          padding: calc(var(--space-base) * 12) calc(var(--space-base) * 16);
          border: 1px solid
            color-mix(in srgb, var(--color-border) 18%, var(--color-accent) 82%);
          border-radius: var(--radius-xl);
          background: var(--color-accent);
          box-shadow: var(--shadow-lifted);
        }

        .certificate-watermark {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          color: var(--color-surface);
          pointer-events: none;
        }

        .certificate-watermark-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .certificate-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) calc(var(--space-base) * 38);
          align-items: start;
          gap: calc(var(--space-base) * 12);
        }

        .certificate-content {
          display: grid;
          gap: calc(var(--space-base) * 12);
        }

        .certificate-heading-block {
          display: grid;
          gap: calc(var(--space-base) * 2);
        }

        .certificate-heading {
          margin: 0;
          color: var(--color-surface);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 10), 3.5vw, calc(var(--space-base) * 14));
          font-weight: 700;
          letter-spacing: calc(var(--space-base) * -0.28);
          line-height: 1.08;
        }

        .certificate-ref {
          margin: 0;
          color: color-mix(in srgb, var(--color-highlight) 34%, var(--color-surface) 66%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 3.5);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.32);
          line-height: 1;
          text-transform: uppercase;
        }

        .certificate-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap:
            calc(var(--space-base) * 10)
            calc(var(--space-base) * 12);
          align-items: end;
        }

        .certificate-field,
        .certificate-seal-block {
          display: grid;
          gap: calc(var(--space-base) * 3);
        }

        .certificate-field-label {
          color: color-mix(in srgb, var(--color-highlight) 22%, var(--color-surface) 78%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 2.5);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.46);
          line-height: 1;
          text-transform: uppercase;
        }

        .certificate-field-label-tight {
          font-size: calc(var(--space-base) * 2);
          letter-spacing: calc(var(--space-base) * 0.22);
        }

        .certificate-field-value {
          color: var(--color-surface);
          font-family: var(--font-display);
          font-size: clamp(calc(var(--space-base) * 7), 2.2vw, calc(var(--space-base) * 8));
          font-weight: 700;
          letter-spacing: calc(var(--space-base) * -0.12);
          line-height: 1.2;
        }

        .certificate-seal-block {
          display: flex;
          align-items: center;
          gap: calc(var(--space-base) * 4);
        }

        .certificate-seal {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: calc(var(--space-base) * 10);
          height: calc(var(--space-base) * 10);
          border-radius: var(--radius-md);
          background: color-mix(in srgb, var(--color-highlight) 20%, var(--color-surface) 80%);
          flex: 0 0 auto;
        }

        .certificate-seal-mark {
          color: var(--color-accent);
          font-family: var(--font-display);
          font-size: calc(var(--space-base) * 3.5);
          font-weight: 900;
          letter-spacing: calc(var(--space-base) * 0.12);
        }

        .certificate-seal-copy {
          display: grid;
          gap: calc(var(--space-base) * 1.5);
        }

        .certificate-seal-value {
          color: var(--color-surface);
          font-family: var(--font-display);
          font-size: calc(var(--space-base) * 3.5);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * -0.08);
          line-height: 1.1;
        }

        .certificate-verify {
          display: grid;
          justify-items: center;
          gap: calc(var(--space-base) * 6);
          align-content: start;
          border: 0;
          background: transparent;
          cursor: pointer;
          padding: 0;
          text-align: center;
        }

        .certificate-qr-shell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: calc(var(--space-base) * 32);
          height: calc(var(--space-base) * 32);
          padding: calc(var(--space-base) * 3);
          border: 1px solid color-mix(in srgb, var(--color-surface) 16%, transparent 84%);
          border-radius: var(--radius-lg);
          background: color-mix(in srgb, var(--color-surface) 4%, transparent 96%);
        }

        .certificate-qr-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          width: 100%;
          height: 100%;
          gap: calc(var(--space-base) * 1);
          padding: calc(var(--space-base) * 1);
          border: 1px solid color-mix(in srgb, var(--color-surface) 18%, transparent 82%);
          border-radius: var(--radius-sm);
        }

        .certificate-qr-cell {
          border-radius: calc(var(--space-base) * 0.75);
          background: color-mix(in srgb, var(--color-surface) 10%, transparent 90%);
        }

        .certificate-qr-cell-bright {
          background: color-mix(in srgb, var(--color-surface) 52%, transparent 48%);
        }

        .certificate-verify-copy {
          display: grid;
          justify-items: center;
          gap: calc(var(--space-base) * 2);
        }

        .certificate-verify-label {
          color: color-mix(in srgb, var(--color-highlight) 34%, var(--color-surface) 66%);
          font-family: var(--font-body);
          font-size: calc(var(--space-base) * 2.5);
          font-weight: 800;
          letter-spacing: calc(var(--space-base) * 0.34);
          line-height: 1;
          text-transform: uppercase;
        }

        .certificate-verify-rule {
          display: block;
          width: calc(var(--space-base) * 18);
          height: 1px;
          background: color-mix(in srgb, var(--color-highlight) 26%, var(--color-surface) 74%);
          opacity: 0.58;
        }

        @media (max-width: 64rem) {
          .certificate-section {
            padding-inline: calc(var(--space-base) * 8);
          }

          .certificate-card {
            padding: calc(var(--space-base) * 10) calc(var(--space-base) * 12);
          }

          .certificate-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: calc(var(--space-base) * 10);
          }

          .certificate-verify {
            justify-items: start;
            text-align: left;
          }

          .certificate-verify-copy {
            justify-items: start;
          }
        }

        @media (max-width: 48rem) {
          .certificate-section {
            padding:
              calc(var(--space-base) * 14)
              calc(var(--space-base) * 5)
              calc(var(--space-base) * 14);
          }

          .certificate-intro {
            margin-bottom: calc(var(--space-base) * 10);
          }

          .certificate-card {
            padding: calc(var(--space-base) * 8);
          }

          .certificate-fields {
            grid-template-columns: minmax(0, 1fr);
            gap: calc(var(--space-base) * 8);
          }

          .certificate-heading {
            font-size: calc(var(--space-base) * 10);
          }

          .certificate-ref {
            font-size: calc(var(--space-base) * 3);
            line-height: 1.4;
          }

          .certificate-qr-shell {
            width: calc(var(--space-base) * 28);
            height: calc(var(--space-base) * 28);
          }
        }
      `}</style>
    </section>
  );
}
