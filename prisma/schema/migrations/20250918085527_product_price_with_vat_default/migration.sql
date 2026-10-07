/*
  Warnings:

  - Made the column `priceWithVat` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "priceWithVat" SET NOT NULL;
