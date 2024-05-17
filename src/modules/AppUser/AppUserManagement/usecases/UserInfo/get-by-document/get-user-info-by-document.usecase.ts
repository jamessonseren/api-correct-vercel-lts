import { CustomError } from "../../../../../../errors/custom.error";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class GetUserInfoByDocumentUsecase {
    constructor(
        private userInfoRepository: IAppUserInfoRepository
    ) { }
    async execute(document: string) {
        if (!document) throw new CustomError("Document is required", 400)

        const getUser = await this.userInfoRepository.findByDocumentUserInfo(document)
        if(!getUser) throw new CustomError("User not found", 404)

        let message = {
            UserAuth: getUser.UserAuth ? 'OK' : null,
            Address: getUser.Address ? 'Ok' : null,
            UserValidation: {
                document_front_status: getUser.UserValidation?.document_front_status ? getUser.UserValidation?.document_front_status : 'pending to send',
                document_back_status: getUser.UserValidation?.document_back_status ? getUser.UserValidation?.document_back_status : 'pending to send',
                selfie_status: getUser.UserValidation?.selfie_status ? getUser.UserValidation?.selfie_status : 'pending to send',
                document_selfie_status: getUser.UserValidation?.document_selfie_status ? getUser.UserValidation.document_selfie_status : 'pending to send'
            }
           
        }
        return message

    }
}