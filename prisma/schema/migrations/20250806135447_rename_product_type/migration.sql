/*
  Warnings:

  - The values [BOILER,HEAT_PUMP,EV_CHARGER,BOILER_SERVICING,BOILER_REPAIR,BOILER_ADD_ONS,BOILER_INCLUDED,BOILER_NOT_INCLUDED,BOILER_EXTRA,INSTALL_TIME,INSTALL_DATE] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('boiler', 'heatPump', 'ev_charger', 'boiler_service', 'boiler_repair', 'boiler_add_ons', 'boiler_included', 'boiler_not_included', 'boiler_extra', 'install_time', 'install_date');
ALTER TABLE "Product" ALTER COLUMN "productType" TYPE "ProductType_new" USING ("productType"::text::"ProductType_new");
ALTER TABLE "Quote" ALTER COLUMN "productType" TYPE "ProductType_new" USING ("productType"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;
