import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ScrollOrchestrator } from "@/components/layout/ScrollOrchestrator";

type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text-primary)",
        minHeight: "100vh",
      }}
    >
      <ScrollOrchestrator />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
