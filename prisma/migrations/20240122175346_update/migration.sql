/*
  Warnings:

  - You are about to drop the column `document` on the `business_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[admin_document]` on the table `business_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `business_document` to the `business_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "business_users_document_key";

-- AlterTable
ALTER TABLE "business_users" DROP COLUMN "document",
ADD COLUMN     "admin_document" TEXT,
ADD COLUMN     "business_document" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "business_users_admin_document_key" ON "business_users"("admin_document");
