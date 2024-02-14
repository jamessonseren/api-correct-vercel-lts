import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'
import {  Status, UserDocumentValidationStatus } from '@prisma/client'
import { PasswordBCrypt } from '../../../../infra/shared/crypto/password.bcrypt'

export type AppUserProps = {
    //user address
    line1: string
    line2: string
    line3: string | null
    postal_code: string
    neighborhood: string
    city: string
    state: string
    country: string
    //userInfo table
    business_info_uuid: string | null
    address_fk_uuid: string | null
    document: string
    document2: string | null
    document3: string | null
    full_name: string
    display_name: string | null
    internal_company_code: string | null
    gender: string | null
    email: string
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
    //user auth table
    user_info_fk_uuid: string
    // document_auth: string
    password: string
    //user validation table
    document_front_base64: string | null
    document_front_status: UserDocumentValidationStatus
    document_back_base64: string | null
    document_back_status: UserDocumentValidationStatus
    selfie_base64: string | null
    selfie_status: UserDocumentValidationStatus
    document_selfie_base64: string | null
    document_selfie_status: UserDocumentValidationStatus



}
export class AppUserSignUpEntity {
    //user address
    address_pk_uuid: string
    line1: string
    line2: string
    line3: string | null
    postal_code: string
    neighborhood: string
    city: string
    state: string
    country: string

    //userInfo table
    user_info_pk_uuid: string
    business_info_uuid: string | null
    address_fk_uuid: string
    document: string
    document2: string | null
    document3: string | null
    full_name: string
    display_name: string | null
    internal_company_code: string | null
    gender: string | null
    email: string
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

    //user validation table
    user_validation_pk_uuid: string
    document_front_base64: string | null
    document_front_status: UserDocumentValidationStatus
    document_back_base64: string | null
    document_back_status: UserDocumentValidationStatus
    selfie_base64: string | null
    selfie_status: UserDocumentValidationStatus
    document_selfie_base64: string | null
    document_selfie_status: UserDocumentValidationStatus


    //user auth
    user_auth_uuid: string
    user_info_fk_uuid: string
    // document_auth: string
    password: string

    private constructor(props: AppUserProps) {
        //UserAddress table
        this.address_pk_uuid = randomUUID()
        this.line1 = props.line1
        this.line2 = props.line2
        this.line3 = props.line3
        this.postal_code = props.postal_code
        this.neighborhood = props.neighborhood
        this.city = props.city
        this.state = props.state
        this.country = props.country

        //user validation table
        this.user_validation_pk_uuid = randomUUID()
        this.document_front_base64 = props.document_front_base64
        this.document_front_status = props.document_front_status
        this.document_back_base64 = props.document_back_base64
        this.document_back_status = props.document_back_status
        this.selfie_base64 = props.selfie_base64
        this.selfie_status = props.selfie_status
        this.document_selfie_base64 = props.document_selfie_base64
        this.document_selfie_status = props.document_selfie_status
        
        //userInfo Table
        this.user_info_pk_uuid = randomUUID()
        this.business_info_uuid = props.business_info_uuid
        this.address_fk_uuid = this.address_pk_uuid
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
        this.user_document_validation_uuid = this.user_validation_pk_uuid


        //user Auth
        this.user_auth_uuid = randomUUID()
        this.user_info_fk_uuid = this.user_info_pk_uuid
        this.password = props.password
    }

    static async create(data: AppUserProps) {



        //address conditions
        if (!data.line1) throw new CustomError("Street is required", 400)
        if (!data.line2) throw new CustomError("Number is required", 400)
        if (!data.neighborhood) throw new CustomError("Neighbohood is required", 400)
        if (!data.postal_code) throw new CustomError("Zip Code is required", 400)
        if (!data.city) throw new CustomError("City is required", 400)
        if (!data.state) throw new CustomError("State is required", 400)
        if (!data.country) throw new CustomError("Country is required", 400)

        //userInfo conditions
        if (!data.document) throw new CustomError("Document is required", 400)
        if (!data.full_name) throw new CustomError("Full name is required", 400)
        if (!data.email) throw new CustomError("Email is required", 400)
        if (!data.date_of_birth) throw new CustomError("Date of birth is required", 400)


        //user auth conditions
        if (!data.password) throw new CustomError("Password is required", 400)

        //user validation conditions

        const bcrypt = new PasswordBCrypt()
        const passwordHash = await bcrypt.hash(data.password)

        data.password = passwordHash
        
        
        const appUserRegister = new AppUserSignUpEntity(data)
        return appUserRegister
    }
}