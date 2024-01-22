/*
  Warnings:

  - Added the required column `user_name` to the `business_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_users" ADD COLUMN     "user_name" TEXT NOT NULL;
