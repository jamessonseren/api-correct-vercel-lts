import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'
import { PasswordBcrypt } from '../../../../crypto/password.bcrypt'
import { Permissions } from '@prisma/client'

export type CompanyUserProps = {
    business_info_uuid: string | null,
    is_admin: boolean,
    business_document: string,
    admin_document: string | null,
    name: string | null,
    email: string | null,
    user_name: string,
    function: string | null
    permissions: Permissions[],
    is_client: boolean,     
    password: string
}

export class CompanyUserEntity{
    uuid: string
    business_info_uuid: string | null
    is_admin: boolean
    business_document: string
    admin_document: string | null
    name: string | null
    email: string | null
    user_name: string
    function: string | null
    permissions: Permissions[]
    is_client: boolean     
    password: string
    private constructor(props: CompanyUserProps){
        this.uuid = randomUUID()
        this.business_info_uuid = props.business_info_uuid
        this.email = props.email
        this.business_document = props.business_document
        this.admin_document = props.admin_document
        this.name = props.name
        this.is_admin = props.is_admin
        this.permissions = props.permissions
        this.user_name = props.user_name
        this.password = props.password
        this.function = props.function
        this.is_client = props.is_client
    }

    static async create(data: CompanyUserProps){
        if(!data.password) throw new CustomError("Password is required", 403)
        if(!data.user_name) throw new CustomError("Username is required", 403)
        // if(!data.email) throw new CustomError("Email is required", 403)
        

        const bcrypt = new PasswordBcrypt()
        const passwordHash = await bcrypt.hash(data.password)

        data.password = passwordHash

        const companyUser = new CompanyUserEntity(data)
        return companyUser

    }
}


