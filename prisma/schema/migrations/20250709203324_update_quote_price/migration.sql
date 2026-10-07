/*
  Warnings:

  - You are about to alter the column `price` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `extraPrice` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Quote" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "extraPrice" SET DATA TYPE DECIMAL(10,2);
