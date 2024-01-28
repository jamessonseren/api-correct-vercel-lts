/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `business_data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "business_data_email_key" ON "business_data"("email");
