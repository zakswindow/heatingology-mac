-- CreateEnum
CREATE TYPE "QualificationCategory" AS ENUM ('GAS_SAFE', 'INSTALL_ABILITIES', 'TECHNICAL_ABILITIES', 'OTHER');

-- CreateTable
CREATE TABLE "Engineer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gasSafeLicense" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "profileUrl" TEXT NOT NULL,
    "gasSafeCardFrontUrl" TEXT NOT NULL,
    "gasSafeCardRearUrl" TEXT NOT NULL,
    "gasSafeCardExpiryDate" TIMESTAMP(3) NOT NULL,
    "ccnUrl" TEXT NOT NULL,
    "ccnExpiryDate" TIMESTAMP(3) NOT NULL,
    "insuranceUrl" TEXT NOT NULL,
    "inuranceExpiryDate" TIMESTAMP(3) NOT NULL,
    "fgaUrl" TEXT NOT NULL,
    "fgaExpiryDate" TIMESTAMP(3) NOT NULL,
    "dbsUrl" TEXT NOT NULL,
    "dbsExpiryDate" TIMESTAMP(3) NOT NULL,
    "locations" TEXT[],

    CONSTRAINT "Engineer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gasSafeNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "vatRegistered" BOOLEAN NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "QualificationCategory" NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngineerQualifications" (
    "id" SERIAL NOT NULL,
    "engineerId" TEXT NOT NULL,
    "qualificationId" INTEGER NOT NULL,

    CONSTRAINT "EngineerQualifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EngineerQualifications_engineerId_qualificationId_key" ON "EngineerQualifications"("engineerId", "qualificationId");

-- AddForeignKey
ALTER TABLE "Engineer" ADD CONSTRAINT "Engineer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineerQualifications" ADD CONSTRAINT "EngineerQualifications_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineerQualifications" ADD CONSTRAINT "EngineerQualifications_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
