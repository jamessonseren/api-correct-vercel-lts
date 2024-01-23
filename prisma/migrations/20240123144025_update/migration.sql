-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('all', 'sales', 'finances', 'marketing', 'benefits', 'transports', 'allPartners', 'allEmployers');

-- CreateEnum
CREATE TYPE "BusinessTypeOptions" AS ENUM ('empregador', 'comercio', 'autonomo_comercio', 'empregador_comercio');

-- CreateTable
CREATE TABLE "correct_admin" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "correct_admin_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "business_users" (
    "uuid" TEXT NOT NULL,
    "business_info_uuid" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "business_document" TEXT NOT NULL,
    "admin_document" TEXT,
    "name" TEXT,
    "email" TEXT,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "function" TEXT,
    "permissions" "Permissions"[] DEFAULT ARRAY['all']::"Permissions"[],
    "is_client" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "business_users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "business_category" (
    "uuid" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "business_category_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "business_data" (
    "uuid" TEXT NOT NULL,
    "address_uuid" TEXT,
    "contract_info_uuid" TEXT,
    "fantasy_name" TEXT NOT NULL,
    "corporate_reason" TEXT,
    "document" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "colaborators_number" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "phone_1" TEXT NOT NULL,
    "phone_2" TEXT,
    "business_category_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "business_type" "BusinessTypeOptions" NOT NULL,

    CONSTRAINT "business_data_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "addresses" (
    "uuid" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT NOT NULL,
    "line3" TEXT,
    "postal_code" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user_info" (
    "uuid" TEXT NOT NULL,
    "business_info_uuid" TEXT,
    "address_uuid" TEXT,
    "document" TEXT NOT NULL,
    "document2" TEXT,
    "document3" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "display_name" TEXT,
    "internal_company_code" TEXT,
    "gender" TEXT,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "salary" TEXT,
    "company_owner" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "driver_license" TEXT,
    "function" TEXT,
    "authenticated" BOOLEAN NOT NULL DEFAULT false,
    "marital_status" TEXT,
    "dependents_quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "users_auth" (
    "uuid" TEXT NOT NULL,
    "user_info_uuid" TEXT,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_auth_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "benefits" (
    "uuid" TEXT NOT NULL,
    "contract_info_uuid" TEXT NOT NULL,
    "business_info_uuid" TEXT NOT NULL,
    "benefit_name" TEXT NOT NULL,
    "benefit_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "benefits_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "users_wallet" (
    "uuid" TEXT NOT NULL,
    "user_info_uuid" TEXT NOT NULL,
    "benefit_uuid" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_wallet_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "contract_info" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contract_info_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "transactions" (
    "uuid" TEXT NOT NULL,
    "payer_wallet_uuid" TEXT NOT NULL,
    "favored_uuid" TEXT NOT NULL,
    "business_info_uuid" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "fee_amount" INTEGER NOT NULL,
    "cashback" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "correct_admin_userName_key" ON "correct_admin"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "correct_admin_email_key" ON "correct_admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "business_users_admin_document_key" ON "business_users"("admin_document");

-- CreateIndex
CREATE UNIQUE INDEX "business_users_email_key" ON "business_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "business_data_document_key" ON "business_data"("document");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_document_key" ON "user_info"("document");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_document2_key" ON "user_info"("document2");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_document3_key" ON "user_info"("document3");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_driver_license_key" ON "user_info"("driver_license");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_document_key" ON "users_auth"("document");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_email_key" ON "users_auth"("email");

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_business_info_uuid_fkey" FOREIGN KEY ("business_info_uuid") REFERENCES "business_data"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_data" ADD CONSTRAINT "business_data_address_uuid_fkey" FOREIGN KEY ("address_uuid") REFERENCES "addresses"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_data" ADD CONSTRAINT "business_data_contract_info_uuid_fkey" FOREIGN KEY ("contract_info_uuid") REFERENCES "contract_info"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_data" ADD CONSTRAINT "business_data_business_category_id_fkey" FOREIGN KEY ("business_category_id") REFERENCES "business_category"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_business_info_uuid_fkey" FOREIGN KEY ("business_info_uuid") REFERENCES "business_data"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_address_uuid_fkey" FOREIGN KEY ("address_uuid") REFERENCES "addresses"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_auth" ADD CONSTRAINT "users_auth_user_info_uuid_fkey" FOREIGN KEY ("user_info_uuid") REFERENCES "user_info"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefits" ADD CONSTRAINT "benefits_contract_info_uuid_fkey" FOREIGN KEY ("contract_info_uuid") REFERENCES "contract_info"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefits" ADD CONSTRAINT "benefits_business_info_uuid_fkey" FOREIGN KEY ("business_info_uuid") REFERENCES "business_data"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_wallet" ADD CONSTRAINT "users_wallet_user_info_uuid_fkey" FOREIGN KEY ("user_info_uuid") REFERENCES "user_info"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_wallet" ADD CONSTRAINT "users_wallet_benefit_uuid_fkey" FOREIGN KEY ("benefit_uuid") REFERENCES "benefits"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payer_wallet_uuid_fkey" FOREIGN KEY ("payer_wallet_uuid") REFERENCES "users_wallet"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_favored_uuid_fkey" FOREIGN KEY ("favored_uuid") REFERENCES "user_info"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_business_info_uuid_fkey" FOREIGN KEY ("business_info_uuid") REFERENCES "business_data"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
