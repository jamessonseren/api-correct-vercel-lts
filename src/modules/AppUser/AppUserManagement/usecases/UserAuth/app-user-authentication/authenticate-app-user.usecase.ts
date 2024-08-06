import { IPasswordCrypto } from "../../../../../../crypto/password.crypto"
import { CustomError } from "../../../../../../errors/custom.error"
import { IAppUserToken } from "../../../../../../infra/shared/crypto/token/AppUser/token"
import { DocumentValidator } from "../../../../../../utils/document-validation"
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository"

export type AuthenticateAppuserRequest = {
    document: string
    password: string
}

export class AuthenticateAppuserUsecase {
    constructor(
        private appUserRepository: IAppUserAuthRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: IAppUserToken

    ) { }

    async execute({ document, password }: AuthenticateAppuserRequest) {
        if (!document || !password) throw new CustomError("Document/password is incorrect", 400)

        const documentNumber = this.processDocument(document)
        const appUser = await this.appUserRepository.findByDocument(documentNumber)

        if (!appUser) throw new CustomError("Document/password is incorrect", 401)

        const comparePasswordHash = await this.passwordCrypto.compare(password, appUser.password)
        if (!comparePasswordHash) throw new CustomError("Document/password is incorrect", 401)

        const tokenGenerated = this.token.create(appUser)

        return {
            token: tokenGenerated
        }
    }

    private processDocument(document: string) {
        const onlyNumbers = document.replace(/\D/g, '');
        return onlyNumbers
    }

}