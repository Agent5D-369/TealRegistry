# Design - Teal Registry

A locked design system for Teal Registry. Every page should read as public trust infrastructure: calm, evidence-led, human, and plain enough for a first-time visitor who has never heard the word Teal.

## Genre
Editorial trust system.

## Macrostructure Family
- Marketing pages: Marquee / trust-led hero, proof rail, registry index, direct CTA.
- App pages: Workbench, with dense controls and plain state labels.
- Content pages: Long Document, with wide readable prose, source-backed sections, and no decorative noise.

## Theme
- `--color-paper` oklch(97% 0.012 185)
- `--color-paper-2` oklch(94% 0.018 185)
- `--color-surface` oklch(99% 0.008 185)
- `--color-ink` oklch(17% 0.018 185)
- `--color-ink-2` oklch(31% 0.022 185)
- `--color-muted` oklch(43% 0.024 185)
- `--color-rule` oklch(83% 0.022 185)
- `--color-accent` oklch(55% 0.13 185)
- `--color-accent-strong` oklch(28% 0.07 185)
- `--color-accent-ink` oklch(98% 0.006 185)
- `--color-gold` oklch(66% 0.13 78)
- `--color-focus` oklch(69% 0.14 78)

## Typography
- Display: Fraunces, weight 800, normal.
- Body: IBM Plex Sans, weight 400.
- Mono: JetBrains Mono, weight 600, only for compact metadata and IDs.
- Display tracking: 0.
- Type scale anchor: `--text-display = clamp(2.75rem, 5vw + 1rem, 5.25rem)`.

## Spacing
4-point named scale. Pages use named tokens from `tokens.css`.

## Motion
- Easings: `--ease-out`, `--ease-in`, `--ease-in-out`.
- Reveal pattern: none by default. The content should feel stable, not cinematic.
- Reduced motion: all spatial movement collapses to <= 150 ms.

## Microinteractions
- Buttons lift 1 px on hover and press back down on active.
- Focus rings appear instantly.
- Form fields keep a constant border width across all states.
- Success is silent when the result is visible.

## CTA Voice
- Primary CTA: deep teal fill, rectangular 8 px radius, plain verb-first copy.
- Secondary CTA: paper fill with teal rule, same geometry.

## What Pages Must Share
- Official Teal Registry lockup.
- Teal and gold accents used sparingly.
- Plain-language claim boundaries.
- Readable line lengths.
- Links that describe exactly where they go.

## What Pages May Differ On
- Registry pages may use denser grid/table layouts.
- Case-study pages may use long-form evidence sections.
- Admin pages may prioritize compact workbench controls.

## Exports
See `tokens.css` at the project root.
