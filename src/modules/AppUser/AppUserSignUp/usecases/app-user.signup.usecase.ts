import { CustomError } from "../../../../errors/custom.error";
import { IAppUserInfoRepository } from "../../AppUserManagement/repositories/app-user-info.repository";
import { AppUserProps, AppUserSignUpEntity } from "../entities/app-user-signup.entity";
import { IAppUserSignupRepository } from "../repositories/app-user-signup.repository";
import validator from 'validator'


export class AppUserSignUpUsecase {
    constructor(
        private appUserSingUpRepository: IAppUserSignupRepository,
        private appUserInfoRepository: IAppUserInfoRepository
    ) { }

    async execute(data: AppUserProps) {

        //check if app user is already registered
        const findUserByDocument = await this.appUserSingUpRepository.findByDocumentUserAuth(data.document)
        if (findUserByDocument) throw new CustomError("User already has an account", 409)

        //check if document2 is already registered
        if(data.document2){
            const findByDocument2 = await this.appUserInfoRepository.findByDocument2UserInfo(data.document2)
            if(findByDocument2) throw new CustomError("Document 2 already registered", 409)
        }

        if(data.document3){
            const findByDocument3 = await this.appUserInfoRepository.findByDocument3UserInfo(data.document3)
            if(findByDocument3) throw new CustomError("Document 3 already registered", 409)
        }
        
        if(data.selfie_base64){
            if (!validator.isBase64(data.selfie_base64)) {
                throw new CustomError("Invalid base64 format for 'face'", 400);
            }

        }
        if(data.document_front_base64)
        if (!validator.isBase64(data.document_front_base64)) {
            throw new CustomError("Invalid base64 format for 'document_front'", 400);
        }

        if(data.document_back_base64)
        if (!validator.isBase64(data.document_back_base64)) {
            throw new CustomError("Invalid base64 format for 'document_back'", 400);
        }
        if(data.document_selfie_base64)
        if (!validator.isBase64(data.document_selfie_base64)) {
            throw new CustomError("Invalid base64 format for 'face_and_document_front'", 400);
        }


        if (!data.selfie_base64) throw new CustomError("Selfie is required", 400)
        if (!data.document_front_base64) throw new CustomError("Document front is required", 400)
        if (!data.document_back_base64) throw new CustomError("Document back is required", 400)
        if (!data.document_selfie_base64) throw new CustomError("Document and selfie is required", 400)


        const appUser = await AppUserSignUpEntity.create(data)

        appUser.status = 'pending_validation'

        //check if document is already registered in userInfo table
        const findByDocument = await this.appUserInfoRepository.findByDocumentUserInfo(data.document)
        if (findByDocument) {
            appUser.user_info_fk_uuid = findByDocument.uuid
        }

        //check if email is already registered
        const findUserbyEmail = await this.appUserInfoRepository.findByEmailUserInfo(data.email)
        if (findUserbyEmail) {
            if (findUserbyEmail.document !== appUser.document) throw new CustomError("Email is already in use", 409)
        }

        

        const createUser = await this.appUserSingUpRepository.signUpUser(appUser)

        return createUser
        //}

    }


}
