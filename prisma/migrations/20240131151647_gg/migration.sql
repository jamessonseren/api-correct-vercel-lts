/*
  Warnings:

  - Made the column `user_info_uuid` on table `users_auth` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users_auth" DROP CONSTRAINT "users_auth_user_info_uuid_fkey";

-- AlterTable
ALTER TABLE "users_auth" ALTER COLUMN "user_info_uuid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users_auth" ADD CONSTRAINT "users_auth_user_info_uuid_fkey" FOREIGN KEY ("user_info_uuid") REFERENCES "user_info"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
