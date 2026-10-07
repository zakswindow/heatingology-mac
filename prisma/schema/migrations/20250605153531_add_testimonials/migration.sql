-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Testimonials" (
    "customerName" TEXT NOT NULL,
    "customerRole" TEXT NOT NULL,
    "statement" TEXT NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("customerName","customerRole")
);
