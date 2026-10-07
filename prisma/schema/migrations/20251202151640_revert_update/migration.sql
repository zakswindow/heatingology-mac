-- AlterEnum
ALTER TYPE "ProductType" ADD VALUE 'ev_cable';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productImages" TEXT[] DEFAULT ARRAY[]::TEXT[];
