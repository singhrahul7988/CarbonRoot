"use client";

import { useState } from "react";

type SubmissionState = {
  projectName: string;
  projectType: string;
  gpsCoordinates: string;
  registryStandard: string;
  proofUrl: string;
};

const INITIAL_STATE: SubmissionState = {
  projectName: "",
  projectType: "",
  gpsCoordinates: "",
  registryStandard: "",
  proofUrl: "",
};

export function ProjectSubmissionForm() {
  const [formState, setFormState] = useState<SubmissionState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof SubmissionState, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="inline-flex rounded-sm border border-[color:color-mix(in_srgb,var(--color-highlight)_35%,var(--color-text-strong)_10%)] bg-[var(--color-highlight)] px-3 py-1">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#5b4300]">
            Submission Logged
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-text-strong)]">
            Project intake captured.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
            This MVP flow records the submission details needed for manual admin review,
            mock verification, and the first minting step in the demo.
          </p>
        </div>

        <div className="grid gap-3 rounded-2xl bg-[var(--color-surface-alt)] p-5 text-sm text-[var(--color-text-primary)]">
          <p>
            <strong>Project:</strong> {formState.projectName}
          </p>
          <p>
            <strong>Type:</strong> {formState.projectType}
          </p>
          <p>
            <strong>GPS:</strong> {formState.gpsCoordinates}
          </p>
          <p>
            <strong>Standard:</strong> {formState.registryStandard}
          </p>
          <p className="break-all">
            <strong>Proof URL:</strong> {formState.proofUrl}
          </p>
        </div>

        <button
          className="inline-flex rounded-lg border border-[color:color-mix(in_srgb,var(--color-border)_70%,transparent)] px-4 py-3 font-[var(--font-display)] text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-strong)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          onClick={() => {
            setSubmitted(false);
            setFormState(INITIAL_STATE);
          }}
          type="button"
        >
          Submit Another Project
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-8" noValidate onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
            Project Name
          </span>
          <input
            className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
            onChange={(event) => updateField("projectName", event.target.value)}
            placeholder="Luangwa Valley Reforestation"
            type="text"
            value={formState.projectName}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
            Project Type
          </span>
          <select
            className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
            onChange={(event) => updateField("projectType", event.target.value)}
            value={formState.projectType}
          >
            <option value="">Select project type...</option>
            <option>Reforestation</option>
            <option>Afforestation</option>
            <option>Blue Carbon</option>
            <option>Clean Cookstoves</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
            GPS Coordinates
          </span>
          <input
            className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
            onChange={(event) => updateField("gpsCoordinates", event.target.value)}
            placeholder="-13.1234, 31.9981"
            type="text"
            value={formState.gpsCoordinates}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
            Registry Standard
          </span>
          <select
            className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
            onChange={(event) => updateField("registryStandard", event.target.value)}
            value={formState.registryStandard}
          >
            <option value="">Select registry...</option>
            <option>Verra VCS</option>
            <option>Gold Standard</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
          Proof Document URL
        </span>
        <input
          className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
          onChange={(event) => updateField("proofUrl", event.target.value)}
          placeholder="https://..."
          type="url"
          value={formState.proofUrl}
        />
      </label>

      <div className="space-y-4 pt-6">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(145deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-6 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-px active:scale-[0.99]"
          style={{ boxShadow: "var(--shadow-subtle)" }}
          type="submit"
        >
          Submit Project For Review
        </button>

        <p className="text-center text-[11px] leading-relaxed text-[var(--color-text-muted)]">
          For the MVP, project verification and approval remain manual after form submission.
        </p>
      </div>
    </form>
  );
}
