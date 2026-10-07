/*
  Warnings:

  - The values [OTHER] on the enum `QualificationCategory` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `subCategory` to the `Qualification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QualificationCategory_new" AS ENUM ('GAS_SAFE', 'INSTALL_ABILITIES', 'TECHNICAL_ABILITIES');
ALTER TABLE "Qualification" ALTER COLUMN "category" TYPE "QualificationCategory_new" USING ("category"::text::"QualificationCategory_new");
ALTER TYPE "QualificationCategory" RENAME TO "QualificationCategory_old";
ALTER TYPE "QualificationCategory_new" RENAME TO "QualificationCategory";
DROP TYPE "QualificationCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "Qualification" ADD COLUMN     "subCategory" TEXT NOT NULL;
