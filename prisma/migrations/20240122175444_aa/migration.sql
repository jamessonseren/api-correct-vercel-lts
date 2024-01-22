/*
  Warnings:

  - A unique constraint covering the columns `[business_document]` on the table `business_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "business_users_business_document_key" ON "business_users"("business_document");
