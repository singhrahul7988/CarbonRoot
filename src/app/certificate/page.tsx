import type { Metadata } from "next";

import { CertificateExperience } from "@/components/demo/CertificateExperience";
import { PROJECTS_BY_SLUG } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Certificate | CarbonRoot",
  description: "Standalone CarbonRoot retirement certificate demo.",
};

type CertificatePageProps = {
  searchParams: Promise<{
    amount?: string;
    fee?: string;
    mode?: string;
    project?: string;
    approvalHash?: string;
    purchaseHash?: string;
    retirementHash?: string;
  }>;
};

export default async function CertificatePage({
  searchParams,
}: CertificatePageProps) {
  const params = await searchParams;
  const parsedAmount = Number.parseFloat(params.amount ?? "500");
  const parsedFee = Number.parseFloat(params.fee ?? "0");
  const projectSlug = params.project && PROJECTS_BY_SLUG[params.project]
    ? params.project
    : "luangwa-valley";

  return (
    <CertificateExperience
      amount={Number.isFinite(parsedAmount) ? parsedAmount : 500}
      fee={Number.isFinite(parsedFee) ? parsedFee : 0}
      mode={params.mode === "compliance" ? "compliance" : "marketplace"}
      projectSlug={projectSlug}
      approvalHash={params.approvalHash}
      purchaseHash={params.purchaseHash}
      retirementHash={params.retirementHash}
    />
  );
}
