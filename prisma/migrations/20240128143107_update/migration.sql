/*
  Warnings:

  - The `status` column on the `business_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `admin_document` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `business_document` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `is_client` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `authenticated` on the `user_info` table. All the data in the column will be lost.
  - The `status` column on the `user_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[document]` on the table `business_users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `business_info_uuid` on table `business_users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'active', 'inactive');

-- DropForeignKey
ALTER TABLE "business_users" DROP CONSTRAINT "business_users_business_info_uuid_fkey";

-- DropIndex
DROP INDEX "business_users_admin_document_key";

-- AlterTable
ALTER TABLE "business_data" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "business_users" DROP COLUMN "admin_document",
DROP COLUMN "business_document",
DROP COLUMN "is_active",
DROP COLUMN "is_client",
ADD COLUMN     "document" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending',
ALTER COLUMN "business_info_uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_info" DROP COLUMN "authenticated",
ADD COLUMN     "is_authenticated" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE "BranchInfo" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "benefit_uuid" TEXT NOT NULL,

    CONSTRAINT "BranchInfo_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_users_document_key" ON "business_users"("document");

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_business_info_uuid_fkey" FOREIGN KEY ("business_info_uuid") REFERENCES "business_data"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
