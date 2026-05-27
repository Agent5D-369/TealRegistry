# Teal Registry

Public standards, directory, and credential verification website for Teal Registry.

## Product North Star

Teal Registry is an independent verification body for organizations, people, providers, and frameworks claiming Teal practices. The public website should make it fast for a stranger to:

- Search the registry
- Verify a badge or claim
- Understand what each status means
- See standards and governance boundaries
- Apply or report misuse without confusing verification with training or consulting

## Current Repo Status

This repository was cloned from `Agent5D-369/TealRegistry` on 2026-05-26. It was empty at clone time, so this repo currently contains the project readiness baseline only.

## Source Material

Local client source assets live outside this repo in the parent workspace:

- `_AI LIBRARY/Website/TealRegistry com - TRIOS Build Plan 2f9130aaffa380f29698e3e9be398e9b.md`
- `_AI LIBRARY/Website/TealRegistry com "Ultimate Standards + Directory design.md`
- `_AI LIBRARY/*Draft homepage copy verbatim*.md`
- `_AI LIBRARY/*Mobile-First Site Map & Wirefra*.md`
- `_NOTION WEBSITE/*.csv`
- `_NOTION BACKEND/TRIOS_v3/*.csv`
- `_Artwork/Logo`, `_Artwork/Hero Images`, `_Artwork/Badges`, `_Artwork/Banners`

## Proposed Architecture

- Frontend: Next.js or React/Vite public website, selected when implementation starts.
- Public registry data: Firestore or equivalent production database optimized for search/filter reads.
- Internal operations: Notion remains the human-facing CMS and review workspace.
- Publishing pipeline: Notion or CSV source data syncs only approved/published records into the public database.
- Hosting: Railway project and service are already identified, but project-scoped access currently needs re-authentication.

See [docs/project-brief.md](docs/project-brief.md), [docs/implementation-roadmap.md](docs/implementation-roadmap.md), and [docs/railway.md](docs/railway.md).
