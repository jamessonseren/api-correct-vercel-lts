export type ItemType = 'gratuito' | 'programa' | 'produto';
export type ItemCategory = 'pos_pago' | 'pre_pago' | 'especiais_correct';

export interface InputCreateBenefitDto {
    name: string
    description: string
    item_type: ItemType
    item_category: ItemCategory
}

export interface OutputCreateBenefitDto {
    uuid: string
    name: string
    description: string
    item_type: ItemType
    item_category: ItemCategory
}