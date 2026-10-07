-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('Pending', 'Paid', 'Completed');

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "status" "QuoteStatus" NOT NULL DEFAULT 'Pending';
