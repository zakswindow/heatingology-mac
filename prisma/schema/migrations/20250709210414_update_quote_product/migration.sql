/*
  Warnings:

  - You are about to drop the `_ProductToQuote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToQuote" DROP CONSTRAINT "_ProductToQuote_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToQuote" DROP CONSTRAINT "_ProductToQuote_B_fkey";

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "productId" TEXT;

-- DropTable
DROP TABLE "_ProductToQuote";

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
