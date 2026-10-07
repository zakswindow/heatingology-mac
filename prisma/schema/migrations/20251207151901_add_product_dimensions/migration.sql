-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "dimensions" JSONB DEFAULT '{}'::jsonb;
