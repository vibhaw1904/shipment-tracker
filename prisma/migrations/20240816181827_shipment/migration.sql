/*
  Warnings:

  - Added the required column `address` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "placedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Processing';
