import { CustomError } from "../../../../../errors/custom.error";
import { IAppUserAuthRepository } from "../../repositories/app-use-auth-repository";

export class AppUserDetailsUsecase {
    constructor(
        private appUserRepository: IAppUserAuthRepository
    ) { }

    async execute(uuid: string) {

        const findUser = await this.appUserRepository.findById(uuid)
        if (!findUser) throw new CustomError("User not found", 400)
        
        
        let message: string = ''
        if(findUser.UserInfo.status === 'inactive') message = "User is not allowed to proceed due to inactive status"
        if(findUser.UserInfo.status === 'pending_validation') message = "User is pending document validation"
        if(findUser.UserInfo.status === 'active') message = "User is allowed to proceed"

        return {
            statusMessage: message,
            findUser
        }
    }
}