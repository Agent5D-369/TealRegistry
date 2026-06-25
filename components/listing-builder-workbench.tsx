"use client";

import { useMemo, useState } from "react";
import { targetSeedCategories } from "@/data/listing-builder";

type Draft = {
  slug: string;
  summary: string;
  tagline: string;
  highlights: string[];
  tealSignals: Array<{ title: string; summary: string }>;
  seoTitle: string;
  seoDescription: string;
  questions: Array<{ question: string; answer: string }>;
  sourceNotes: string[];
  mediaPolicy: string;
};

const categoryOptions = targetSeedCategories.map((item) => item.category);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sentence(value: FormDataEntryValue | null, fallback: string) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function splitLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildDraft(formData: FormData): Draft {
  const targetName = sentence(formData.get("targetName"), "Unnamed target");
  const category = sentence(formData.get("targetCategory"), "Intentional communities");
  const location = sentence(formData.get("location"), "their region");
  const publicClaims = sentence(
    formData.get("publicClaims"),
    "publicly visible regenerative, community, self-management, or purpose-led work",
  );
  const dreamAudience = sentence(
    formData.get("dreamAudience"),
    "funders, partners, candidates, members, and researchers",
  );
  const ownerNextStep = sentence(
    formData.get("ownerNextStep"),
    "claim the page, correct facts, add approved source material, and decide whether to request review",
  );

  return {
    slug: slugify(targetName),
    tagline: `${targetName} profile for people comparing credible Teal, regenerative, and self-organizing work.`,
    summary: `${targetName} is a starter ${category.toLowerCase()} profile connected to ${publicClaims}. This page is designed for ${dreamAudience} who need a clear, useful view of what is known, what is not verified, and what the organization can do next.`,
    highlights: [
      `Publicly associated with ${publicClaims}`,
      `Relevant to people researching ${category.toLowerCase()} in ${location}`,
      "Structured for human readers, search engines, answer engines, and owner claim conversion",
      "Clear boundary: discovery profile until Teal Registry review creates a verified record",
    ],
    tealSignals: [
      {
        title: "Evolutionary Purpose",
        summary: `Look for source-backed evidence that ${targetName}'s stated purpose guides real decisions, tradeoffs, and public commitments.`,
      },
      {
        title: "Self-Organization",
        summary:
          "Do not assume distributed power. Request examples of decision rights, governance agreements, role clarity, and accountability.",
      },
      {
        title: "Wholeness",
        summary:
          "Request evidence about culture, conflict repair, care, learning, psychological safety, and how people are treated under pressure.",
      },
    ],
    seoTitle: `${targetName} Teal Registry public profile`,
    seoDescription: `Review the ${targetName} Teal Registry profile, public sources, Teal signal map, verification boundary, and claim path.`,
    questions: [
      {
        question: `Is ${targetName} verified by Teal Registry?`,
        answer:
          "Not unless a current verification record appears on the public profile. Starter listings are discovery pages, not certification.",
      },
      {
        question: `What should ${targetName} do next?`,
        answer: ownerNextStep,
      },
      {
        question: "Can Teal Registry use photos from the source website?",
        answer:
          "Only with owner permission, clear reusable licensing, or original Teal Registry visuals. Facts can be cited; protected media should not be copied.",
      },
    ],
    sourceNotes: [
      "Use official website pages, public directories, interviews, press, maps, and owner-submitted corrections.",
      "Do not state verification, certification, accreditation, or endorsement without a current Teal Registry decision.",
      "Human review must remove overclaims and confirm every source link before publishing.",
    ],
    mediaPolicy:
      "Use owner-provided media, clearly licensed media, or original Teal Registry visuals. Do not scrape and reuse copyrighted website photography without permission.",
  };
}

