/*
  Warnings:

  - You are about to drop the column `gasSafeLicense` on the `Engineer` table. All the data in the column will be lost.
  - Added the required column `gasSafeLicense` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "gasSafeLicense" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Engineer" DROP COLUMN "gasSafeLicense";
