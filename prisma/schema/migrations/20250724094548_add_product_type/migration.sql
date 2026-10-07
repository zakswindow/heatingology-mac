-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProductType" ADD VALUE 'BOILER_INCLUDED';
ALTER TYPE "ProductType" ADD VALUE 'BOILER_NOT_INCLUDED';
ALTER TYPE "ProductType" ADD VALUE 'BOILER_EXTRA';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "brand" DROP NOT NULL,
ALTER COLUMN "productImage" DROP NOT NULL;