export function ListingBuilderWorkbench() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const draftJson = useMemo(() => (draft ? JSON.stringify(draft, null, 2) : ""), [draft]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currentDraft = draft ?? buildDraft(formData);
    const sourceUrls = splitLines(formData.get("sourceUrls"));

    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/trios/listing-build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetName: formData.get("targetName"),
        targetWebsite: formData.get("targetWebsite"),
        targetCategory: formData.get("targetCategory"),
        sourceUrls,
        extractedFacts: formData.get("extractedFacts"),
        generatedDraft: JSON.stringify(currentDraft),
        mediaLicenseStatus: formData.get("mediaLicenseStatus"),
        notes: formData.get("notes"),
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setMessage(body?.error ?? "The listing build job could not be sent to TRIOS.");
      return;
    }

    setStatus("success");
    setMessage("Listing build job sent to TRIOS for human review.");
  }

  return (
    <section className="content-section listing-workbench">
      <div className="section-heading compact">
        <h2>Build a starter profile</h2>
        <p>
          Use this to turn target research into a reviewed build job. The draft is useful, but it
          stays unpublished until a human checks facts, sources, rights, and claim boundaries.
        </p>
      </div>
      <form className="builder-console" onSubmit={handleSubmit}>
        <div className="builder-fields">
          <label>
            <span>Official name</span>
            <input name="targetName" required type="text" placeholder="Project or organization name" />
          </label>
          <label>
            <span>Official website</span>
            <input name="targetWebsite" type="url" placeholder="https://example.org" />
          </label>
          <label>
            <span>Category</span>
            <select name="targetCategory" defaultValue={categoryOptions[0]}>
              {categoryOptions.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Primary location</span>
            <input name="location" type="text" placeholder="City, region, country, or global" />
          </label>
          <label>
            <span>Known public claims</span>
            <textarea
              name="publicClaims"
              rows={3}
              placeholder="What they publicly say about community, governance, purpose, regeneration, training, or impact."
            />
          </label>
          <label>
            <span>Source URLs</span>
            <textarea
              name="sourceUrls"
              required
              rows={4}
              placeholder={"https://official-site.org\nhttps://public-directory.org/profile"}
            />
          </label>
          <label>
            <span>Extracted facts</span>
            <textarea
              name="extractedFacts"
              required
              rows={5}
              placeholder="Paste source-backed facts only. No copied marketing paragraphs."
            />
          </label>
          <label>
            <span>Dream audience</span>
            <input name="dreamAudience" type="text" placeholder="Funders, partners, prospective members..." />
          </label>
          <label>
            <span>Owner next step</span>
            <input name="ownerNextStep" type="text" placeholder="Claim, correct facts, add media, request review..." />
          </label>
          <label>
            <span>Media license status</span>
            <select name="mediaLicenseStatus" defaultValue="Rights unclear - use original registry visuals">
              <option>Rights unclear - use original registry visuals</option>
              <option>Owner-provided media available</option>
              <option>Reusable license confirmed</option>
              <option>No media approved yet</option>
            </select>
          </label>
          <label>
            <span>Reviewer notes</span>
            <textarea name="notes" rows={3} placeholder="Open questions, risks, owner contact notes, or review priority." />
          </label>
          <div className="builder-actions">
            <button
              className="btn btn-ghost"
              onClick={(event) => {
                const form = event.currentTarget.form;
                if (form) {
                  setStatus("idle");
                  setMessage("");
                  setDraft(buildDraft(new FormData(form)));
                }
              }}
              type="button"
            >
              Generate draft
            </button>
            <button className="btn btn-primary" disabled={status === "loading"} type="submit">
              {status === "loading" ? "Sending..." : "Send build job to TRIOS"}
            </button>
          </div>
          {message && <p className={`form-status ${status === "error" ? "error" : "success"}`}>{message}</p>}
        </div>
        <aside className="builder-draft" aria-live="polite">
          {draft ? (
            <>
              <span>Draft profile</span>
              <h3>{draft.seoTitle}</h3>
              <p>{draft.summary}</p>
              <h4>Highlights</h4>
              <ul>
                {draft.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>Teal signal map</h4>
              {draft.tealSignals.map((signal) => (
                <div className="mini-signal" key={signal.title}>
                  <strong>{signal.title}</strong>
                  <p>{signal.summary}</p>
                </div>
              ))}
              <details>
                <summary>Structured draft JSON</summary>
                <pre>{draftJson}</pre>
              </details>
            </>
          ) : (
            <>
              <span>Draft profile</span>
              <h3>Generate a draft to preview the listing structure.</h3>
              <p>
                The preview will create a claim-safe summary, highlights, Teal signal map, SEO
                title, answer-engine questions, source notes, and media policy.
              </p>
            </>
          )}
        </aside>
      </form>
    </section>
  );
}
