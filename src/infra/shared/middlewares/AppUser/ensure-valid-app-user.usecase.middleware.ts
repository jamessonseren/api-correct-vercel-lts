import { CustomError } from "../../../../errors/custom.error";
import { IAppUserAuthRepository } from "../../../../modules/AppUser/AppUserManagement/repositories/app-use-auth-repository";

export class EnsureValidAppUserUsecase {
    constructor(
        private appUserAutRepository: IAppUserAuthRepository
    ){}

    async execute(id: string){
        const appUser = await this.appUserAutRepository.findById(id)
        if(!appUser) throw new CustomError("Admin is not allowed to access", 401)

       return appUser.uuid
    }
}