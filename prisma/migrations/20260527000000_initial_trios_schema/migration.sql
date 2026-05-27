-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PUBLIC', 'LEARNER', 'CANDIDATE', 'CREDENTIAL_HOLDER', 'ORGANIZATION_MANAGER', 'PROVIDER_MANAGER', 'ASSESSOR', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('ORGANIZATION', 'INDIVIDUAL', 'PROVIDER', 'FRAMEWORK');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'INTERNAL', 'PUBLIC');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'SCREENING', 'EVIDENCE_REVIEW', 'INTERVIEW', 'DECISION', 'ISSUED', 'PUBLISHED', 'RENEWAL_SCHEDULED', 'MORE_INFO_REQUESTED', 'WITHDRAWN', 'REJECTED');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('OPEN', 'ASSIGNED', 'IN_REVIEW', 'FINDINGS_READY', 'DECISION_PENDING', 'CLOSED', 'APPEAL_OPEN');

-- CreateEnum
CREATE TYPE "EvidenceStatus" AS ENUM ('SUBMITTED', 'ACCEPTED', 'NEEDS_CLARIFICATION', 'REJECTED', 'PUBLIC_SAFE_APPROVED');

-- CreateEnum
CREATE TYPE "BadgeLicenseStatus" AS ENUM ('DRAFT', 'ISSUED', 'ACTIVE', 'EXPIRING_SOON', 'EXPIRED', 'SUSPENDED', 'REVOKED', 'REISSUED');

