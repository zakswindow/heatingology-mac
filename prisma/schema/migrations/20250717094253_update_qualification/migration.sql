/*
  Warnings:

  - You are about to drop the column `category` on the `Qualification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QUALIFICATION_CATEGORY" AS ENUM ('GAS_SAFE', 'INSTALL_ABILITIES', 'TECHNICAL_ABILITIES', 'OTHER');

-- AlterTable
ALTER TABLE "Qualification" DROP COLUMN "category",
ADD COLUMN     "categoryId" "QUALIFICATION_CATEGORY";

-- DropEnum
DROP TYPE "QualificationCategory";

-- CreateTable
CREATE TABLE "QualificationCategory" (
    "categoryId" "QUALIFICATION_CATEGORY" NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "QualificationCategory_categoryId_key" ON "QualificationCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "QualificationCategory"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;
