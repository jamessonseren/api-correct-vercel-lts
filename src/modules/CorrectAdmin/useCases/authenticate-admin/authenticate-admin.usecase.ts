import { compare } from "bcryptjs"
import { IPasswordCrypto } from "../../../../crypto/password.crypto"
import { CustomError } from "../../../../errors/custom.error"
import { IToken } from "../../../../infra/shared/crypto/token/CorrectAdmin/token"
import { ICorrectAdminRepository } from "../../repositories/correct-admin.repository"

export type AuthenticateAdminRequest = {
    userName: string
    password: string
}

export class AuthenticateAdminUseCase{
    constructor(
        private correctAdminRepository: ICorrectAdminRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: IToken
    ){}

    async execute( {userName, password }: AuthenticateAdminRequest){
        if(!userName || !password) throw new CustomError("Username/password is incorrect", 401)

        const admin = await this.correctAdminRepository.findByUserNameAuth(userName)
        if(!admin) throw new CustomError("Username/password is incorrect", 401)

        const comparePasswordHash = await this.passwordCrypto.compare(password, admin.password)
        if(!comparePasswordHash) throw new CustomError("Username/password is incorrect", 401)
        
        const tokenGenerated = await this.token.create(admin)

        return {
            token: tokenGenerated
        }

    }
}