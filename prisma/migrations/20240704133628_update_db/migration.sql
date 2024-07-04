-- DropForeignKey
ALTER TABLE "business_data" DROP CONSTRAINT "business_data_branch_info_uuid_fkey";

-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "line1" DROP NOT NULL,
ALTER COLUMN "line2" DROP NOT NULL,
ALTER COLUMN "neighborhood" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;

-- AlterTable
ALTER TABLE "business_data" ADD COLUMN     "branch_name" TEXT,
ALTER COLUMN "branch_info_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "business_data" ADD CONSTRAINT "business_data_branch_info_uuid_fkey" FOREIGN KEY ("branch_info_uuid") REFERENCES "branch_info"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
