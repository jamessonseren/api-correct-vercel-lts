/*
  Warnings:

  - You are about to drop the column `contract_info_uuid` on the `business_data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_data" DROP CONSTRAINT "business_data_contract_info_uuid_fkey";

-- AlterTable
ALTER TABLE "business_data" DROP COLUMN "contract_info_uuid";

-- CreateTable
CREATE TABLE "business_contract" (
    "uuid" TEXT NOT NULL,
    "business_info_uuid" TEXT NOT NULL,
    "contract_info_uuid" TEXT NOT NULL,

    CONSTRAINT "business_contract_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_BusinessInfoToContractInfo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessInfoToContractInfo_AB_unique" ON "_BusinessInfoToContractInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessInfoToContractInfo_B_index" ON "_BusinessInfoToContractInfo"("B");

-- AddForeignKey
ALTER TABLE "business_contract" ADD CONSTRAINT "business_contract_business_info_uuid_fkey" FOREIGN KEY ("business_info_uuid") REFERENCES "business_data"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_contract" ADD CONSTRAINT "business_contract_contract_info_uuid_fkey" FOREIGN KEY ("contract_info_uuid") REFERENCES "contract_info"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessInfoToContractInfo" ADD CONSTRAINT "_BusinessInfoToContractInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "business_data"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessInfoToContractInfo" ADD CONSTRAINT "_BusinessInfoToContractInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "contract_info"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
