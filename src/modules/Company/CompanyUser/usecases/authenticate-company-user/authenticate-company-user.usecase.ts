import { CustomError } from "../../../../../errors/custom.error"
import { IPasswordCrypto } from "../../../../../infra/shared/crypto/password.crypto"
import { ICompanyAdminToken } from "../../../../../infra/shared/crypto/token/CompanyAdmin/token"
import { ICompanyUserRepository } from "../../repositories/company-user.repository"

export type AuthenticateCompanyUserRequest = {
   
    business_document: string,
    user_name: string,
    password: string,
}
export class AuthenticateCompanyUserUsecase{
    constructor(
        private companyUserRepository: ICompanyUserRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: ICompanyAdminToken
    ){}
    
    async execute({ business_document, user_name, password}: AuthenticateCompanyUserRequest ){

        if(!business_document || !password || !user_name) throw new CustomError("Incorrect username/password", 401)

        const findAdmin = await this.companyUserRepository.findByUserNameAndDocumentAuth(user_name, business_document)
        if(!findAdmin) throw new CustomError("Incorrect username/password", 401)

        if(!findAdmin.is_active) throw new CustomError("User is not allowed to sign in", 401)

        const comparePasswordHash = await this.passwordCrypto.compare(password, findAdmin.password )
        if(!comparePasswordHash) throw new CustomError("Incorrect CNPJ, username or password", 401)

        const tokenGenerated = await this.token.create(findAdmin)

        return {
            uuid: findAdmin.uuid,
            user_name: findAdmin.user_name,
            is_client: findAdmin.is_client,
            business_document: findAdmin.business_document,
            permissions: findAdmin.permissions,
            is_admin: findAdmin.is_admin,
            token: tokenGenerated,
            is_active: findAdmin.is_active
        }
    
    }
}