-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('POPULAR');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "tags" "TagType"[] DEFAULT ARRAY[]::"TagType"[],
ALTER COLUMN "dimensions" SET DEFAULT '{}'::jsonb;
