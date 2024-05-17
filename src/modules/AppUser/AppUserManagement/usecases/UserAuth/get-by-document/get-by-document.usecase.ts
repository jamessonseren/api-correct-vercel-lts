import { CustomError } from "../../../../../../errors/custom.error";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";

export class GetByDocumentUsecase{
    constructor(
        private appUserRepository: IAppUserAuthRepository
    ){}

    async execute(document: string){
        if(!document) throw new CustomError("Document is required", 400)

        const getUser = await this.appUserRepository.findByDocument(document)
        if(!getUser) throw new CustomError("User not found", 404)
        
        let message = {
            UserAuth: "OK",
            UserInfo: getUser.UserInfo ? "ok" : null,
            Address: getUser.UserInfo?.Address ? "OK" : null,
            UserValidation: {
                document_front_status: getUser.UserInfo?.UserValidation?.document_front_status ? getUser.UserInfo.UserValidation?.document_front_status : 'pending to send',
                document_back_status: getUser.UserInfo?.UserValidation?.document_back_status ? getUser.UserInfo.UserValidation?.document_back_status : 'pending to send',
                selfie_status: getUser.UserInfo?.UserValidation?.selfie_status ? getUser.UserInfo.UserValidation?.selfie_status : 'pending to send',
                document_selfie_status: getUser.UserInfo?.UserValidation?.document_selfie_status ? getUser.UserInfo.UserValidation?.document_selfie_status : 'pending to send'

            }
        }
        return message
    }
}