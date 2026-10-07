/*
  Warnings:

  - You are about to drop the column `screenId` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `content` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_screenId_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "screenId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "productType" "ProductType" NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Screen" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
