/*
  Warnings:

  - Made the column `full_name` on table `user_info` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_info" ALTER COLUMN "full_name" SET NOT NULL,
ALTER COLUMN "date_of_birth" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "user_validation" (
    "uuid" TEXT NOT NULL,
    "face" TEXT NOT NULL,
    "document_front" TEXT NOT NULL,
    "document_back" TEXT NOT NULL,
    "face_and_document_front" TEXT NOT NULL,
    "user_info_uuid" TEXT NOT NULL,

    CONSTRAINT "user_validation_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "user_validation" ADD CONSTRAINT "user_validation_user_info_uuid_fkey" FOREIGN KEY ("user_info_uuid") REFERENCES "user_info"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
