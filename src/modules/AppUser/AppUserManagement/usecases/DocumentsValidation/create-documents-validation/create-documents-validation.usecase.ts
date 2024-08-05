import { CustomError } from "../../../../../../errors/custom.error";
import { DocumentValidator } from "../../../../../../utils/document-validation";
import { DocumentValidationEntity, DocumentValidationProps } from "../../../entities/app-user-document-validation.entity";
import { IAppUserDocumentValidationRepository } from "../../../repositories/app-user-document-validation.repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class CreateDocumentsValidationUsecase {
    constructor(
        private userInfoRepository: IAppUserInfoRepository,
        private documentsValidationRepository: IAppUserDocumentValidationRepository
    ) { }

    async execute(data: DocumentValidationProps, document: string) {

        if (!document) throw new CustomError("Document is required", 400)
        const adjustedDocument = new DocumentValidator()

        const validatedDocument = adjustedDocument.validator(document)

        ///find user
        const getUser = await this.userInfoRepository.findByDocumentUserInfo(validatedDocument)
        if (!getUser) throw new CustomError("User not found", 400)

        //Check which document is being sent and update status to 'under_analysis'
        await this.getDocumentType(data)

        if (getUser.user_document_validation_uuid) {
            const updateDocuments = {
                uuid: getUser.user_document_validation_uuid.uuid,
                ...data
            }
            await this.documentsValidationRepository.save(updateDocuments, getUser.uuid.uuid)
            return
        }

        const documentsEntity = await DocumentValidationEntity.create(data)

        await this.documentsValidationRepository.save(documentsEntity, getUser.uuid.uuid)
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

