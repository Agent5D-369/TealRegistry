# Implementation Roadmap

## Phase 0: Readiness Baseline

Status: in progress

- Clone GitHub repository
- Capture source material inventory
- Confirm Railway project IDs
- Create project brief and implementation roadmap
- Re-authenticate Railway project access
- Choose frontend stack and scaffold app

## Phase 1: Static Trust Spine

Goal: publish a polished public website that clearly explains the registry and routes users to verification, directory, standards, apply, and misuse reporting.

Build:

- Home page using the approved institutional copy
- Standards and status definitions
- How It Works with explicit separation of roles
- Apply page with pathway selection placeholder
- Report Misuse page
- Footer with governance links
- Brand asset integration
- SEO metadata and social preview basics

## Phase 2: Directory MVP

Goal: make search and verification useful with seeded public data.

Build:

- Registry list view
- Filters for entity type, status, sector, country/region, language, and credential level
- Badge/claim verification lookup
- Public profile pages for organizations, individuals, and frameworks
- No-record, status-changed, expired, and suspended states
- CSV-to-public-data importer for initial seed data

## Phase 3: Publishing Pipeline

Goal: separate internal operations from public website reads.

Build:

- Canonical public data contract
- Notion/CSV import and validation scripts
- Published-only sync into Firestore or selected database
- Slug and verification ID generation
- Sync logs and validation errors
- Repeatable manual publish command

## Phase 4: Portal and Operations

Goal: support real credentialing workflows.

Build:

- Apply flow by credential pathway
- Evidence requirements and upload strategy
- Application status tracker
- Renewal and change-of-scope flows
- Complaints and appeals workflow
- Admin review workflow integration

## Phase 5: Hardening

Goal: public launch quality.

Build:

- Accessibility pass
- Performance pass
- Analytics
- Backups
- Monitoring
- Security review
- Abuse/misuse reporting review
- Legal/policy copy review

## Open Decisions

- Frontend framework: Next.js is recommended if SEO and route-level metadata matter most; React/Vite is sufficient for a fast static-style MVP.
- Public database: Firestore is recommended by the client notes; Railway Postgres is also viable if relational querying becomes more important.
- Search engine: start with database filtering; add Algolia, Typesense, or Meilisearch only when records and search complexity justify it.
- Auth: defer public accounts until the directory and verification flows prove useful.
