/*
  Warnings:

  - The `tags` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "metaDescription" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "metaTitle" TEXT NOT NULL DEFAULT '';

-- AlterTable
-- ALTER TABLE "Product" ALTER COLUMN "dimensions" SET DEFAULT '{}'::jsonb,
-- DROP COLUMN "tags",
-- ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Product" ALTER COLUMN "tags" TYPE TEXT[] USING "tags"::text[];