export type ContractsInfoResponse = {
    uuid: string
    name: string | null
    content: string
    version: string | null
    assigned_at: string
}

export type BusinessContractResponse = {
    uuid: string
    business_info_uuid: string
    contract_info_uuid: string
}