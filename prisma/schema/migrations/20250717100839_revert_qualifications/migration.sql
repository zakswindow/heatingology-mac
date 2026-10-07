/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Qualification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_categoryId_fkey";

-- AlterTable
ALTER TABLE "Qualification" DROP COLUMN "categoryId";
