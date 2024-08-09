import { CustomError } from "../../../../../../errors/custom.error";
import { DocumentValidator } from "../../../../../../utils/document-validation";
import { DocumentValidationEntity, DocumentValidationProps } from "../../../entities/app-user-document-validation.entity";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { IAppUserDocumentValidationRepository } from "../../../repositories/app-user-document-validation.repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";
import { InputCreateDocumentValidationDTO, OutputCreateDocumentValidationDTO } from "./dto/create-user-validation.dto";

export class CreateDocumentsValidationUsecase {
    constructor(
        private userAuthRepository: IAppUserAuthRepository,
        private userInfoRepository: IAppUserInfoRepository,
        private documentsValidationRepository: IAppUserDocumentValidationRepository
    ) { }

    async execute(data: InputCreateDocumentValidationDTO): Promise<OutputCreateDocumentValidationDTO> {

        ///find user auth
        const getUser = await this.userAuthRepository.find(data.user_uuid)
        if (!getUser) throw new CustomError("User auth not found", 401)

        //find user info
        const userInfo = await this.userInfoRepository.find(getUser.user_info_uuid)
        if(!userInfo) throw new CustomError("User info not found", 404)

        //Check which document is being sent and update status to 'under_analysis'
        await this.getDocumentType(data)

        if (userInfo.user_document_validation_uuid) {

            //find documents validation
            const documentsValidation = await this.documentsValidationRepository.find(userInfo.user_document_validation_uuid)

            const documentsEntity = new DocumentValidationEntity(documentsValidation)

            documentsEntity.changeDocumentFrontBase64(data.document_front_base64)
            documentsEntity.changeDocumentBackBase64(data.document_back_base64)
            documentsEntity.changeDocumentSelfieBase64(data.document_selfie_base64)
            documentsEntity.changeSelfieBase64(data.selfie_base64)
            documentsEntity.changeDocumentFrontStatus(data.document_front_status)
            documentsEntity.changeDocumentBackStatus(data.document_back_status)
            documentsEntity.changeDocumentSelfieStatus(data.document_selfie_status)
            documentsEntity.changeSelfieStatus(data.selfie_status)
            
            await this.documentsValidationRepository.saveOrUpdate(documentsEntity, userInfo.uuid)

            return {
                uuid: documentsEntity.uuid,
                document_front_status: documentsEntity.document_front_status,
                document_back_status: documentsEntity.document_back_status,
                document_selfie_status: documentsEntity.document_selfie_status,
                selfie_status: documentsEntity.selfie_status
            }
        }

        const documentsEntity = await DocumentValidationEntity.create(data)
        await this.documentsValidationRepository.saveOrUpdate(documentsEntity, userInfo.uuid)
        return {
            uuid: documentsEntity.uuid,
            document_front_status: documentsEntity.document_front_status,
            document_back_status: documentsEntity.document_back_status,
            document_selfie_status: documentsEntity.document_selfie_status,
            selfie_status: documentsEntity.selfie_status
        }

    }
    private async getDocumentType(data: InputCreateDocumentValidationDTO): Promise<void> {

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

