import { UserDocumentValidationStatus } from "@prisma/client"
import { randomUUID } from 'crypto'
import { CustomError } from "../../../../errors/custom.error"
import validator from "validator";

export type DocumentValidationProps = {

    document_front_base64: string
    document_front_status: UserDocumentValidationStatus
    document_back_base64: string
    document_back_status: UserDocumentValidationStatus
    selfie_base64: string | null
    selfie_status: UserDocumentValidationStatus
    document_selfie_base64: string
    document_selfie_status: UserDocumentValidationStatus
}

export class DocumentValidationEntity {
    uuid: string
    document_front_base64: string
    document_front_status: UserDocumentValidationStatus
    document_back_base64: string
    document_back_status: UserDocumentValidationStatus
    selfie_base64: string | null
    selfie_status: UserDocumentValidationStatus
    document_selfie_base64: string
    document_selfie_status: UserDocumentValidationStatus

    private constructor(props: DocumentValidationProps){
        this.uuid = randomUUID()
        this.document_front_base64 = props.document_front_base64
        this.document_front_status = props.document_front_status
        this.document_back_base64 = props.document_back_base64
        this.document_back_status = props.document_back_status
        this.selfie_base64 = props.selfie_base64
        this.selfie_status = props.selfie_status
        this.document_selfie_base64 = props.document_selfie_base64
        this.document_selfie_status = props.document_selfie_status
        
    }

    static async create(data: DocumentValidationProps){

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

        const documents = new DocumentValidationEntity(data)
        return documents

    }
}