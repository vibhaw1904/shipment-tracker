/*
  Warnings:

  - The `status` column on the `Shipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OnRampStatus" AS ENUM ('Ordered', 'shipped', 'out_for_delivery', 'delivered');

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "status",
ADD COLUMN     "status" "OnRampStatus" NOT NULL DEFAULT 'Ordered';
