/*
  Warnings:

  - You are about to alter the column `price` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `extraPrice` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Quote" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "extraPrice" SET DATA TYPE DECIMAL(10,2);

-- CreateTable
CREATE TABLE "_ProductToQuote" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductToQuote_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductToQuote_B_index" ON "_ProductToQuote"("B");

-- AddForeignKey
ALTER TABLE "_ProductToQuote" ADD CONSTRAINT "_ProductToQuote_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToQuote" ADD CONSTRAINT "_ProductToQuote_B_fkey" FOREIGN KEY ("B") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
