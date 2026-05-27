# Teal Registry Platform Build Plan

## Discovery Summary

### Current Public Website

As of 2026-05-26, `https://tealregistry.com` is not a production website.

- `/` returns a small redirect script to `/lander`.
- `/sitemap.xml` lists only `https://tealregistry.com/lander`.
- `/robots.txt` allows crawling and points to `/llms.txt`.
- `/llms.txt` allows crawling but says `Disallow-Training: /`.
- `/lander` is a domain parking page loading GoDaddy/parking assets.

Conclusion: the live domain has no meaningful content, information architecture, app logic, directory, authentication, or backend behavior to preserve.

### Local Project Folder

The local workspace contains the real product source material:

- Brand assets: logos, official marks, badges, banners, hero images, social assets, fonts.
- Public website seed data: pages, sections, standards, status ladder, verification records, reports, apply/notify, badge assets, FAQs, public notices.
- Backend operating model: TRIOS v3 CSVs covering credential levels, badge types, profiles, organizations, leads, applications, cases, assessments, evidence, interviews, decisions, verification records, badge licenses, complaints, enforcement, COI, assessor calibration, tasks, comms, public listings, framework recognition, accreditation, and system settings.
- Strategy docs: homepage copy, mobile-first sitemap, TRIOS build plan, standards and directory design, credibility canon, credentialing ecosystem, misuse reporting, renewal/revocation, verification criteria, badge claims, and accreditation language.

Conclusion: Teal Registry should be built as a standards-body operating system, not a brochure site.

## Product Thesis

Teal Registry becomes the independent public trust layer for Teal claims.

The website must do four jobs at industry-standard quality:

1. Let the public verify claims instantly.
2. Let candidates apply, submit evidence, track reviews, and renew credentials.
3. Let assessors and admins run defensible certification operations.
4. Let learners and credential holders manage status without blurring verification, education, and consulting.

The product should feel closer to a modern certification authority, standards body, licensing board, and public registry than a marketing website.

## Ethical Boundary

Teal Registry should not directly sell or deliver training if it is also certifying outcomes. The platform can support learner accounts and training records, but the product boundary should be:

- Registry: standards, credential records, verification, certification decisions, badge licenses, public directory, enforcement.
- Accredited providers: training delivery and completion records.
- Candidates: applications, evidence submission, interviews, renewal.
- Assessors/admins: review, scoring, decisions, enforcement.

If Teal Registry later hosts learning content, it should be clearly separated as an accredited provider workflow or affiliated-but-separate service, with public disclosures and conflict-of-interest controls.

## Recommended Stack

### Application

- Next.js App Router with TypeScript
- Tailwind CSS plus a strict design token system
- shadcn/ui for accessible primitives where useful
- Server Actions or API routes for backend operations
- Zod for validation
- React Hook Form for complex forms

### Backend

- Railway-hosted Postgres as the source of truth
- Prisma or Drizzle ORM
- Postgres full-text search for MVP
- Meilisearch, Typesense, or Algolia later if directory search outgrows Postgres
- Object storage for evidence files, badge images, signed certificates, and exports
- Background jobs for badge expiration, reminders, syncs, notifications, and audit snapshots

### Auth

- Clerk or Auth.js with organization support
- Role-based access control in the app database
- Optional SSO later for enterprise/provider accounts
- Magic links plus MFA for assessors/admins

### Infrastructure

- Railway web service for the app
- Railway Postgres
- Railway volume/object storage or S3-compatible bucket for files
- Separate production and staging environments
- GitHub Actions for checks
- Structured logs, audit events, error tracking, uptime checks

## Core User Roles

- Public Visitor: search registry, verify badge, read standards, report misuse.
- Learner: view training completion records, eligible pathways, badges earned through accredited providers.
- Candidate: apply, upload evidence, complete attestations, schedule interviews, track status, renew.
- Credential Holder: manage profile, badge license, public claims, renewals, misuse alerts.
- Organization Manager: manage organizational applications, team members, evidence, public listing.
- Accredited Provider: submit training completions, manage provider profile, see accreditation status.
- Assessor: review evidence, score criteria, record findings, declare COI, conduct interviews.
- Review Board/Admin: assign cases, make decisions, issue badges, handle appeals/enforcement.
- Super Admin: manage standards, criteria, credential levels, users, roles, system settings.

## Public Frontend

### Global Navigation

Primary actions must be persistent:

- Search the Registry
- Verify a Badge

Top-level navigation:

- Registry
- Credentials
- Standards
- Badges & Marks
- Governance & Integrity
- Resources
- About

### Public Routes

- `/` home
- `/registry` searchable directory
- `/registry/[slug]` public profile
- `/verify` badge and claim lookup
- `/verify/[badgeId]` direct QR verification target
- `/credentials` credentialing map
- `/credentials/[level]` pathway pages
- `/standards`
- `/standards/[standardCode]`
- `/badges-and-marks`
- `/governance`
- `/governance/complaints-appeals`
- `/governance/enforcement`
- `/apply`
- `/report-misuse`
- `/resources`
- `/about`

### Public Registry Requirements

- Search by entity name, badge ID, credential ID, country, sector, scope.
- Filters for entity type, status, credential level, sector, country/region, language, project type, and current/expired status.
- Each result must show status, scope, badge/license state, last review date, valid-to date, and verification ID.
- Public profiles must show what is verified, what is not verified, evidence categories, standards coverage, renewal window, and report concern link.
- No-record results must be clear and non-defamatory.
- Suspended, expired, revoked, and changed-status states must be first-class.

## Authenticated Portal

### Shared Portal Shell

