import { BusinessTypeOptions, Status } from "@prisma/client";

export type CompanyDataRequest = {
    uuid: string;
    address_uuid: string
    fantasy_name: string
    corporate_reason: string | null
    document: string
    branch_uuid: string
    classification: string
    colaborators_number: number
    status: Status
    phone_1: string
    phone_2: string | null
    business_type: BusinessTypeOptions
    email: string
}