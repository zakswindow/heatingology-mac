-- CreateTable
CREATE TABLE "Screen" (
    "id" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("id")
);
