/*
  Warnings:

  - The values [shipped,delivered] on the enum `OnRampStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnRampStatus_new" AS ENUM ('Ordered', 'Shipped', 'out_for_delivery', 'Delivered', 'Canceled');
ALTER TABLE "Shipment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Shipment" ALTER COLUMN "status" TYPE "OnRampStatus_new" USING ("status"::text::"OnRampStatus_new");
ALTER TYPE "OnRampStatus" RENAME TO "OnRampStatus_old";
ALTER TYPE "OnRampStatus_new" RENAME TO "OnRampStatus";
DROP TYPE "OnRampStatus_old";
ALTER TABLE "Shipment" ALTER COLUMN "status" SET DEFAULT 'Ordered';
COMMIT;
