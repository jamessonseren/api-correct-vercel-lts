/*
  Warnings:

  - Added the required column `business_document` to the `business_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_users" ADD COLUMN     "business_document" TEXT NOT NULL;
