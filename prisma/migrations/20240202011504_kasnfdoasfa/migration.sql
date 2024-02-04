/*
  Warnings:

  - Added the required column `user_document_validation_uuid` to the `user_info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserDocumentValidationStatus" AS ENUM ('approved', 'denied', 'pending_to_send', 'under_analysis');

-- AlterTable
ALTER TABLE "user_info" ADD COLUMN     "user_document_validation_uuid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "user_document_validation" (
    "uuid" TEXT NOT NULL,
    "document_front_base64" TEXT NOT NULL,
    "document_front_status" "UserDocumentValidationStatus" NOT NULL,
    "document_back_base64" TEXT NOT NULL,
    "document_back_status" "UserDocumentValidationStatus" NOT NULL,
    "selfie_base64" TEXT,
    "selfie_status" "UserDocumentValidationStatus" NOT NULL,
    "document_selfie_base64" TEXT NOT NULL,
    "document_selfie_status" "UserDocumentValidationStatus" NOT NULL,

    CONSTRAINT "user_document_validation_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_document_validation_uuid_fkey" FOREIGN KEY ("user_document_validation_uuid") REFERENCES "user_document_validation"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
