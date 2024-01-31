/*
  Warnings:

  - Made the column `address_uuid` on table `business_data` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "business_data" DROP CONSTRAINT "business_data_address_uuid_fkey";

-- AlterTable
ALTER TABLE "business_data" ALTER COLUMN "address_uuid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "business_data" ADD CONSTRAINT "business_data_address_uuid_fkey" FOREIGN KEY ("address_uuid") REFERENCES "addresses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
