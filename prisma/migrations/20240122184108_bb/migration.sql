/*
  Warnings:

  - The `status` column on the `companies_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "companies_data" ALTER COLUMN "corporate_reason" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;
