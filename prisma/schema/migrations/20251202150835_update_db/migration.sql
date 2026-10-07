/*
  Warnings:

  - The values [ev_cable] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `productImages` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('boiler', 'heatPump', 'ev_charger', 'boiler_service', 'boiler_repair', 'boiler_add_ons', 'boiler_included', 'boiler_not_included', 'boiler_extra', 'install_time', 'install_date', 'ev_charger_extra');
ALTER TABLE "Product" ALTER COLUMN "productType" TYPE "ProductType_new" USING ("productType"::text::"ProductType_new");
ALTER TABLE "Quote" ALTER COLUMN "productType" TYPE "ProductType_new" USING ("productType"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productImages";
