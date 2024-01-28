import { CustomError } from "../../../../../errors/custom.error"
import { IPasswordCrypto } from "../../../../../infra/shared/crypto/password.crypto"
import { ICompanyAdminToken } from "../../../../../infra/shared/crypto/token/CompanyAdmin/token"
import { ICompanyUserRepository } from "../../repositories/company-user.repository"

export type AuthenticateCompanyUserRequest = {
   
    business_document: string,
    email: string | null,
    user_name: string,
    password: string,
}
export class AuthenticateCompanyUserUsecase{
    constructor(
        private companyUserRepository: ICompanyUserRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: ICompanyAdminToken
    ){}
    
    async execute({ business_document, user_name, password, email}: AuthenticateCompanyUserRequest ){


        if(email){
            if(!business_document || !password) throw new CustomError("Incorrect username/password", 401)

            const findByEmail = await this.companyUserRepository.findByEmail(email)
            if(!findByEmail) throw new CustomError("Incorrect username/password", 401)

            if(findByEmail.status === "inactive" ) throw new CustomError("User is not allowed to sign in", 401)

            const comparePasswordHash = await this.passwordCrypto.compare(password, findByEmail.password )
            if(!comparePasswordHash) throw new CustomError("Incorrect CNPJ, username or password", 401)
    
            const tokenGenerated = this.token.create(findByEmail)
    
            return {
                uuid: findByEmail.uuid,
                user_name: findByEmail.user_name,
                status: findByEmail.status,
                business_document: findByEmail.business_document,
                permissions: findByEmail.permissions,
                is_admin: findByEmail.is_admin,
                token: tokenGenerated,
            }
    
        }

        if(!business_document || !password || !user_name) throw new CustomError("Incorrect username/password", 401)


        const findAdmin = await this.companyUserRepository.findByUserNameAndDocumentAuth(user_name, business_document)
        if(!findAdmin) throw new CustomError("Incorrect username/password", 401)

        if(findAdmin.status === "inactive" ) throw new CustomError("User is not allowed to sign in", 401)

        const comparePasswordHash = await this.passwordCrypto.compare(password, findAdmin.password )
        if(!comparePasswordHash) throw new CustomError("Incorrect CNPJ, username or password", 401)

        const tokenGenerated = this.token.create(findAdmin)

        return {
            uuid: findAdmin.uuid,
            user_name: findAdmin.user_name,
            status: findAdmin.status,
            business_document: findAdmin.business_document,
            permissions: findAdmin.permissions,
            is_admin: findAdmin.is_admin,
            token: tokenGenerated,
        }
    
    }
}