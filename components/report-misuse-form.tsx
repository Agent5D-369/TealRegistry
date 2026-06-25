"use client";

import { useState } from "react";

export function ReportMisuseForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/trios/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        badgeId: formData.get("badgeId"),
        claimUrl: formData.get("claimUrl"),
        description: formData.get("description"),
        evidence: formData.get("evidence"),
        contact: formData.get("contact"),
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setMessage(body?.error ?? "The report could not be submitted.");
      return;
    }

    event.currentTarget.reset();
    setStatus("success");
    setMessage("Your report is in TRIOS. A reviewer will triage it for public trust impact.");
  }

  return (
    <form className="trust-intake-form" onSubmit={handleSubmit}>
      <label>
        <span>Badge ID, profile name, or listing link</span>
        <input name="badgeId" required type="text" placeholder="TR-2026-001 or organization name" />
      </label>
      <label>
        <span>Where is the claim being used?</span>
        <input name="claimUrl" required type="url" placeholder="https://example.com/page" />
      </label>
      <label>
        <span>What seems inaccurate or misleading?</span>
        <textarea
          name="description"
          required
          rows={5}
          placeholder="Explain the concern in plain language. Include what someone might misunderstand."
        />
      </label>
      <label>
        <span>Evidence or screenshots</span>
        <textarea name="evidence" rows={3} placeholder="Links, notes, dates, or screenshot descriptions." />
      </label>
      <label>
        <span>Your email, optional</span>
        <input name="contact" type="email" placeholder="you@example.com" />
      </label>
      <button className="btn btn-primary" disabled={status === "loading"} type="submit">
        {status === "loading" ? "Submitting..." : "Submit misuse report"}
      </button>
      {message && <p className={`form-status ${status === "error" ? "error" : "success"}`}>{message}</p>}
    </form>
  );
}
