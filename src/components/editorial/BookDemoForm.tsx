"use client";

import { useState } from "react";

const REPORTING_NEEDS = [
  "TCFD Reporting",
  "SEC Compliance",
  "GHG Protocol",
  "Internal Audit",
] as const;

type FormState = {
  company: string;
  email: string;
  fullName: string;
  offsetGoal: string;
  reportingNeeds: string[];
};

const INITIAL_STATE: FormState = {
  company: "",
  email: "",
  fullName: "",
  offsetGoal: "",
  reportingNeeds: [],
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function BookDemoForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (field: keyof Omit<FormState, "reportingNeeds">, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleReportingNeedChange = (need: string, checked: boolean) => {
    setFormState((current) => ({
      ...current,
      reportingNeeds: checked
        ? [...current.reportingNeeds, need]
        : current.reportingNeeds.filter((item) => item !== need),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formState.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!formState.email.trim()) {
      nextErrors.email = "Work email is required.";
    } else if (!isValidEmail(formState.email)) {
      nextErrors.email = "Enter a valid work email.";
    }

    if (!formState.company.trim()) {
      nextErrors.company = "Company name is required.";
    }

    if (!formState.offsetGoal) {
      nextErrors.offsetGoal = "Select an annual offset goal.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="inline-flex rounded-sm border border-[color:color-mix(in_srgb,var(--color-highlight)_35%,var(--color-text-strong)_10%)] bg-[var(--color-highlight)] px-3 py-1">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#5b4300]">
            Demo Request Logged
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-text-strong)]">
            Your compliance walkthrough is ready.
          </h3>
          <p className="max-w-lg text-sm leading-relaxed text-[var(--color-text-muted)]">
            We captured your request for {formState.company}. For the demo build,
            this simulates the handoff to CarbonRoot&apos;s enterprise solutions
            team and confirms the workflow is functioning end to end.
          </p>
        </div>

        <div className="grid gap-4 rounded-xl bg-[var(--color-surface-alt)] p-5 text-sm text-[var(--color-text-primary)]">
          <p>
            <strong>Contact:</strong> {formState.fullName}
          </p>
          <p>
            <strong>Email:</strong> {formState.email}
          </p>
          <p>
            <strong>Volume Range:</strong> {formState.offsetGoal}
          </p>
          <p>
            <strong>Reporting Needs:</strong>{" "}
            {formState.reportingNeeds.length > 0
              ? formState.reportingNeeds.join(", ")
              : "To be confirmed during the demo"}
          </p>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
          <p>
            CarbonRoot uses this information solely to prepare your enterprise demo
            and scope compliance reporting requirements.
          </p>
          <button
            className="inline-flex rounded-lg border border-[color:color-mix(in_srgb,var(--color-border)_70%,transparent)] px-4 py-3 font-[var(--font-display)] text-[0.75rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-strong)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            onClick={() => {
              setSubmitted(false);
              setFormState(INITIAL_STATE);
              setErrors({});
            }}
            type="button"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-8" noValidate onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
            Full Name
          </span>
          <input
            className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
            onChange={(event) => handleFieldChange("fullName", event.target.value)}
            placeholder="John Doe"
            type="text"
            value={formState.fullName}
          />
          {errors.fullName ? (
            <span className="mt-2 block text-xs text-[#8b2f2f]">{errors.fullName}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
            Work Email
          </span>
          <input
            className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
            onChange={(event) => handleFieldChange("email", event.target.value)}
            placeholder="j.doe@enterprise.com"
            type="email"
            value={formState.email}
          />
          {errors.email ? (
            <span className="mt-2 block text-xs text-[#8b2f2f]">{errors.email}</span>
          ) : null}
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
          Company Name
        </span>
        <input
          className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
          onChange={(event) => handleFieldChange("company", event.target.value)}
          placeholder="Acme Global Corp"
          type="text"
          value={formState.company}
        />
        {errors.company ? (
          <span className="mt-2 block text-xs text-[#8b2f2f]">{errors.company}</span>
        ) : null}
      </label>

      <label className="block">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
          Annual Offset Goal (MTCO2e)
        </span>
        <select
          className="w-full border-0 border-b-2 border-[color:color-mix(in_srgb,var(--color-accent)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--color-border)_35%,white)] px-0 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
          onChange={(event) => handleFieldChange("offsetGoal", event.target.value)}
          value={formState.offsetGoal}
        >
          <option value="">Select volume range...</option>
          <option>1,000 - 5,000 MT</option>
          <option>5,000 - 25,000 MT</option>
          <option>25,000 - 100,000 MT</option>
          <option>100,000+ MT</option>
        </select>
        {errors.offsetGoal ? (
          <span className="mt-2 block text-xs text-[#8b2f2f]">{errors.offsetGoal}</span>
        ) : null}
      </label>

      <div>
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-strong)]">
          Reporting Needs
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {REPORTING_NEEDS.map((need) => (
            <label
              className="flex cursor-pointer items-center gap-3 rounded-lg bg-[var(--color-surface-alt)] p-3 transition-colors hover:bg-[var(--color-surface-elevated)]"
              key={need}
            >
              <input
                checked={formState.reportingNeeds.includes(need)}
                className="h-4 w-4 rounded-sm border-[var(--color-border)] text-[var(--color-accent)]"
                onChange={(event) => handleReportingNeedChange(need, event.target.checked)}
                type="checkbox"
              />
              <span className="text-xs font-medium text-[var(--color-text-primary)]">
                {need}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(145deg,var(--color-accent)_0%,var(--color-accent-2)_100%)] px-6 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-px active:scale-[0.99]"
          style={{ boxShadow: "var(--shadow-subtle)" }}
          type="submit"
        >
          Book a Compliance Demo
        </button>

        <p className="text-center text-[11px] leading-relaxed text-[var(--color-text-muted)]">
          By submitting this request, you authorize CarbonRoot to use the information
          above to schedule an enterprise walkthrough and prepare compliance-relevant
          materials. No data is shared externally.
        </p>
      </div>
    </form>
  );
}
