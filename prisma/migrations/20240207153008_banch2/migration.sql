/*
  Warnings:

  - Added the required column `created_at` to the `branch_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "branch_info" ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "updated_at" TEXT;
