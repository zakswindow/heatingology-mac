/*
  Warnings:

  - Added the required column `addressCity` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressCounty` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressLine1` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressLine2` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installDate` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installTime` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "addressCity" TEXT NOT NULL,
ADD COLUMN     "addressCounty" TEXT NOT NULL,
ADD COLUMN     "addressLine1" TEXT NOT NULL,
ADD COLUMN     "addressLine2" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "extraPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "installDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "installTime" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
