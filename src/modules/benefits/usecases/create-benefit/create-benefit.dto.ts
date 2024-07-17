export type ItemType = 'gratuito' | 'programa' | 'produto';
export type ItemCategory = 'pos_pago' | 'pre_pago' | 'especiais_correct';

export interface InputCreateBenefitDto {
    name: string
    description: string
    item_type: ItemType
    item_category: ItemCategory
    parent_uuid: string | null
    created_at: string | null
    updated_at: string | null
}

export interface OutputCreateBenefitDto {
    uuid: string
    name: string
    description: string
    item_type: ItemType
    item_category: ItemCategory
}