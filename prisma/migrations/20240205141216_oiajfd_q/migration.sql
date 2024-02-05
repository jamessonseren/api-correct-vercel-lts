/*
  Warnings:

  - Made the column `user_document_validation_uuid` on table `user_info` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_user_document_validation_uuid_fkey";

-- AlterTable
ALTER TABLE "user_document_validation" ALTER COLUMN "document_front_base64" DROP NOT NULL,
ALTER COLUMN "document_back_base64" DROP NOT NULL,
ALTER COLUMN "document_selfie_base64" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_info" ALTER COLUMN "user_document_validation_uuid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_document_validation_uuid_fkey" FOREIGN KEY ("user_document_validation_uuid") REFERENCES "user_document_validation"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
