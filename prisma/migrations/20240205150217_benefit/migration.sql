-- DropForeignKey
ALTER TABLE "branch" DROP CONSTRAINT "branch_benefit_uuid_fkey";

-- DropForeignKey
ALTER TABLE "users_wallet" DROP CONSTRAINT "users_wallet_benefit_uuid_fkey";

-- AlterTable
ALTER TABLE "benefits" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" SET DATA TYPE TEXT;
