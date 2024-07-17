/*
  Warnings:

  - You are about to drop the column `benefits_uuid` on the `branch_info` table. All the data in the column will be lost.
  - You are about to drop the `benefits` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `business_info_uuid` to the `contract_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "business_data" DROP CONSTRAINT "business_data_branch_info_uuid_fkey";

-- AlterTable
ALTER TABLE "branch_info" DROP COLUMN "benefits_uuid";

-- AlterTable
ALTER TABLE "contract_info" ADD COLUMN     "business_info_uuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "benefits";

-- DropEnum
DROP TYPE "BenefitType";

-- CreateTable
CREATE TABLE "items" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,
    "item_category" TEXT NOT NULL,
    "parent_uuid" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    CONSTRAINT "items_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "branch_item" (
    "uuid" TEXT NOT NULL,
    "branchInfo_uuid" TEXT NOT NULL,
    "item_uuid" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "branch_item_pkey" PRIMARY KEY ("uuid")
);
