/*
  Warnings:

  - You are about to drop the `branch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_data" DROP CONSTRAINT "business_data_branch_uuid_fkey";

-- DropTable
DROP TABLE "branch";

-- CreateTable
CREATE TABLE "branch_info" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "benefits_uuid" TEXT[],
    "marketing_tax" INTEGER NOT NULL,
    "admin_tax" INTEGER NOT NULL,

    CONSTRAINT "branch_info_pkey" PRIMARY KEY ("uuid")
);
