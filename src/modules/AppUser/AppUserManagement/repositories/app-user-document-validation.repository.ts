import { DocumentValidationEntity } from "../entities/app-user-document-validation.entity";

export interface IAppUserDocumentValidationRepository{
    save(data: DocumentValidationEntity, user_info_uuid: string): Promise<void>
    find(id: string): Promise<DocumentValidationEntity | null>

}