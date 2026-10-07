/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "HTML_TAG" AS ENUM ('PARAGRAPH', 'LIST', 'HEADER', 'NONE');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "tag" "HTML_TAG" NOT NULL,
    "content" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
