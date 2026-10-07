/*
  Warnings:

  - You are about to drop the column `readingTime` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "readingTime",
ADD COLUMN     "readTime" INTEGER DEFAULT 0;
