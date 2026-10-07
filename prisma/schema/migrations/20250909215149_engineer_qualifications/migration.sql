/*
  Warnings:

  - You are about to drop the `EngineerQualifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EngineerQualifications" DROP CONSTRAINT "EngineerQualifications_engineerId_fkey";

-- DropForeignKey
ALTER TABLE "EngineerQualifications" DROP CONSTRAINT "EngineerQualifications_qualificationId_fkey";

-- DropTable
DROP TABLE "EngineerQualifications";

-- CreateTable
CREATE TABLE "_EngQualifications" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EngQualifications_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EngQualifications_B_index" ON "_EngQualifications"("B");

-- AddForeignKey
ALTER TABLE "_EngQualifications" ADD CONSTRAINT "_EngQualifications_A_fkey" FOREIGN KEY ("A") REFERENCES "Engineer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EngQualifications" ADD CONSTRAINT "_EngQualifications_B_fkey" FOREIGN KEY ("B") REFERENCES "Qualification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
