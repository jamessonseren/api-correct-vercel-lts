import { BusinessTypeOptions } from "@prisma/client";

export type CompanyDataRequest = {
    uuid: string;
    address_uuid: string | null
    contract_info_uuid: string | null
    fantasy_name: string
    corporate_reason: string | null
    document: string
    classification: string
    colaborators_number: number
    status: boolean
    phone_1: string
    phone_2: string | null
    business_type: BusinessTypeOptions
}