import { NextResponse } from "next/server";
import { z } from "zod";

const researchSchema = z.object({
  targetWebsite: z.string().url().max(500),
  targetName: z.string().max(160).optional(),
});

const blockedHostPatterns = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^0\./,
];

function assertPublicUrl(value: string) {
  const url = new URL(value);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only public HTTP or HTTPS URLs can be researched.");
  }

  const host = url.hostname.toLowerCase();
  if (blockedHostPatterns.some((pattern) => pattern.test(host)) || host.endsWith(".local")) {
    throw new Error("Private or local network URLs cannot be researched.");
  }

  return url;
}

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function cleanText(value: string) {
  return decodeEntities(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(html: string, pattern: RegExp) {
  return cleanText(pattern.exec(html)?.[1] ?? "");
}

function allMatches(html: string, pattern: RegExp, limit: number) {
  return Array.from(html.matchAll(pattern))
    .map((match) => cleanText(match[1] ?? ""))
    .filter((value) => value.length > 24)
    .filter((value, index, array) => array.indexOf(value) === index)
    .slice(0, limit);
}

function inferCategory(text: string) {
  const normalized = text.toLowerCase();

  if (/training|course|academy|workshop|certification|facilitator/.test(normalized)) {
    return "Training providers and frameworks";
  }

  if (/cooperative|worker-owned|self[- ]managed|employee owned|sociocracy|holacracy/.test(normalized)) {
    return "Worker cooperatives and self-managed companies";
  }

  if (/village|ecovillage|land|farm|permaculture|regenerative agriculture|watershed/.test(normalized)) {
    return "Regenerative villages and land projects";
  }

  if (/consult|implementation|organizational development|self-management|teal/.test(normalized)) {
    return "Teal or self-organization consultancies";
  }

  return "Intentional communities";
}

function absoluteUrl(base: URL, href: string) {
  try {
    const url = new URL(href, base);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function extractSourceLinks(html: string, base: URL) {
  const links = Array.from(html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi))
    .map((match) => {
      const href = absoluteUrl(base, match[1] ?? "");
      const label = cleanText(match[2] ?? "");
      return href && label.length > 2 ? { href, label } : null;
    })
    .filter((item): item is { href: string; label: string } => Boolean(item))
    .filter((item) => {
      const label = item.label.toLowerCase();
      return /about|mission|purpose|team|governance|community|program|training|impact|contact|faq|story/.test(label);
    })
    .filter((item, index, array) => array.findIndex((candidate) => candidate.href === item.href) === index)
    .slice(0, 8);

  return [{ href: base.toString(), label: "Official website" }, ...links].slice(0, 10);
}

export async function POST(request: Request) {
  const payload = researchSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Please provide a valid public website URL." }, { status: 400 });
  }

  let url: URL;
  try {
    url = assertPublicUrl(payload.data.targetWebsite);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "URL cannot be researched." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "TealRegistryBot/0.1 (+https://www.tealregistry.com)",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Source returned HTTP ${response.status}.` }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return NextResponse.json({ error: "Source did not return an HTML page." }, { status: 415 });
    }

    const html = (await response.text()).slice(0, 750_000);
    const stripped = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

    const title =
      firstMatch(stripped, /<meta\b[^>]*(?:property|name)=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
      firstMatch(stripped, /<title[^>]*>([\s\S]*?)<\/title>/i) ||
      payload.data.targetName ||
      url.hostname.replace(/^www\./, "");

    const description =
      firstMatch(stripped, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
      firstMatch(stripped, /<meta\b[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i);

    const headings = allMatches(stripped, /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi, 8);
    const paragraphs = allMatches(stripped, /<p[^>]*>([\s\S]*?)<\/p>/gi, 8);
    const combined = [title, description, ...headings, ...paragraphs].filter(Boolean).join(" ");
    const claims = [description, ...headings.slice(0, 4), ...paragraphs.slice(0, 3)]
      .filter(Boolean)
      .join("\n")
      .slice(0, 1800);
    const facts = [
      `Official website: ${url.toString()}`,
      title ? `Page title: ${title}` : "",
      description ? `Meta description: ${description}` : "",
      ...headings.slice(0, 6).map((heading) => `Heading: ${heading}`),
      ...paragraphs.slice(0, 5).map((paragraph) => `Visible copy: ${paragraph}`),
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 3800);

    const sourceLinks = extractSourceLinks(stripped, url);

    return NextResponse.json({
      title,
      description,
      inferredCategory: inferCategory(combined),
      publicClaims: claims,
      extractedFacts: facts,
      sourceUrls: sourceLinks.map((link) => link.href),
      sourceLinks,
      mediaLicenseStatus: "Rights unclear - use original registry visuals",
      mediaPolicy:
        "Research extracted public facts and source URLs only. Do not reuse source-site images unless the owner grants permission or a reusable license is confirmed.",
    });
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError" ? "Research request timed out." : "Could not research that website.";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
