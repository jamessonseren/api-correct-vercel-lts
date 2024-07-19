/*
  Warnings:

  - The `salary` column on the `user_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user_info" DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER;
