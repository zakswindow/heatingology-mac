-- CreateEnum
CREATE TYPE "CustomerTitle" AS ENUM ('MR', 'MISS', 'MRS', 'MS');

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "title" "CustomerTitle" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT,
    "note" TEXT,
    "gasMeterAreaImage" TEXT,
    "frontOfPropertyImage" TEXT,
    "proposedBoilerLocationImage" TEXT,
    "areaBelowBoilerImage" TEXT,
    "flueImage" TEXT,
    "areaAboveBoilerImage" TEXT,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);
