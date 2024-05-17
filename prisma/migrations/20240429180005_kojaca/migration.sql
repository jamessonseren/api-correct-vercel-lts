-- AlterTable
ALTER TABLE "user_info" ADD COLUMN     "document_validation" JSONB[] DEFAULT ARRAY[]::JSONB[];
