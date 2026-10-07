/*
  Warnings:

  - You are about to drop the column `category` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BLOG_CATEGORIES" ADD VALUE 'UNKONWN';

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "category",
ADD COLUMN     "categoryId" "BLOG_CATEGORIES" NOT NULL;

-- CreateTable
CREATE TABLE "BlogCategory" (
    "id" SERIAL NOT NULL,
    "categoryId" "BLOG_CATEGORIES" NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_categoryId_key" ON "BlogCategory"("categoryId");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BlogCategory"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