-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('RECEIVED', 'TRIAGE', 'INVESTIGATION', 'ACTION_PROPOSED', 'DECISION', 'PUBLIC_NOTICE', 'CLOSED', 'APPEAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" "EntityType" NOT NULL,
    "name" TEXT NOT NULL,
    "publicSlug" TEXT,
    "country" TEXT,
    "sector" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "website" TEXT,
    "primaryEmail" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "orgType" TEXT,
    "country" TEXT,
    "sectors" TEXT[],
    "size" TEXT,
    "publicStatus" TEXT,
    "directoryEligible" BOOLEAN NOT NULL DEFAULT false,
    "shortPublicDescription" TEXT,
    "primaryContact" TEXT,
    "website" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Affiliation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "profileId" TEXT,
    "organizationId" TEXT,
    "role" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "Affiliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CredentialLevel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "levelOrder" INTEGER NOT NULL,
    "track" TEXT NOT NULL,
    "publicLabel" TEXT NOT NULL,
    "evidenceRequired" TEXT NOT NULL,
    "whoEligible" TEXT NOT NULL,
    "badgeType" TEXT,
    "notes" TEXT,

    CONSTRAINT "CredentialLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeType" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "appliesTo" TEXT NOT NULL,
    "publicClaim" TEXT NOT NULL,
    "requiresVerification" BOOLEAN NOT NULL DEFAULT false,
    "artworkFile" TEXT,

    CONSTRAINT "BadgeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "standardCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3),
    "summary" TEXT NOT NULL,
    "publicUrl" TEXT,
    "notes" TEXT,

    CONSTRAINT "Standard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criterion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "criterionCode" TEXT NOT NULL,
    "standardId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "assessmentMethod" TEXT NOT NULL,
    "evidenceExamples" TEXT NOT NULL,
    "publicSafeExample" TEXT,
    "notes" TEXT,

    CONSTRAINT "Criterion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "applicantProfileId" TEXT,
    "organizationId" TEXT,
    "applicationType" TEXT NOT NULL,
    "requestedLevelId" TEXT,
    "submittedDate" TIMESTAMP(3),
    "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "source" TEXT,
    "readinessScore" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "caseType" TEXT NOT NULL,
    "organizationId" TEXT,
    "applicationId" TEXT,
    "requestedLevel" TEXT,
    "status" "CaseStatus" NOT NULL DEFAULT 'OPEN',
    "openedDate" TIMESTAMP(3),
    "targetDecisionDate" TIMESTAMP(3),
    "assignedAssessorId" TEXT,
    "primaryContact" TEXT,
    "publicSummaryReady" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assessmentType" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "standardId" TEXT,
    "assessorName" TEXT,
    "status" TEXT NOT NULL,
    "scopeSummary" TEXT,
    "startedDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "overallFinding" TEXT,
    "notes" TEXT,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finding" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "criterionId" TEXT,
    "finding" TEXT NOT NULL,
    "evidenceStatus" TEXT NOT NULL,
    "publicSafeSummary" TEXT,
    "assessorNotes" TEXT,
    "correctiveAction" TEXT,
    "dueDate" TIMESTAMP(3),
    "closed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Finding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "evidenceType" TEXT NOT NULL,
    "organizationId" TEXT,
    "caseId" TEXT,
    "assessmentId" TEXT,
    "criterionId" TEXT,
    "submittedBy" TEXT,
    "receivedDate" TIMESTAMP(3),
    "reviewStatus" "EvidenceStatus" NOT NULL DEFAULT 'SUBMITTED',
    "publicSafe" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "notes" TEXT,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "interviewType" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "host" TEXT,
    "participants" TEXT[],
    "scheduledAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decision" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "decisionType" TEXT NOT NULL,
    "decisionDate" TIMESTAMP(3),
    "decidedLevelId" TEXT,
    "decisionBody" TEXT,
    "rationalePublic" TEXT,
    "rationalePrivate" TEXT,
    "status" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Decision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRecord" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organizationId" TEXT,
    "grantedLevelId" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "lastAuditDate" TIMESTAMP(3),
    "validTo" TIMESTAMP(3),
    "nextReviewWindow" TEXT,
    "scope" TEXT NOT NULL,
    "decisionId" TEXT,
    "publicNote" TEXT,
    "notes" TEXT,

    CONSTRAINT "VerificationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeLicense" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "organizationId" TEXT,
    "personName" TEXT,
    "badgeTypeId" TEXT,
    "issuedDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "status" "BadgeLicenseStatus" NOT NULL DEFAULT 'DRAFT',
    "verificationRecordId" TEXT,
    "verifyUrl" TEXT,
    "qrCodeTarget" TEXT,
    "misuseFlags" TEXT,
    "notes" TEXT,

    CONSTRAINT "BadgeLicense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicDirectoryListing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organizationId" TEXT,
    "verificationRecordId" TEXT,
    "publicSlug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "shortBlurb" TEXT,
    "primaryCta" TEXT,
    "notes" TEXT,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "PublicDirectoryListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplaintAppeal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "intakeType" TEXT NOT NULL,
    "organizationId" TEXT,
    "filedBy" TEXT,
    "filedDate" TIMESTAMP(3),
    "status" "ComplaintStatus" NOT NULL DEFAULT 'RECEIVED',
    "severity" TEXT,
    "summaryPublic" TEXT,
    "summaryPrivate" TEXT,
    "relatedBadgeId" TEXT,
    "notes" TEXT,

    CONSTRAINT "ComplaintAppeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnforcementAction" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organizationId" TEXT,
    "actionType" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "outcome" TEXT,
    "relatedComplaintId" TEXT,
    "relatedBadgeId" TEXT,
    "publicNote" TEXT,
    "privateNote" TEXT,

    CONSTRAINT "EnforcementAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoiDeclaration" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assessorId" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "coiType" TEXT NOT NULL,
    "declaredDate" TIMESTAMP(3),
    "recusalRequired" BOOLEAN NOT NULL DEFAULT false,
    "mitigation" TEXT,
    "notes" TEXT,

    CONSTRAINT "CoiDeclaration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessorCalibration" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "calibrationDate" TIMESTAMP(3),
    "participants" TEXT[],
    "focus" TEXT NOT NULL,
    "outcomeNotes" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "AssessorCalibration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "leadType" TEXT NOT NULL,
    "source" TEXT,
    "stage" TEXT NOT NULL,
    "interestLevel" TEXT,
    "requestedLevel" TEXT,
    "primaryContact" TEXT,
    "organization" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "lastContacted" TIMESTAMP(3),
    "nextAction" TEXT,
    "owner" TEXT,
    "notes" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT,
    "owner" TEXT,
    "caseId" TEXT,
    "relatedOrg" TEXT,
    "dueDate" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommsLog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,
    "caseId" TEXT,
    "date" TIMESTAMP(3),
    "outcome" TEXT,
    "summary" TEXT,
    "notes" TEXT,

    CONSTRAINT "CommsLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "before" JSONB,
    "after" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "primaryAction" TEXT NOT NULL,
    "secondaryAction" TEXT,
    "slugPolicy" TEXT NOT NULL,
    "directoryDefaultVisibility" TEXT NOT NULL,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_publicSlug_key" ON "Profile"("publicSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CredentialLevel_title_key" ON "CredentialLevel"("title");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeType_title_key" ON "BadgeType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_standardCode_key" ON "Standard"("standardCode");

