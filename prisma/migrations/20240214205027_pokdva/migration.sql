/*
  Warnings:

  - You are about to drop the column `market_palce_tax` on the `branch_info` table. All the data in the column will be lost.
  - Added the required column `market_place_tax` to the `branch_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "branch_info" DROP COLUMN "market_palce_tax",
ADD COLUMN     "market_place_tax" INTEGER NOT NULL;
