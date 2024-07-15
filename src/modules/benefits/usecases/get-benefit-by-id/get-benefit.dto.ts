export interface InputGetBenefitsDto {
    uuid: string
}

export interface OutputGetBenefitsDTO {
    uuid: string
    name: string
    description: string
    item_type: "Gratuito" | "Programa" | "Produto"
    item_category: "Pós pago" | "Pré pago" | "Especiais Correct"
    created_at: string
    updated_at: string
}