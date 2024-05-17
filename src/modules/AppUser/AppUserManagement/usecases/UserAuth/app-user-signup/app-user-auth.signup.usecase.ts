import { CustomError } from "../../../../../../errors/custom.error";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";
import { AppUserAuthProps, AppUserAuthSignUpEntity } from "../../../entities/app-user-auth.entity";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";

export class AppUserAuthSignUpUsecase {
    constructor(
        private appUserSingUpRepository: IAppUserAuthRepository,
        private appUserInfoRepository: IAppUserInfoRepository
    ) { }

    async execute(data: AppUserAuthProps) {

        //check if app user is already registered by document
        const findUserByDocument = await this.appUserSingUpRepository.findByDocument(data.document)
        if (findUserByDocument) throw new CustomError("User already has an account", 409)

        //find user by email
        const findUserByEmail = await this.appUserSingUpRepository.findByEmail(data.email)
        if(findUserByEmail) throw new CustomError("Email already in use", 409)


        //check if user was already registered by Correct
        const findUser = await this.appUserInfoRepository.findByDocumentUserInfo(data.document)
        if(findUser) data.user_info_uuid = findUser.uuid
        
        const appUser = await AppUserAuthSignUpEntity.create(data)

        const user = await this.appUserSingUpRepository.save(appUser)

        return user

    }


}
