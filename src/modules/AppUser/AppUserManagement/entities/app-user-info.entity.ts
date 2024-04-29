import { Status } from "@prisma/client"
import { randomUUID } from 'crypto'
import { newDateF } from "../../../../utils/date"
import { CustomError } from "../../../../errors/custom.error"

export type AppUserInfoProps = {
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
    status: Status
    function: string | null
    recommendation_code: string | null
    is_authenticated: boolean
    marital_status: string | null
    dependents_quantity: number
    user_document_validation_uuid: string
}
export class AppUserInfoEntity {
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
    status: Status
    function: string | null
    recommendation_code: string | null
    is_authenticated: boolean
    marital_status: string | null
    dependents_quantity: number
    user_document_validation_uuid: string
    created_at: string

    private constructor(props: AppUserInfoProps) {
        this.uuid = randomUUID()
        this.business_info_uuid = props.business_info_uuid
        this.address_uuid = props.address_uuid
        this.document = props.document
        this.document2 = props.document2
        this.document3 = props.document3
        this.full_name = props.full_name
        this.display_name = props.display_name
        this.internal_company_code = props.internal_company_code
        this.gender = props.gender
        this.email = props.email
        this.date_of_birth = props.date_of_birth
        this.phone = props.phone
        this.salary = props.salary
        this.company_owner = props.company_owner
        this.status = props.status
        this.function = props.function
        this.recommendation_code = props.recommendation_code
        this.is_authenticated = props.is_authenticated
        this.marital_status = props.marital_status
        this.dependents_quantity = props.dependents_quantity
        this.user_document_validation_uuid = props.user_document_validation_uuid
        this.created_at = newDateF(new Date())

    }

    static async create(data: AppUserInfoProps) {

        //rules validations
        if (!data.full_name) throw new CustomError("Full name is required", 400)
        if (!data.date_of_birth) throw new CustomError("Date of birth is required", 400)
        if (!data.gender) throw new CustomError("Gender is required", 400)

        //types validation
        if (data.business_info_uuid && typeof data.business_info_uuid !== 'string') throw new CustomError("Business info UUID must be a string", 400)
       
        if (data.address_uuid && typeof data.address_uuid !== 'string')throw new CustomError("Address UUID must be a string", 400)
        
        if (data.document2 && typeof data.document2 !== 'string')throw new CustomError("Document 2 must be a string", 400)
        
        if (data.document3 && typeof data.document3 !== 'string')throw new CustomError("Document 3 must be a string", 400)
        
        if (typeof data.full_name !== 'string')throw new CustomError("Full name must be a string", 400)
        
        if (data.display_name && typeof data.display_name !== 'string')throw new CustomError("Display name must be a string", 400)
        
        if (data.display_name && typeof data.internal_company_code !== 'string')throw new CustomError("Internal company code must be a string", 400)
        
        if (typeof data.gender !== 'string')throw new CustomError("Gender must be a string", 400)
                
        if (typeof data.date_of_birth !== 'string')throw new CustomError("Date of birth must be a string", 400)
        
        if (data.phone && typeof data.phone !== 'string')throw new CustomError("Phone must be a string", 400)
        
        if (data.salary && typeof data.salary !== 'string')throw new CustomError("Salary must be a string", 400)
        
        if (data.company_owner && typeof data.company_owner !== 'boolean')throw new CustomError("Company owner must be a boolean", 400)
        
        if (data.status && !(data.status in Status))throw new CustomError("Status must be a valid status", 400)
        
        if (data.function && typeof data.function !== 'string')throw new CustomError("Function must be a string", 400)
        
        if (data.recommendation_code && typeof data.recommendation_code !== 'string')throw new CustomError("Recommendation code must be a string", 400)
        
        if (data.is_authenticated && typeof data.is_authenticated !== 'boolean') throw new CustomError("Is authenticated must be a boolean", 400)
        
        if (data.marital_status && typeof data.marital_status !== 'string') throw new CustomError("Marital status must be a string", 400)
        
        if (data.dependents_quantity && typeof data.dependents_quantity !== 'number') throw new CustomError("Dependents quantity must be a number", 400)
        
        if (data.user_document_validation_uuid && typeof data.user_document_validation_uuid !== 'string') throw new CustomError("User document validation UUID must be a string", 400)
        

        const user = new AppUserInfoEntity(data)
        return user
    }

}