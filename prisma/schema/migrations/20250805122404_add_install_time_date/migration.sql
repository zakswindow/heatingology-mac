/*
  Warnings:

  - Made the column `contactNumber` on table `Survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `Survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gasMeterAreaImage` on table `Survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frontOfPropertyImage` on table `Survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `proposedBoilerLocationImage` on table `Survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `areaBelowBoilerImage` on table `Survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `flueImage` on table `Survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `areaAboveBoilerImage` on table `Survey` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProductType" ADD VALUE 'INTALL_TIME';
ALTER TYPE "ProductType" ADD VALUE 'INTALL_DATE';

-- AlterTable
ALTER TABLE "Survey" ALTER COLUMN "contactNumber" SET NOT NULL,
ALTER COLUMN "note" SET NOT NULL,
ALTER COLUMN "gasMeterAreaImage" SET NOT NULL,
ALTER COLUMN "frontOfPropertyImage" SET NOT NULL,
ALTER COLUMN "proposedBoilerLocationImage" SET NOT NULL,
ALTER COLUMN "areaBelowBoilerImage" SET NOT NULL,
ALTER COLUMN "flueImage" SET NOT NULL,
ALTER COLUMN "areaAboveBoilerImage" SET NOT NULL;
