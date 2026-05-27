-- AlterTable
ALTER TABLE "PublicDirectoryListing" ADD COLUMN     "claimStatus" TEXT,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "listingType" TEXT,
ADD COLUMN     "mediaPolicy" TEXT,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoKeywords" TEXT[],
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "sourceNotes" TEXT[],
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "targetAudiences" TEXT[],
ADD COLUMN     "tealSignalMap" JSONB;

-- CreateTable
CREATE TABLE "VerifiedReview" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publicDirectoryListingId" TEXT NOT NULL,
    "reviewerName" TEXT,
    "reviewerRole" TEXT,
    "relationship" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "verificationStatus" TEXT NOT NULL,
    "source" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerifiedReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingBuildJob" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetName" TEXT NOT NULL,
    "targetWebsite" TEXT,
    "targetCategory" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "sourceUrls" TEXT[],
    "extractedFacts" JSONB,
    "generatedDraft" JSONB,
    "mediaLicenseStatus" TEXT,
    "humanReviewStatus" TEXT NOT NULL,
    "publishCandidate" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListingBuildJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VerifiedReview" ADD CONSTRAINT "VerifiedReview_publicDirectoryListingId_fkey" FOREIGN KEY ("publicDirectoryListingId") REFERENCES "PublicDirectoryListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
