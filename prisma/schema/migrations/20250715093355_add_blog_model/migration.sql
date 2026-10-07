-- CreateEnum
CREATE TYPE "BLOG_CATEGORIES" AS ENUM ('VIEW_ALL', 'HOME_HEATING', 'CUSTOMER_STORIES', 'BOILER_GUIDE', 'HEAT_PUMP_GUIDE');

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "category" "BLOG_CATEGORIES",
    "image" TEXT,
    "readingTime" INTEGER DEFAULT 0,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
