/*
  Warnings:

  - You are about to drop the column `inuranceExpiryDate` on the `Engineer` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `insuranceExpiryDate` to the `Engineer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('LIMITED_COMPANY', 'SOLE_TRADER');

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "type",
ADD COLUMN     "type" "CompanyType" NOT NULL;

-- AlterTable
ALTER TABLE "Engineer" DROP COLUMN "inuranceExpiryDate",
ADD COLUMN     "insuranceExpiryDate" TIMESTAMP(3) NOT NULL;
