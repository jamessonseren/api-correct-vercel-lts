/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `user_info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `user_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_info" ADD COLUMN     "document" TEXT NOT NULL,
ALTER COLUMN "document2" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_info_document_key" ON "user_info"("document");
