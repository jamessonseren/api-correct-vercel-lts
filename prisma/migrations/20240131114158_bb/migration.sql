/*
  Warnings:

  - Made the column `address_uuid` on table `user_info` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_address_uuid_fkey";

-- AlterTable
ALTER TABLE "user_info" ALTER COLUMN "address_uuid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_address_uuid_fkey" FOREIGN KEY ("address_uuid") REFERENCES "addresses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
