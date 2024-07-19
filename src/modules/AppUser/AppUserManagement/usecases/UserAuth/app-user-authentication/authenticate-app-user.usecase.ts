import { IPasswordCrypto } from "../../../../../../crypto/password.crypto"
import { CustomError } from "../../../../../../errors/custom.error"
import { IAppUserToken } from "../../../../../../infra/shared/crypto/token/AppUser/token"
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
        if (!document || !password) throw new CustomError("Document/password is incorrect - 0", 401)

        const onlyNumberDocument = this.processDocument(document)
        if (onlyNumberDocument.length !== 11) throw new CustomError("Invalid document - 1", 401)

        if (this.allDigitsAreEqual(onlyNumberDocument)) throw new CustomError("Invalid document - 2", 401);

        if (!this.isValidCPF(onlyNumberDocument)) throw new CustomError("Invalid document - 3", 401);

        const appUser = await this.appUserRepository.findByDocument(onlyNumberDocument)
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

    private allDigitsAreEqual(document: string) {
        return /^(\d)\1*$/.test(document);
    }

    private isValidCPF(cpf: string) {
        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }
}