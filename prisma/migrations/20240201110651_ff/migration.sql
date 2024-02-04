/*
  Warnings:

  - You are about to drop the `user_validation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_validation" DROP CONSTRAINT "user_validation_user_info_uuid_fkey";

-- AlterTable
ALTER TABLE "user_info" ADD COLUMN     "document_validation" JSONB[];

-- DropTable
DROP TABLE "user_validation";
