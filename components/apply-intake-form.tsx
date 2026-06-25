"use client";

import { useState } from "react";

const pathwayOptions = [
  "Public listing",
  "Independent review",
  "Accreditation",
  "Assessor",
  "Framework recognition",
];

export function ApplyIntakeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/trios/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        organization: formData.get("organization"),
        pathway: formData.get("pathway"),
        targetSlug: formData.get("targetSlug"),
        message: formData.get("message"),
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setMessage(body?.error ?? "The intake could not be submitted.");
      return;
    }

    event.currentTarget.reset();
    setStatus("success");
    setMessage("Your intake is in TRIOS. The next step is review and pathway fit.");
  }

  return (
    <form className="trust-intake-form" onSubmit={handleSubmit}>
      <div className="form-grid-two">
        <label>
          <span>Your name</span>
          <input name="name" required type="text" placeholder="Jane Doe" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" required type="email" placeholder="jane@example.com" />
        </label>
      </div>
      <div className="form-grid-two">
        <label>
          <span>Organization or project</span>
          <input name="organization" type="text" placeholder="Project name" />
        </label>
        <label>
          <span>Pathway</span>
          <select name="pathway" defaultValue="Independent review">
            {pathwayOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>Existing listing slug, if any</span>
        <input name="targetSlug" type="text" placeholder="buurtzorg, sociocracy, your-project" />
      </label>
      <label>
        <span>What are you trying to do?</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Claim a listing, request review, correct a profile, or ask which path fits."
        />
      </label>
      <button className="btn btn-primary" disabled={status === "loading"} type="submit">
        {status === "loading" ? "Submitting..." : "Send to TRIOS intake"}
      </button>
      {message && <p className={`form-status ${status === "error" ? "error" : "success"}`}>{message}</p>}
    </form>
  );
}
