-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "descriptionMarkdown" TEXT DEFAULT '',
ALTER COLUMN "dimensions" SET DEFAULT '{}'::jsonb;
