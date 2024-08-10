import { DocumentValidator } from "../../../../../../utils/document-validation";
import { OutputGetByDocument } from "../../../../app-user-dto/app-user.dto";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { IAppUserDocumentValidationRepository } from "../../../repositories/app-user-document-validation.repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class GetByDocumentUsecase{
    constructor(
        private appUserRepository: IAppUserAuthRepository,
        private appUserInfoRepository: IAppUserInfoRepository,
        private appUserValidationRepository: IAppUserDocumentValidationRepository
    ){}

    async execute(document: string): Promise<OutputGetByDocument>{
        const documentValidator = new DocumentValidator()
        const documentValidated = documentValidator.validator(document)

        let status: boolean = true
        let userAuth: boolean = true
        let userInfo: boolean = true
        let address: boolean = true
        let document_front_status: string
        let document_back_status: string
        let selfie_status: string
        let document_selfie_status: string

        const getUserAuth = await this.appUserRepository.findByDocument(documentValidated)

        if(!getUserAuth) {
            status = false
            userAuth = false
            userInfo = false
            address = false
            document_front_status = 'pending to send'
            document_back_status = 'pending to send'
            selfie_status = 'pending to send'
            document_selfie_status = 'pending to send'

            return {
                status: status,
                UserAuth: userAuth,
                UserInfo: userInfo,
                Address: address,
                UserValidation: {
                    document_front_status,
                    document_back_status,
                    selfie_status,
                    document_selfie_status
                }
            }
        }

        if(!getUserAuth.user_info_uuid) {
            status = false
            userAuth = true
            userInfo = false
            address = false
            document_front_status = 'pending to send'
            document_back_status = 'pending to send'
            selfie_status = 'pending to send'
            document_selfie_status = 'pending to send'

            return {
                status: status,
                UserAuth: userAuth,
                UserInfo: userInfo,
                Address: address,
                UserValidation: {
                    document_front_status,
                    document_back_status,
                    selfie_status,
                    document_selfie_status
                }
            }
        }
        const getUserInfo = await this.appUserInfoRepository.find(getUserAuth.user_info_uuid)
        if(!getUserInfo) {

            status = false
            userAuth = true
            userInfo = false
            address = false
            document_front_status = 'pending to send'
            document_back_status = 'pending to send'
            selfie_status = 'pending to send'
            document_selfie_status = 'pending to send'

            return {
                status: status,
                UserAuth: userAuth,
                UserInfo: userInfo,
                Address: address,
                UserValidation: {
                    document_front_status,
                    document_back_status,
                    selfie_status,
                    document_selfie_status
                }
            }
        }
        
        if(!getUserInfo.address_uuid){
            status = false
            userInfo = true
            address = false
            document_front_status = 'pending to send'
            document_back_status = 'pending to send'
            selfie_status = 'pending to send'
            document_selfie_status = 'pending to send'

            return {
                status: status,
                UserAuth: userAuth,
                UserInfo: userInfo,
                Address: address,
                UserValidation: {
                    document_front_status,
                    document_back_status,
                    selfie_status,
                    document_selfie_status
                }
            }

        }

        if(!getUserInfo.user_document_validation_uuid){
            status = false
            userInfo = true
            address = true
            document_front_status = 'pending to send'
            document_back_status = 'pending to send'
            selfie_status = 'pending to send'
            document_selfie_status = 'pending to send'

            return {
                status: status,
                UserAuth: userAuth,
                UserInfo: userInfo,
                Address: address,
                UserValidation: {
                    document_front_status,
                    document_back_status,
                    selfie_status,
                    document_selfie_status
                }
            }
        }


        const userValidations = await this.appUserValidationRepository.find(getUserInfo.user_document_validation_uuid)
        
        if(!userValidations) {
            status = false
            userInfo = true
            address = true
            document_front_status = 'pending to send'
            document_back_status = 'pending to send'
            selfie_status = 'pending to send'
            document_selfie_status = 'pending to send'

            return {
                status: status,
                UserAuth: userAuth,
                UserInfo: userInfo,
                Address: address,
                UserValidation: {
                    document_front_status,
                    document_back_status,
                    selfie_status,
                    document_selfie_status
                }
            }
        }            


        return {
            status: status,
            UserAuth: userAuth,
            UserInfo: userInfo,
            Address: address,
            UserValidation: {
                document_front_status: userValidations.document_front_status,
                document_back_status: userValidations.document_back_status,
                selfie_status: userValidations.selfie_status,
                document_selfie_status: userValidations.document_selfie_status
            }
        }
    
    }
}