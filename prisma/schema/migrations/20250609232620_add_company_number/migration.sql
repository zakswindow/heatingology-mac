/*
  Warnings:

  - Added the required column `companyNumber` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Engineer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EngineerTitle" AS ENUM ('MR', 'MRS', 'MS', 'DR', 'MX');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "companyNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Engineer" ADD COLUMN     "title" "EngineerTitle" NOT NULL;
