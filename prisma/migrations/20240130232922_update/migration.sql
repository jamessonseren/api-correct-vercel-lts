/*
  Warnings:

  - You are about to drop the `business_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_category" DROP CONSTRAINT "business_category_benefit_uuid_fkey";

-- DropForeignKey
ALTER TABLE "business_data" DROP CONSTRAINT "business_data_branch_uuid_fkey";

-- DropTable
DROP TABLE "business_category";

-- CreateTable
CREATE TABLE "branch" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "benefit_uuid" TEXT NOT NULL,
    "marketing_tax" INTEGER NOT NULL,
    "admin_tax" INTEGER NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "branch" ADD CONSTRAINT "branch_benefit_uuid_fkey" FOREIGN KEY ("benefit_uuid") REFERENCES "benefits"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_data" ADD CONSTRAINT "business_data_branch_uuid_fkey" FOREIGN KEY ("branch_uuid") REFERENCES "branch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
