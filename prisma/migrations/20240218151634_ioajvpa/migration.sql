/*
  Warnings:

  - The `status` column on the `business_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('pending_approval', 'pending_contract', 'active', 'inactive');

-- AlterTable
ALTER TABLE "business_data" DROP COLUMN "status",
ADD COLUMN     "status" "BusinessStatus" NOT NULL DEFAULT 'pending_approval';
