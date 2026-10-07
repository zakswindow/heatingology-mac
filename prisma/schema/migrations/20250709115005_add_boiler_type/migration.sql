/*
  Warnings:

  - The `boilerType` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BoilerType" AS ENUM ('COMBI', 'SYSTEM', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "boilerType",
ADD COLUMN     "boilerType" "BoilerType" NOT NULL DEFAULT 'UNKNOWN';

-- DropEnum
DROP TYPE "BOILER_TYPES";
