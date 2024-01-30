-- CreateTable
CREATE TABLE "business_config" (
    "uuid" TEXT NOT NULL,
    "business_info_uuid" TEXT NOT NULL,
    "admin_tax" INTEGER NOT NULL,
    "marketing_tax" INTEGER NOT NULL,
    "cycle_start_date" TEXT,
    "cycle_end_date" TEXT,
    "cycle_paper_payment_date" TEXT,

    CONSTRAINT "business_config_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "business_config" ADD CONSTRAINT "business_config_business_info_uuid_fkey" FOREIGN KEY ("business_info_uuid") REFERENCES "business_data"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
