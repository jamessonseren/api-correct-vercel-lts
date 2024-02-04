import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'
import { BusinessTypeOptions, Status } from '@prisma/client'

export type BusinessRegisterProps = {
    //address table
    line1: string
    line2: string
    line3: string | null
    postal_code: string
    neighborhood: string
    city: string
    state: string
    country: string
    //businessinfo
    address_fk_uuid: string
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

export class BusinessRegisterEntity {
    address_pk_uuid: string
    line1: string
    line2: string
    line3: string | null
    neighborhood: string
    postal_code: string
    city: string
    state: string
    country: string
    business_info_uuid
    address_fk_uuid: string
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


    private constructor(props: BusinessRegisterProps) {

        this.address_pk_uuid = randomUUID()
        this.line1 = props.line1
        this.line2 = props.line2
        this.line3 = props.line3
        this.neighborhood = props.neighborhood
        this.postal_code = props.postal_code
        this.city = props.city
        this.state = props.state
        this.country = props.country
        this.business_info_uuid = randomUUID()
        this.address_fk_uuid = this.address_pk_uuid
        this.fantasy_name = props.fantasy_name
        this.document = props.document
        this.corporate_reason = props.corporate_reason
        this.branch_uuid = props.branch_uuid
        this.classification = props.classification
        this.colaborators_number = props.colaborators_number
        this.status = props.status
        this.phone_1 = props.phone_1
        this.phone_2 = props.phone_2
        this.business_type = props.business_type
        this.email = props.email

    }

    static async create(data: BusinessRegisterProps) {
        if (!data.line1) throw new CustomError("Street is required", 400)
        if (!data.line2) throw new CustomError("Number is required", 400)
        if (!data.neighborhood) throw new CustomError("Neighbohood is required", 400)
        if (!data.postal_code) throw new CustomError("Zip Code is required", 400)
        if (!data.city) throw new CustomError("City is required", 400)
        if (!data.state) throw new CustomError("State is required", 400)
        if (!data.country) throw new CustomError("Country is required", 400)
        if (!data.fantasy_name) throw new CustomError("Fantasy name is required", 400)
        if (!data.document) throw new CustomError("Document is required", 400)
        if (!data.classification) throw new CustomError("Company classification is required", 400)
        if (!data.colaborators_number) throw new CustomError("Total employees is required", 400)
        if (!data.email) throw new CustomError("Email is required", 400)
        if (!data.phone_1) throw new CustomError("Telephone 1 is required", 400)

        
        const companyAddress = new BusinessRegisterEntity(data)
        return companyAddress
    }



}