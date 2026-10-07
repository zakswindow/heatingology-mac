-- AlterEnum
ALTER TYPE "ProductType" ADD VALUE 'ev_included';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "dimensions" SET DEFAULT '{}'::jsonb;
