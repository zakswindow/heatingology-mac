-- AlterEnum
ALTER TYPE "ProductType" ADD VALUE 'BOILER_ADD_ONS';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "excluded" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "included" TEXT[] DEFAULT ARRAY[]::TEXT[];
