/*
  Warnings:

  - You are about to drop the column `benefits` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `financeOpts` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quality` on the `Product` table. All the data in the column will be lost.
  - Added the required column `homeowner` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landlord` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxBath` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxBed` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minBath` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minBed` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BOILER_TYPES" AS ENUM ('COMBI', 'SYSTEM', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "benefits",
DROP COLUMN "financeOpts",
DROP COLUMN "name",
DROP COLUMN "quality",
ADD COLUMN     "boilerType" "BOILER_TYPES" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "homeowner" BOOLEAN NOT NULL,
ADD COLUMN     "landlord" BOOLEAN NOT NULL,
ADD COLUMN     "maxBath" INTEGER NOT NULL,
ADD COLUMN     "maxBed" INTEGER NOT NULL,
ADD COLUMN     "minBath" INTEGER NOT NULL,
ADD COLUMN     "minBed" INTEGER NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "specs" TEXT[],
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rating" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Boiler" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Boiler_pkey" PRIMARY KEY ("id")
);
