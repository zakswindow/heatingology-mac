-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "dimensions" SET DEFAULT '{}'::jsonb;

-- AlterTable
ALTER TABLE "Survey" ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "gasMeterAreaImage" DROP NOT NULL,
ALTER COLUMN "frontOfPropertyImage" DROP NOT NULL,
ALTER COLUMN "proposedBoilerLocationImage" DROP NOT NULL,
ALTER COLUMN "areaBelowBoilerImage" DROP NOT NULL,
ALTER COLUMN "flueImage" DROP NOT NULL,
ALTER COLUMN "areaAboveBoilerImage" DROP NOT NULL;
