import { PageWrapper } from "@/components/layout/PageWrapper";
import { BrokerageComparison } from "@/components/sections/BrokerageComparison";
import { CertificateProof } from "@/components/sections/CertificateProof";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { ProjectHighlight } from "@/components/sections/ProjectHighlight";
import { Solutions } from "@/components/sections/Solutions";
import { StandardsStrip } from "@/components/sections/StandardsStrip";

export default function Home() {
  return (
    <PageWrapper>
      <main id="top">
        <Hero />
        <BrokerageComparison />
        <StandardsStrip />
        <Solutions />
        <FeatureGrid />
        <CertificateProof />
        <ProjectHighlight />
        <FinalCTA />
      </main>
    </PageWrapper>
  );
}
