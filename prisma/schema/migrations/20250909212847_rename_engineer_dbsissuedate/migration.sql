/*
  Warnings:

  - You are about to drop the column `dbsExpiryDate` on the `Engineer` table. All the data in the column will be lost.
  - Added the required column `dbsIssueDate` to the `Engineer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Engineer" DROP COLUMN "dbsExpiryDate",
ADD COLUMN     "dbsIssueDate" TIMESTAMP(3) NOT NULL;
