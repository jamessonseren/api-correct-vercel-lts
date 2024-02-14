/*
  Warnings:

  - Added the required column `market_palce_tax` to the `branch_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "branch_info" ADD COLUMN     "market_palce_tax" INTEGER NOT NULL;
