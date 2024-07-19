import { CustomError } from "../../../../../../errors/custom.error";
import { DocumentValidationEntity, DocumentValidationProps } from "../../../entities/app-user-document-validation.entity";
import IAppUserAuthRepository from "../../../repositories/app-use-auth-repository";
import { IAppUserDocumentValidationRepository } from "../../../repositories/app-user-document-validation.repository";

export class CreateDocumentsValidationUsecase {
    constructor(
        private userAuthRepository: IAppUserAuthRepository,
        private documentsValidationRepository: IAppUserDocumentValidationRepository
    ) { }

    async execute(data: DocumentValidationProps, user_id: string) {
        
        ///find user
        const getUser = await this.userAuthRepository.findById(user_id)
        if(!getUser) throw new CustomError("User not found", 400)
        
        //Check which document is being sent and update status to 'under_analysis'
        await this.getDocumentType(data)

        if(getUser.UserInfo.UserValidation?.uuid){
            const updateDocuments = {
                uuid: getUser.UserInfo.UserValidation?.uuid,
                ...data
            }
            await this.documentsValidationRepository.save(updateDocuments, getUser.UserInfo.uuid)
            return
        }

        const documentsEntity = await DocumentValidationEntity.create(data)

        await this.documentsValidationRepository.save(documentsEntity, getUser.UserInfo.uuid)
        return
        
    }
    private async getDocumentType(data: DocumentValidationProps): Promise<void> {

        // Mapear o tipo de documento com base no nome da propriedade
        if (data.document_front_base64) {
            data.document_front_status = 'under_analysis'

        }
        if (data.document_back_base64) {
            data.document_back_status = 'under_analysis'
        }
        if (data.selfie_base64) {
            data.selfie_status = 'under_analysis'

        }
        if (data.document_selfie_base64) {
            data.document_selfie_status = 'under_analysis'
        }
    }
}

