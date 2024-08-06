import { Status, UserDocumentValidationStatus } from "@prisma/client"
import { Uuid } from "../../../../../../../@shared/ValueObjects/uuid.vo"

export interface InputFindUserByUserDTO {
    document: string
}

export interface OutputFindUserByUserDTO {
    uuid: Uuid
    business_info_uuid: Uuid | null
    address_uuid: Uuid | null
    document: string
    document2: string | null
    document3: string | null
    full_name: string
    display_name: string | null
    internal_company_code: string | null
    gender: string | null
    email: string | null
    date_of_birth: string
    phone: string | null
    salary: number | null
    company_owner: boolean
    status: Status
    function: string | null
    recommendation_code: string | null
    marital_status: string | null
    dependents_quantity: number
    created_at: string | null
    updated_at: string | null
    BusinessInfo: {
        fantasy_name: string
    } | null
   

}