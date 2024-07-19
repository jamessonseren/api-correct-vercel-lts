import { Uuid } from "../../../../../../@shared/ValueObjects/uuid.vo";
import { CustomError } from "../../../../../../errors/custom.error";
import { InputCreateUserInfoDTO } from "../../../../app-user-dto/app-user.dto";
import { AppUserAuthSignUpEntity } from "../../../entities/app-user-auth.entity";
import { AppUserInfoEntity, AppUserInfoProps } from "../../../entities/app-user-info.entity";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class AppUserInfoUsecase{
    constructor(
        private appUserInfoRepository: IAppUserInfoRepository,
        private appUserAuthRepository: IAppUserAuthRepository
    ){}

    async execute(data: InputCreateUserInfoDTO, user_id: Uuid){
        
        //find authenticated user
        const findAuthUser = await this.appUserAuthRepository.find(user_id)
        if(!findAuthUser) throw new CustomError("Authorization Error", 401)


        //check if document is already registered
        const findBydocument = await this.appUserInfoRepository.findByDocumentUserInfo(findAuthUser.document)

        if(findBydocument && !findAuthUser.user_info_uuid.uuid){
            
            const authEntity = new AppUserAuthSignUpEntity(findAuthUser)
            authEntity.changeUserInfo(findBydocument.uuid)

            //update authUser table
            await this.appUserAuthRepository.update(authEntity)

            throw new CustomError("User already registered", 409)
        }

        if(findBydocument) throw new CustomError("User Info already registered", 409)
        
        const userInfoEntity = await AppUserInfoEntity.create(data)

        const user = await this.appUserInfoRepository.create(userInfoEntity)

        return user
        

    }
}