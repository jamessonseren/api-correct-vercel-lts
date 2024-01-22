import { CustomError } from "../../../../../errors/custom.error";
import { IAppUserAuthRepository } from "../../../AppUserManagement/repositories/app-use-auth-repository";
import { AppUserDataEntity, AppUserProps } from "../../entities/appuser-data.entity";
import { IAppUserRepository } from "../../repositories/app-user-data-repostory";

export class CreateAppUserDataByUserUsecase {
    constructor(
        private appUserRepository: IAppUserRepository,
        private appUserAuthRepository: IAppUserAuthRepository,
       
    ) { }

    async execute(data: AppUserProps, appUserId: string) {
        const findUser = await this.appUserAuthRepository.findById(appUserId)
        if (!findUser) throw new CustomError("Unable to find User", 400)
        
        data.document = findUser.document

        // //check if user is already registered
        // const findAppUserData = await this.appUserRepository.findByCPF(data.cpf)
        // if(findAppUserData) throw new CustomError("App User Data already registered", 401)
  

        const appUser = await AppUserDataEntity.create(data)
        const appUserData = await this.appUserRepository.saveOrUpdate(appUser)

        return appUserData
    }
}