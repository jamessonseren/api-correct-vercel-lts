import { UserDocumentValidationStatus } from "@prisma/client";
import { CustomError } from "../../../../../../errors/custom.error";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";

export class AppUserDetailsUsecase {
    constructor(
        private appUserRepository: IAppUserAuthRepository
    ) { }

    async execute(uuid: string) {

        if (!uuid) throw new CustomError("User Id is required", 400)

        const findUser = await this.appUserRepository.findById(uuid)
        if (!findUser) throw new CustomError("User not found", 404)

       

        let status: boolean = false
        let message = {
            UserAuth: "OK",
            UserInfo: findUser.UserInfo ? "OK" : null,
            Address: findUser.UserInfo?.Address ? "OK" : null,
            UserValidation: {
                document_front_status: findUser.UserInfo?.UserValidation?.document_front_status ? findUser.UserInfo.UserValidation?.document_front_status : 'pending to send',
                document_back_status: findUser.UserInfo?.UserValidation?.document_back_status ? findUser.UserInfo.UserValidation?.document_back_status : 'pending to send',
                selfie_status: findUser.UserInfo?.UserValidation?.selfie_status ? findUser.UserInfo.UserValidation?.selfie_status : 'pending to send',
                document_selfie_status: findUser.UserInfo?.UserValidation?.document_selfie_status ? findUser.UserInfo.UserValidation?.document_selfie_status : 'pending to send'

            }
        }
        if (
            message.UserAuth === "OK" &&
            message.UserInfo === "OK" &&
            message.Address === "OK" &&
            message.UserValidation.document_front_status === 'approved' &&
            message.UserValidation.document_back_status === 'approved' &&
            message.UserValidation.document_selfie_status === 'approved' &&
            message.UserValidation.selfie_status === 'approved'
        ) {
            status = true
            return { status, findUser }
        }

        
        if(!findUser.UserInfo){
            return {status, next_step: "Dados do usuário", message, findUser}
        }

        if(!findUser.UserInfo.Address){
            return {status, next_step: "Endereço do usuário", message, findUser}
        }


        if(!findUser.UserInfo.UserValidation){

            return {status, next_step: "Todos os documentos pendentes de envio",message, findUser}
        }

        const documentValidationArray = [
            findUser.UserInfo?.UserValidation?.document_front_status, 
            findUser.UserInfo?.UserValidation?.document_back_status,
            findUser.UserInfo?.UserValidation?.selfie_status,
            findUser.UserInfo?.UserValidation?.document_selfie_status
        ]

        let pendingDocumentsArray: any = []
        let underAnalysisdocumentsArray: any = []

        documentValidationArray.find((document) => {
            if(document === "pending_to_send"){ 
                pendingDocumentsArray.push(document)
            }

            if(document === "under_analysis") underAnalysisdocumentsArray.push(document)
        })
        if(pendingDocumentsArray.length > 0) return { status: false, next_step: "Há documentos a serem enviados", message, findUser }
        
        if(documentValidationArray.length === 4){
           return { status: false, next_step:"Todos os documentos sob análise", message, findUser }
        }
        
        
        return { status, message, findUser }
    }
}