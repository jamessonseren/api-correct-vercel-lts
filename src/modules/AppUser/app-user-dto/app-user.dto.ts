import { Status, UserDocumentValidationStatus } from "@prisma/client"


export type AppUserAuthResponseAuthentication = {
    uuid: string
    document: string
    password: string
}
export type UserInfoResponse = {
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
    marital_status: string | null
    dependents_quantity: number
    BusinessInfo: {
        fantasy_name: string
    } | null
    user_document_validation_uuid: string | null
    Address: {
        uuid: string
        line1: string
        line2: string
        line3: string | null
        postal_code: string
        neighborhood: string
        city: string
        state: string
        country: string
    } | null
    UserValidation: {
        uuid: string
        //document_front_base64: string
        document_front_status: UserDocumentValidationStatus
        //document_back_base64: string
        document_back_status: UserDocumentValidationStatus
        //selfie_base64: string | null
        selfie_status: UserDocumentValidationStatus
        //document_selfie_base64: string
        document_selfie_status: UserDocumentValidationStatus
    } | null

}


export type AppUserAuthResponse = {
    uuid: string,
    document: string,
    UserInfo: {
        uuid: string,
        document: string,
        document2: string | null,
        document3: string | null,
        full_name: string | null,
        display_name: string | null,
        internal_company_code: string | null,
        gender: string | null,
        email: string | null,
        date_of_birth: string
        phone: string | null
        salary: string | null
        company_owner: boolean,
        status: Status,
        function: string | null,
        recommendation_code: string | null
        is_authenticated: boolean
        marital_status: string | null
        dependents_quantity: number
        user_document_validation_uuid: string | null
        Address: {
            uuid: string
            line1: string
            line2: string
            line3: string | null
            postal_code: string
            neighborhood: string
            city: string
            state: string
            country: string
        } | null,
        UserValidation: {
            uuid: string
            //document_front_base64: string
            document_front_status: UserDocumentValidationStatus
            //document_back_base64: string
            document_back_status: UserDocumentValidationStatus
            //selfie_base64: string | null
            selfie_status: UserDocumentValidationStatus
            //document_selfie_base64: string
            document_selfie_status: UserDocumentValidationStatus
        } | null
    
    }


}


export type UserValidation = {
    uuid: string
    //document_front_base64: string
    document_front_status: UserDocumentValidationStatus
    //document_back_base64: string
    document_back_status: UserDocumentValidationStatus
    //selfie_base64: string | null
    selfie_status: UserDocumentValidationStatus
    //document_selfie_base64: string
    document_selfie_status: UserDocumentValidationStatus
}

export type UserValidationUpdate = {
    uuid: string
    document_front_base64: string | null
    document_front_status: UserDocumentValidationStatus
    document_back_base64: string | null
    document_back_status: UserDocumentValidationStatus
    selfie_base64: string | null
    selfie_status: UserDocumentValidationStatus
    document_selfie_base64: string | null
    document_selfie_status: UserDocumentValidationStatus
}


export type AppUserInfoRequest = {
    document: string,
    document2: string | null,
    full_name: string,
    internal_company_code: string | null,
    gender: string | null,
    date_of_birth: string,
    salary: string | null,
    company_owner: boolean
    user_function: string | null
    marital_status: string | null,
    dependents_quantity: number
}