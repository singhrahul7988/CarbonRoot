"use client";

import { useRouter } from "next/navigation";

type DemoMode = "marketplace" | "compliance";

export function useDemoNavigation() {
  const router = useRouter();

  return {
    openBuyOffset(mode: DemoMode = "marketplace") {
      router.push(`/buy-offset?mode=${mode}`);
    },
    openBookDemo() {
      router.push("/book-demo");
    },
    openCertificate(amount = 500) {
      router.push(`/certificate?amount=${amount}&project=luangwa-valley&mode=marketplace`);
    },
    openProjectDetails() {
      router.push("/projects/luangwa-valley");
    },
  };
}
