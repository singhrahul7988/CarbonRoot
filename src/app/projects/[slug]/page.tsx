import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { PROJECTS_BY_SLUG } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_BY_SLUG[slug];

  if (!project) {
    return {
      title: "Project Not Found | CarbonRoot",
    };
  }

  return {
    title: `${project.title} | CarbonRoot`,
    description: `Project detail view for CarbonRoot's ${project.title} supply.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS_BY_SLUG[slug];

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
