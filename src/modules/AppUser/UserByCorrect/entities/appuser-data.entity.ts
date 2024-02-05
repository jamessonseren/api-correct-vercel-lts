import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'
import { Status, UserDocumentValidationStatus } from '@prisma/client'

export type AppUserProps = {
    business_info_uuid: string | null,
    address_uuid: string | null,
    document: string,
    document2: string | null,
    document3: string | null,
    full_name: string,
    display_name: string | null,
    internal_company_code: string | null,
    gender: string | null,
    email: string | null,
    date_of_birth: string,
    phone: string | null,
    salary: string | null,
    company_owner: boolean
    status: UserDocumentValidationStatus,
    function: string | null
    is_authenticated: boolean
    marital_status: string | null,
    dependents_quantity: number
}

export class AppUserDataEntity{
    uuid: string
    business_info_uuid: string | null
    address_uuid: string | null
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
    salary: string | null
    company_owner: boolean
    status: UserDocumentValidationStatus
    function: string | null
    is_authenticated: boolean
    marital_status: string | null
    dependents_quantity: number


    private constructor(props: AppUserProps){
        if(!props.business_info_uuid) throw new CustomError("Business info id is required", 400)
        if(!props.gender) throw new CustomError("Gender is required", 400)
        if(!props.document) throw new CustomError("document is required", 400)
        if(!props.date_of_birth) throw new CustomError("Date of birth is required", 400)

        this.uuid = randomUUID()
        this.business_info_uuid = props.business_info_uuid
        this.document = props.document
        this.address_uuid = props.address_uuid
        this.document2 = props.document2
        this.document3 = props.document3
        this.full_name = props.full_name
        this.email = props.email
        this.display_name = props.display_name
        this.phone = props.phone
        this.status = props.status
        this.is_authenticated = props.is_authenticated
        this.internal_company_code = props.internal_company_code
        this.company_owner = props.company_owner
        this.gender = props.gender
        this.date_of_birth = props.date_of_birth
        this.function = props.function
        this.salary = props.salary
        this.marital_status = props.marital_status
        this.dependents_quantity = props.dependents_quantity
    }

    static async create(data: AppUserProps){
        const appUser = new AppUserDataEntity(data)
        return appUser
    }
}