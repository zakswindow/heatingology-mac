-- AlterTable
ALTER TABLE "Qualification" ADD COLUMN     "categoryId" "QUALIFICATION_CATEGORY" NOT NULL DEFAULT 'OTHER';

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "QualificationCategory"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
