export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  badge: string;
  tokenId: number;
  price: string;
  unitPriceUsd: number;
  volume: string;
  availableCredits: number;
  image: string;
  location: string;
  projectId: string;
  standard: string;
  vintage: string;
  status: string;
  description: string;
  narrative: string;
  metrics: ProjectMetric[];
  verifications: string[];
};

export const SUPPLY_PROJECTS: ProjectDetail[] = [
  {
    slug: "luangwa-valley",
    title: "Luangwa Valley Reforestation",
    badge: "Verra Verified",
    tokenId: 492,
    price: "$24.50",
    unitPriceUsd: 24.5,
    volume: "145k",
    availableCredits: 145000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsPFli5J4yglUy93ivfqJjuigmfKKFU0YOPz9n3CczBk-JAAuyWo220DCIjzuyWXpW6cq8e35O3FVTBiNVe6ww4woQavK5Eaz9u-Hp0EBNA4bARnyFsnqhBDGzjPPrFB-iyQusTEPqbEtb6JX4bcsS6OmaLR8Xv8ZqbdW4tONWoJBQ48JrKairedejFH-ffJGuy2G-JQ3GULaUQQKOa1X67m9cry14HIL9VOQO_8XwPqVYDy93e5Fh22U_zQBBlkjpNkHIwsb2nf8",
    location: "Zambia, Africa",
    projectId: "CR-ZMB-0492",
    standard: "Verra VCS + CCB",
    vintage: "2022 - 2023",
    status: "Active",
    description:
      "A flagship 120,000-hectare regeneration corridor combining carbon capture, watershed protection, and biodiversity restoration under rigorous community-first governance.",
    narrative:
      "The Luangwa Valley project gives CarbonRoot a concrete proof object: measurable removals, documented co-benefits, a named registry standard, and an auditable route from supply through retirement.",
    metrics: [
      { label: "Impact Capacity", value: "2.4M tCO2e / yr" },
      { label: "Project Area", value: "120,000 hectares" },
      { label: "Biodiversity Score", value: "9.8 / 10" },
      { label: "Livelihood Reach", value: "450 local families" },
    ],
    verifications: [
      "Verra VCS issuance with current active supply tracking",
      "CCB-certified biodiversity and community co-benefits",
      "Satellite monitoring paired with field verification protocols",
      "Ledger-ready retirement proof with auditable transaction history",
    ],
  },
  {
    slug: "amazonian-canopy-shield",
    title: "Amazonian Canopy Shield",
    badge: "Gold Standard",
    tokenId: 1184,
    price: "$31.20",
    unitPriceUsd: 31.2,
    volume: "82k",
    availableCredits: 82000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Pc_WzZ1XWnUq7NAtxPNjWEXGglrGh7rXdfcj3BXBPNVeeLjq3jBRIOjxiObPcKjEzRZWlZzeJdHYzThrgpwIFkBwV_n3oLFNUgjw3RZFkAJUudAvL92H6w5vVTvPbmC3qgAxR5auVCV8HpZScKXZXe3kJwtwSJf7JeEZdkcCii9SFTAC4BAcyFeF2X552SbPKWWu-keNk-zZEbPEJ0u92LvOhft_3ykC0RbZgMCdA-oMlDAMC51uR512NpIPoPVmHzOxLAAjG3s",
    location: "Brazil, Para",
    projectId: "CR-BRA-1184",
    standard: "Gold Standard",
    vintage: "2021 - 2023",
    status: "Active",
    description:
      "A forest-protection program preserving intact Amazonian canopy, with remote sensing controls and community enforcement to prevent leakage across neighboring parcels.",
    narrative:
      "Amazonian Canopy Shield demonstrates how CarbonRoot can package avoided-deforestation supply into an institutional procurement workflow without sacrificing traceability or registry rigor.",
    metrics: [
      { label: "Impact Capacity", value: "1.7M tCO2e / yr" },
      { label: "Protected Area", value: "86,000 hectares" },
      { label: "Biodiversity Score", value: "9.5 / 10" },
      { label: "Community Reach", value: "320 local stewards" },
    ],
    verifications: [
      "Gold Standard registry mapping and issuance reconciliation",
      "Parcel-level canopy monitoring with recurring satellite review",
      "Community-led patrol reporting and leakage controls",
      "Retirement-ready documentation for enterprise audit teams",
    ],
  },
  {
    slug: "oceanic-mangrove-initiative",
    title: "Oceanic Mangrove Initiative",
    badge: "Featured Opportunity",
    tokenId: 3301,
    price: "$42.00",
    unitPriceUsd: 42,
    volume: "58k",
    availableCredits: 58000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAL7sWEKyjeW4-84G4mvAOToSmbbkryyITpGNIhaJNS08fXfqxWDnyX_xaY5gI_c0bZeg5LzSdaUPVPZ6oQfQN6U8Kc_hR1v2AOkBiFUxHl6CmWrHy0_QgIDjKWFQwEl09GY-FMS27yZVmZ2yU0jSIdPDYZmFT2lWUvgxyYFrKvXTloA_bwg9Q7ZbvMOIqoDFtjNVYspwoc_BnjttieWoH_qIv2_bjSU09BfP92G4roJaTzhmpmaCzedZF0jcGbf74ZQdouGFVxw90",
    location: "Indonesia, Sulawesi",
    projectId: "CR-IDN-3301",
    standard: "Verra VCS Blue Carbon",
    vintage: "2023",
    status: "Featured",
    description:
      "A strategic blue-carbon initiative restoring 12,000 hectares of mangrove coastline to lock in durable removals while strengthening fisheries and storm resilience.",
    narrative:
      "Oceanic Mangrove Initiative gives the demo a premium supply example with strong project economics, measurable co-benefits, and a clean story for buyers comparing project types.",
    metrics: [
      { label: "Impact Capacity", value: "0.9M tCO2e / yr" },
      { label: "Restoration Zone", value: "12,000 hectares" },
      { label: "Biodiversity Score", value: "9.7 / 10" },
      { label: "Coastal Reach", value: "58 villages" },
    ],
    verifications: [
      "Blue-carbon methodology alignment with Verra VCS documentation",
      "Tidal and biomass monitoring with recurring geospatial sampling",
      "Community stewardship and fisheries resilience reporting",
      "Clear retirement provenance for enterprise procurement teams",
    ],
  },
];

export const PROJECTS_BY_SLUG = Object.fromEntries(
  SUPPLY_PROJECTS.map((project) => [project.slug, project]),
) as Record<string, ProjectDetail>;
