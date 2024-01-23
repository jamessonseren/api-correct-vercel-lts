-- AlterTable
ALTER TABLE "business_data" ADD COLUMN     "block_list" TEXT[] DEFAULT ARRAY[]::TEXT[];
