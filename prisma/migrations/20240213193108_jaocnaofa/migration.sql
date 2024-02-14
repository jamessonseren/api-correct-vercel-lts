/*
  Warnings:

  - You are about to drop the column `business_info_uuid` on the `contract_info` table. All the data in the column will be lost.
  - Added the required column `branch_info_uuid` to the `contract_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `contract_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contract_info" DROP CONSTRAINT "contract_info_business_info_uuid_fkey";

-- AlterTable
ALTER TABLE "business_data" ADD COLUMN     "contract_info_uuid" TEXT;

-- AlterTable
ALTER TABLE "contract_info" DROP COLUMN "business_info_uuid",
ADD COLUMN     "branch_info_uuid" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "version" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "business_data" ADD CONSTRAINT "business_data_contract_info_uuid_fkey" FOREIGN KEY ("contract_info_uuid") REFERENCES "contract_info"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_info" ADD CONSTRAINT "contract_info_branch_info_uuid_fkey" FOREIGN KEY ("branch_info_uuid") REFERENCES "branch_info"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
