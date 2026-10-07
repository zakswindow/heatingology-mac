/*
  Warnings:

  - You are about to drop the `Boiler` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GAS', 'LPG', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "FlueType" AS ENUM ('HORIZONTAL', 'VERTICAL', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "flueType" "FlueType" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "fuelType" "FuelType" NOT NULL DEFAULT 'UNKNOWN';

-- DropTable
DROP TABLE "Boiler";
