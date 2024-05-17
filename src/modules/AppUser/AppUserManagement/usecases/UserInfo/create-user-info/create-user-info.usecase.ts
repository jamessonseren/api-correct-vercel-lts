import { CustomError } from "../../../../../../errors/custom.error";
import { AppUserInfoEntity, AppUserInfoProps } from "../../../entities/app-user-info.entity";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class AppUserInfoUsecase{
    constructor(
        private appUserInfoRepository: IAppUserInfoRepository,
        private appUserAuthRepository: IAppUserAuthRepository
    ){}

    async execute(data: AppUserInfoProps, user_id: string){
        
        //find authenticated user
        const findAuthUser = await this.appUserAuthRepository.findById(user_id)
        if(!findAuthUser) throw new CustomError("Authorization Error", 401)

        data.document = findAuthUser.document
        data.email = findAuthUser.email

        //check if document is already registered
        const findBydocument = await this.appUserInfoRepository.findByDocumentUserInfo(data.document)
        if(findBydocument && !findAuthUser.user_info_uuid){
            const data = {
                ...findAuthUser,
                user_info_uuid: findBydocument.uuid,
            }
            //update authUser table
            await this.appUserAuthRepository.update(data)

            throw new CustomError("User already registered", 409)
        }

        const userInfoEntity = await AppUserInfoEntity.create(data)

        const user = await this.appUserInfoRepository.save(userInfoEntity)

        return user
        

    }
}