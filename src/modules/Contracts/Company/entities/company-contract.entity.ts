import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'

export type CompanyContractProps = {
    //ContractInfo
    name: string | null
    content: string
    version: string | null
    assigned_at: string

    //BusinessContract
    business_info_uuid: string
    contract_info_uuid: string
}

export class CompanyContractEntity {
    //ContractInfo
    contract_uuid: string
    name: string | null
    content: string
    version: string | null
    assigned_at: string

    //BusinessContract
    business_contract_uuid: string
    business_info_uuid: string

    private constructor(props: CompanyContractProps) {

        this.contract_uuid = randomUUID()
        this.name = props.name
        this.content = props.content
        this.version = props.version
        this.assigned_at = props.assigned_at

        this.business_contract_uuid = randomUUID()
        this.business_info_uuid = props.business_info_uuid

        if (!props.content) throw new CustomError("Contract content is required", 400)
        if (!props.assigned_at) throw new CustomError("Signing date is required", 400)

        if(!props.business_info_uuid) throw new CustomError("Business Id is required", 400)

        if (typeof props.content !== 'string') throw new CustomError("Content must be a string")
        if (typeof props.assigned_at !== 'string') throw new CustomError("signing date must be a string")

        if (props.name && typeof props.name !== 'string') throw new CustomError("Name must be a string")
        if (props.version && typeof props.version !== 'string') throw new CustomError("Version must be a string")


    }
    static async create(data: CompanyContractProps) {
        const contract = new CompanyContractEntity(data)
        return contract
    }
}