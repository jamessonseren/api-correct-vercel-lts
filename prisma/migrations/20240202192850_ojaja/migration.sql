-- AlterTable
ALTER TABLE "user_document_validation" ALTER COLUMN "document_front_status" SET DEFAULT 'under_analysis',
ALTER COLUMN "document_back_status" SET DEFAULT 'under_analysis',
ALTER COLUMN "selfie_status" SET DEFAULT 'under_analysis',
ALTER COLUMN "document_selfie_status" SET DEFAULT 'under_analysis';
