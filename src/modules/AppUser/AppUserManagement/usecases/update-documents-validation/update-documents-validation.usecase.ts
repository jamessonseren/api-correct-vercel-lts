import { IAppUserValidationDocumentsRepository } from "../../repositories/app-user-validations-documents-repository.repository";
import { CustomError } from "../../../../../errors/custom.error";
import { UserValidationUpdate } from "../../../app-user-dto/app-user.dto";
import validator from "validator";

export class UpdateDocumentsValidationUsecase {
    constructor(
        private userValidationRepository: IAppUserValidationDocumentsRepository
    ) { }

    async execute(data: UserValidationUpdate) {
        
        if (!data.uuid) throw new CustomError("Query UUID is required", 400)
        
        //Check which document is being sent and update status to 'under_analysis'
        await this.getDocumentType(data)
        //Find user documents
        const findUserDocuments = await this.userValidationRepository.findById(data.uuid)
        if (!findUserDocuments) throw new CustomError("Documents not found", 400)

        if (data.selfie_base64 && !validator.isBase64(data.selfie_base64)) {
            throw new CustomError("Invalid base64 format for 'face'", 400);
        }

        if (data.document_front_base64 && !validator.isBase64(data.document_front_base64)) {
            throw new CustomError("Invalid base64 format for 'document_front'", 400);
        }

        if (data.document_back_base64 && !validator.isBase64(data.document_back_base64)) {
            throw new CustomError("Invalid base64 format for 'document_back'", 400);
        }

        if (data.document_selfie_base64 && !validator.isBase64(data.document_selfie_base64)) {
            throw new CustomError("Invalid base64 format for 'face_and_document_front'", 400);
        }

        await this.userValidationRepository.updateDocuments(data)



        return "Document sent successfully"


    }
    private async getDocumentType(data: UserValidationUpdate): Promise<string | null> {
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

        return null;
    }
}

