import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { UserValidation, UserValidationUpdate } from "../../../app-user-dto/app-user.dto";
import { IAppUserValidationDocumentsRepository } from "../app-user-validations-documents-repository.repository";

export class AppUserDocumentsPrismaRepository implements IAppUserValidationDocumentsRepository {
    
    async findById(id: string): Promise<UserValidation | null> {
        const userDocuments = await prismaClient.userDocumentValidation.findUnique({
            where: {
                uuid: id
            }
        })

        return userDocuments
    }
    async updateDocuments(data: UserValidationUpdate): Promise<UserValidation> {
        const userDocuments = await prismaClient.userDocumentValidation.update({
            where: {
                uuid: data.uuid
            },
            data:{
                document_front_base64: data.document_front_base64,
                document_front_status: data.document_front_status,
                document_back_base64: data.document_back_base64,
                document_back_status: data.document_back_status,
                document_selfie_base64: data.document_selfie_base64,
                document_selfie_status: data.document_selfie_status,
                selfie_base64: data.selfie_base64,
                selfie_status: data.selfie_status

            }
        })

        return userDocuments
    }

}