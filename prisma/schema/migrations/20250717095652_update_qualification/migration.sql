/*
  Warnings:

  - Made the column `categoryId` on table `Qualification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_categoryId_fkey";

-- AlterTable
ALTER TABLE "Qualification" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "QualificationCategory"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
