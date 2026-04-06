import type { Metadata } from "next";

import { BuyOffsetExperience } from "@/components/demo/BuyOffsetExperience";
import { PROJECTS_BY_SLUG } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Buy Offset | CarbonRoot",
  description: "Standalone CarbonRoot offset retirement flow demo.",
};

type BuyOffsetPageProps = {
  searchParams: Promise<{
    amount?: string;
    mode?: string;
    project?: string;
  }>;
};

export default async function BuyOffsetPage({ searchParams }: BuyOffsetPageProps) {
  const params = await searchParams;
  const parsedAmount = Number.parseInt(params.amount ?? "500", 10);
  const initialAmount = Number.isFinite(parsedAmount) ? parsedAmount : 500;
  const initialMode = params.mode === "compliance" ? "compliance" : "marketplace";
  const initialProjectSlug = params.project && PROJECTS_BY_SLUG[params.project]
    ? params.project
    : "luangwa-valley";

  return (
    <BuyOffsetExperience
      initialAmount={initialAmount}
      initialMode={initialMode}
      initialProjectSlug={initialProjectSlug}
    />
  );
}