-- CreateIndex
CREATE UNIQUE INDEX "Criterion_criterionCode_key" ON "Criterion"("criterionCode");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeLicense_badgeId_key" ON "BadgeLicense"("badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicDirectoryListing_publicSlug_key" ON "PublicDirectoryListing"("publicSlug");

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_title_key" ON "SystemSetting"("title");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliation" ADD CONSTRAINT "Affiliation_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliation" ADD CONSTRAINT "Affiliation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criterion" ADD CONSTRAINT "Criterion_standardId_fkey" FOREIGN KEY ("standardId") REFERENCES "Standard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantProfileId_fkey" FOREIGN KEY ("applicantProfileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_requestedLevelId_fkey" FOREIGN KEY ("requestedLevelId") REFERENCES "CredentialLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_assignedAssessorId_fkey" FOREIGN KEY ("assignedAssessorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_standardId_fkey" FOREIGN KEY ("standardId") REFERENCES "Standard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finding" ADD CONSTRAINT "Finding_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finding" ADD CONSTRAINT "Finding_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decision" ADD CONSTRAINT "Decision_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decision" ADD CONSTRAINT "Decision_decidedLevelId_fkey" FOREIGN KEY ("decidedLevelId") REFERENCES "CredentialLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRecord" ADD CONSTRAINT "VerificationRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRecord" ADD CONSTRAINT "VerificationRecord_grantedLevelId_fkey" FOREIGN KEY ("grantedLevelId") REFERENCES "CredentialLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRecord" ADD CONSTRAINT "VerificationRecord_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "Decision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeLicense" ADD CONSTRAINT "BadgeLicense_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeLicense" ADD CONSTRAINT "BadgeLicense_badgeTypeId_fkey" FOREIGN KEY ("badgeTypeId") REFERENCES "BadgeType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeLicense" ADD CONSTRAINT "BadgeLicense_verificationRecordId_fkey" FOREIGN KEY ("verificationRecordId") REFERENCES "VerificationRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicDirectoryListing" ADD CONSTRAINT "PublicDirectoryListing_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicDirectoryListing" ADD CONSTRAINT "PublicDirectoryListing_verificationRecordId_fkey" FOREIGN KEY ("verificationRecordId") REFERENCES "VerificationRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintAppeal" ADD CONSTRAINT "ComplaintAppeal_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnforcementAction" ADD CONSTRAINT "EnforcementAction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnforcementAction" ADD CONSTRAINT "EnforcementAction_relatedComplaintId_fkey" FOREIGN KEY ("relatedComplaintId") REFERENCES "ComplaintAppeal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoiDeclaration" ADD CONSTRAINT "CoiDeclaration_assessorId_fkey" FOREIGN KEY ("assessorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommsLog" ADD CONSTRAINT "CommsLog_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
