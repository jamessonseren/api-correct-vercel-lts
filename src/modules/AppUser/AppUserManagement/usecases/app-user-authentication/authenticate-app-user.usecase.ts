import { IPasswordCrypto } from "../../../../../crypto/password.crypto"
import { CustomError } from "../../../../../errors/custom.error"
import { IAppUserToken } from "../../../../../infra/shared/crypto/token/AppUser/token"
import { IAppUserAuthRepository } from "../../repositories/app-use-auth-repository"

export type AuthenticateAppuserRequest = {
    document: string
    password: string
}

export class AuthenticateAppuserUsecase{
    constructor(
        private appUserRepository: IAppUserAuthRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: IAppUserToken

    ){}

    async execute({ document, password}: AuthenticateAppuserRequest){
        if(!document || !password) throw new CustomError("Username/password is incorrect", 401)

        const appUser = await this.appUserRepository.findByDocumentAuth(document)
        if(!appUser) throw new CustomError("Username/password is incorrect", 401)

        const comparePasswordHash = await this.passwordCrypto.compare(password, appUser.password)
        if(!comparePasswordHash) throw new CustomError("Username/password is incorrect", 401)

        const tokenGenerated = this.token.create(appUser)

        return tokenGenerated
    }
}