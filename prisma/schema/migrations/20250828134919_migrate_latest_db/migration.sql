-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "isLandlordAddressBusiness" BOOLEAN,
ADD COLUMN     "landlordAddressCity" TEXT,
ADD COLUMN     "landlordAddressCounty" TEXT,
ADD COLUMN     "landlordAddressLine1" TEXT,
ADD COLUMN     "landlordAddressLine2" TEXT,
ADD COLUMN     "landlordPostcode" TEXT,
ADD COLUMN     "userType" TEXT;
