/*
  Warnings:

  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productImage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quality` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('BOILER', 'HEAT_PUMP', 'EV_CHARGER', 'BOILER_SERVICING', 'BOILER_REPAIR');

-- CreateEnum
CREATE TYPE "ProductQuality" AS ENUM ('GOOD', 'BETTER', 'BEST');

-- CreateEnum
CREATE TYPE "ProductFinanceOpts" AS ENUM ('ZERO_APR', 'YEARS_ZERO_APR');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "financeOpts" "ProductFinanceOpts"[],
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "productImage" TEXT NOT NULL,
ADD COLUMN     "productType" "ProductType" NOT NULL,
ADD COLUMN     "quality" "ProductQuality" NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "screenId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
