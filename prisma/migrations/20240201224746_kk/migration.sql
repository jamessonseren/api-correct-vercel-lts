/*
  Warnings:

  - The `document_validation` column on the `user_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user_info" DROP COLUMN "document_validation",
ADD COLUMN     "document_validation" JSONB[];
