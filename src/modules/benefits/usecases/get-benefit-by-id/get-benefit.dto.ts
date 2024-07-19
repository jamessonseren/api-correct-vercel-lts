import { Uuid } from "../../../../@shared/ValueObjects/uuid.vo"
import { ItemCategory, ItemType } from "../create-benefit/create-benefit.dto"

export interface InputGetBenefitsDto {
    uuid: Uuid
}

export interface OutputGetBenefitsDTO {
    uuid: Uuid
    name: string
    description: string
    item_type: ItemType
    item_category: ItemCategory
    created_at: string | null
    updated_at: string | null
}