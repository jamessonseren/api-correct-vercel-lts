import { ItemCategory, ItemType } from "../create-benefit/create-benefit.dto"

export interface InputListCustomerDTO {}
type Benefit = {
    uuid: string
    name: string
    description: string
    item_type: ItemType
    item_category: ItemCategory
    created_at: string | null
    updated_at: string | null
}

export interface OutputListBenefitDTO {
    benefits: Benefit[]
}