- Role-aware dashboard
- Profile and organization switcher
- Notifications and required actions
- Credential/application status timeline
- Secure document center
- Audit-safe messaging

### Learner Dashboard

- Training completions from accredited providers
- Eligible next credential paths
- Downloadable completion records if allowed
- Public claim guidance
- Link to apply for verification/certification where appropriate

### Candidate Dashboard

- Start application by credential path
- Readiness checklist
- Evidence upload and link submission
- Attestations and conflict disclosures
- Interview scheduling
- Case status tracker
- Requests for more information
- Decision outcome and next steps
- Renewal and change-of-scope requests

### Organization Dashboard

- Organization profile
- Team members and permissions
- Multiple applications/cases
- Evidence library
- Public listing preview
- Badge license management
- Renewal calendar
- Concern/misuse notices

### Accredited Provider Dashboard

- Provider accreditation status
- Approved training programs
- Training completion submissions
- Learner completion records
- Provider badge usage rules
- Renewal/accreditation evidence

### Assessor Dashboard

- Assigned cases
- Evidence review queue
- Criteria coverage scoring
- Interview notes
- COI declarations and recusal state
- Findings, corrective actions, and recommendations
- Calibration tasks

### Admin Dashboard

- Lead and application intake
- Case assignment
- Standards and criteria management
- Decision board workflow
- Badge issuance and revocation
- Public directory publishing
- Complaints, appeals, and enforcement
- Audit log
- Data import/export
- User and role management

## Data Model

The TRIOS v3 CSVs should become the initial relational schema.

Core tables:

- users
- accounts
- roles
- profiles
- organizations
- affiliations
- credential_levels
- badge_types
- standards
- criteria
- applications
- cases
- assessments
- findings
- evidence
- interviews
- decisions
- verification_records
- badge_licenses
- public_directory_listings
- complaints_appeals
- enforcement_actions
- coi_declarations
- assessor_calibrations
- provider_accreditations
- framework_recognitions
- leads
- tasks
- comms_log
- audit_events
- system_settings

Important derived states:

- Public directory visibility
- Current credential status
- Badge validity
- Renewal due date
- Case SLA
- Evidence completeness
- Assessor COI status
- Public-safe disclosure status

## Workflow Engine

### Application Lifecycle

Draft -> Submitted -> Screening -> Evidence Review -> Interview -> Findings -> Decision -> Issued -> Published -> Renewal Scheduled

Exception states:

- More information requested
- Withdrawn
- Rejected
- Suspended
- Revoked
- Expired
- Appeal open

### Badge Lifecycle

Draft -> Issued -> Active -> Expiring Soon -> Expired -> Suspended -> Revoked -> Reissued

Every public badge URL must resolve to the current license state.

### Complaint and Enforcement Lifecycle

Received -> Triage -> Investigation -> Action Proposed -> Decision -> Public Notice -> Closed -> Appeal

## Admin Standards Body Features

To be credible as a new industry standard, the backend needs governance-grade operations:

- Immutable audit trail for key actions
- Versioned standards and criteria
- Versioned decision rationale
- Public/private evidence separation
- Conflict-of-interest declarations
- Assessor recusal and assignment rules
- Decision body approval workflow
- Renewal and expiration automation
- Public notice publishing
- Revocation and reinstatement history
- Badge misuse tracking
- Exportable case records

## Security and Compliance Baseline

- Least-privilege RBAC
- MFA for assessors/admins
- Signed URLs for private evidence files
- Separate public-safe summaries from private notes
- Encryption in transit and at rest
- Audit every credential-impacting change
- Rate-limit public verify/search endpoints
- Bot protection on report/apply flows
- Backups and restore tests
- Data retention policy for evidence and complaints

## Build Phases

### Phase 1: Public Trust MVP

Build the public standards-body website with static/semi-static content and seeded registry records.

Deliver:

- Full public website IA
- Search Registry
- Verify Badge
- Public profile pages
- Standards/status pages
- Apply and Report Misuse intake
- Seed import from CSV
- Railway deployment

### Phase 2: Auth and Candidate Portal

Deliver:

- Auth
- Role model
- Candidate dashboard
- Organization dashboard
- Application workflow
- Evidence submission
- Admin intake queue

### Phase 3: Assessor and Admin Operations

Deliver:

- Case assignment
- Assessment scoring
- Findings coverage
- Interview workflow
- COI declarations
- Decision workflow
- Badge issuance
- Public publishing controls

### Phase 4: Provider and Learner Records

Deliver:

- Accredited provider dashboard
- Training completion submission
- Learner records
- Credential eligibility mapping
- Provider accreditation renewal

### Phase 5: Governance, Enforcement, and Scale

Deliver:

- Complaints/appeals workflow
- Enforcement actions
- Standards versioning
- Public notices
- Advanced search
- Analytics and monitoring
- Export/reporting tools
- Hardening and security review

## First Engineering Sprint

1. Scaffold Next.js app with TypeScript, Tailwind, linting, formatting, and test baseline.
2. Add brand tokens and copy core brand assets into `public/`.
3. Model the TRIOS v3 schema in Postgres.
4. Build CSV import scripts for seed data.
5. Implement public routes: home, registry, verify, profile, standards, apply, report misuse.
6. Add Railway deployment config and environment docs.
7. Verify the first deployed version against desktop and mobile screenshots.

## Key Product Principle

The first version should not try to be a full learning platform, CRM, certification board, public directory, and evidence management system all at once. It should establish the trust spine first:

Search -> Verify -> Understand status -> Apply/report -> Admin can issue/update public records.

Everything else should extend that spine without weakening the independence boundary.
