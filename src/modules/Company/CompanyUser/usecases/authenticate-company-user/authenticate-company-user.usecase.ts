import { CustomError } from "../../../../../errors/custom.error"
import { IPasswordCrypto } from "../../../../../infra/shared/crypto/password.crypto"
import { ICompanyAdminToken } from "../../../../../infra/shared/crypto/token/CompanyAdmin/token"
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository"
import { ICompanyUserRepository } from "../../repositories/company-user.repository"

export type AuthenticateCompanyUserRequest = {

    business_document: string,
    email: string | null,
    user_name: string,
    password: string,
}
export class AuthenticateCompanyUserUsecase {
    constructor(
        private companyUserRepository: ICompanyUserRepository,
        private companyDataRepository: ICompanyDataRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: ICompanyAdminToken
    ) { }

    async execute({ business_document, user_name, password, email }: AuthenticateCompanyUserRequest) {

        if(!business_document || !password) throw new CustomError("Incorrect credentials", 401)

        //find a business with offered business document
        const findBusinessInfo = await this.companyDataRepository.findByDocument(business_document)
        if (!findBusinessInfo) throw new CustomError("Incorrect credentials", 401)

        //login option by email
        if (email) {
            //if it exists, try to find in companyuser an user with same ID as business and email
            const findUser = await this.companyUserRepository.findByBusinessIdAndEmail(findBusinessInfo.uuid, email)
            if (!findUser) throw new CustomError("Incorrect credentials", 401)

            //after finding, compare password
            const comparePasswordHash = await this.passwordCrypto.compare(password, findUser.password)
            if (!comparePasswordHash) throw new CustomError("Incorrect CNPJ, username or password", 401)

            //check if user status is inactive
            if (findUser.status === "inactive") throw new CustomError("User is not allowed to sign in", 401)

            const tokenGenerated = this.token.create(findUser)

            return {
                uuid: findUser.uuid,
                user_name: findUser.user_name,
                status: findUser.status,
                business_info_id: findUser.business_info_uuid,
                permissions: findUser.permissions,
                is_admin: findUser.is_admin,
                token: tokenGenerated,
            }

        }

        //login option by username
        if (!user_name) throw new CustomError("Incorrect credentials", 401)

        const findUser = await this.companyUserRepository.findByBusinessIdAndEmail(findBusinessInfo.uuid, user_name)
        if (!findUser) throw new CustomError("Incorrect credentials", 401)

        if (findUser.status === "inactive") throw new CustomError("User is not allowed to sign in", 401)

        const comparePasswordHash = await this.passwordCrypto.compare(password, findUser.password)
        if (!comparePasswordHash) throw new CustomError("Incorrect CNPJ, username or password", 401)

        const tokenGenerated = this.token.create(findUser)

        return {
            uuid: findUser.uuid,
            user_name: findUser.user_name,
            status: findUser.status,
            business_info_id: findUser.business_info_uuid,
            permissions: findUser.permissions,
            is_admin: findUser.is_admin,
            token: tokenGenerated,
        }

    }
}