/*
  Warnings:

  - You are about to drop the column `contract_info_uuid` on the `business_data` table. All the data in the column will be lost.
  - Added the required column `business_info_uuid` to the `contract_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "business_data" DROP CONSTRAINT "business_data_contract_info_uuid_fkey";

-- AlterTable
ALTER TABLE "business_data" DROP COLUMN "contract_info_uuid";

-- AlterTable
ALTER TABLE "contract_info" ADD COLUMN     "business_info_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "contract_info" ADD CONSTRAINT "contract_info_business_info_uuid_fkey" FOREIGN KEY ("business_info_uuid") REFERENCES "business_data"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
