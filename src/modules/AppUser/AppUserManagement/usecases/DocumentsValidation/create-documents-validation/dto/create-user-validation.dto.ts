import { UserDocumentValidationStatus } from "@prisma/client";
import { Uuid } from "../../../../../../../@shared/ValueObjects/uuid.vo";

export interface InputCreateDocumentValidationDTO {
    document_front_base64: string | null;
    document_front_status: UserDocumentValidationStatus;
    document_back_base64: string | null;
    document_back_status: UserDocumentValidationStatus;
    selfie_base64: string | null;
    selfie_status: UserDocumentValidationStatus;
    document_selfie_base64: string | null;
    document_selfie_status: UserDocumentValidationStatus;
    user_uuid: Uuid
}

export interface OutputCreateDocumentValidationDTO {
    uuid: Uuid
    document_front_status: UserDocumentValidationStatus;
    document_back_status: UserDocumentValidationStatus;
    selfie_status: UserDocumentValidationStatus;
    document_selfie_status: UserDocumentValidationStatus;
}