-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('LIMITED_COMPANY', 'SOLE_TRADER');

-- CreateEnum
CREATE TYPE "QualificationCategory" AS ENUM ('GAS_SAFE', 'INSTALL_ABILITIES', 'TECHNICAL_ABILITIES');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'CANCELLED', 'DONE');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

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
    "insuranceExpiryDate" TIMESTAMP(3) NOT NULL,
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
    "type" "CompanyType" NOT NULL,
    "vatRegistered" BOOLEAN NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "QualificationCategory",
    "subCategory" TEXT,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngineerQualifications" (
    "id" SERIAL NOT NULL,
    "engineerId" TEXT NOT NULL,
    "qualificationId" INTEGER NOT NULL,

    CONSTRAINT "EngineerQualifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "customerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAmout" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Heater" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Heater_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EngineerQualifications_engineerId_qualificationId_key" ON "EngineerQualifications"("engineerId", "qualificationId");

-- AddForeignKey
ALTER TABLE "Engineer" ADD CONSTRAINT "Engineer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineerQualifications" ADD CONSTRAINT "EngineerQualifications_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineerQualifications" ADD CONSTRAINT "EngineerQualifications_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
