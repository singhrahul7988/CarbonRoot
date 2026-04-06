"use client";

import Link from "next/link";
import { Download, ChevronLeft } from "lucide-react";

export function ComplianceReportActions() {
  return (
    <div className="print:hidden">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-5 pt-28 sm:flex-row sm:items-center sm:justify-between sm:px-8 xl:px-12">
        <Link
          className="inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-strong)] transition-opacity hover:opacity-75"
          href="/compliance"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Compliance
        </Link>

        <button
          className="inline-flex items-center justify-center gap-3 rounded-lg bg-[linear-gradient(145deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-6 py-3 font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-px active:scale-[0.99]"
          onClick={() => window.print()}
          type="button"
        >
          <Download className="h-4 w-4" />
          Export Branded PDF
        </button>
      </div>
    </div>
  );
}
