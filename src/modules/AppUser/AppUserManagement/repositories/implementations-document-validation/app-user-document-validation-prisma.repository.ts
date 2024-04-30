import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { newDateF } from "../../../../../utils/date";
import { DocumentValidationEntity, DocumentValidationProps } from "../../entities/app-user-document-validation.entity";
import { IAppUserDocumentValidationRepository } from "../app-user-document-validation.repository";

export class DocumentValidationPrismaRepository implements IAppUserDocumentValidationRepository {
    async save(data: DocumentValidationEntity, user_info_uuid: string): Promise<void> {

        await prismaClient.$transaction([
            prismaClient.userDocumentValidation.upsert({
                where:{
                    uuid: data.uuid
                },
                create: {
                    uuid: data.uuid,
                    document_front_base64: data.document_front_base64,
                    document_front_status: data.document_front_status,
                    document_back_base64: data.document_back_base64,
                    document_back_status: data.document_back_status,
                    selfie_base64: data.selfie_base64,
                    selfie_status: data.selfie_status,
                    document_selfie_base64: data.document_selfie_base64,
                    document_selfie_status: data.document_selfie_status,
                    created_at: newDateF(new Date())
                },
                update:{
                    document_front_base64: data.document_front_base64,
                    document_front_status: data.document_front_status,
                    document_back_base64: data.document_back_base64,
                    document_back_status: data.document_back_status,
                    selfie_base64: data.selfie_base64,
                    selfie_status: data.selfie_status,
                    document_selfie_base64: data.document_selfie_base64,
                    document_selfie_status: data.document_selfie_status,
                    updated_at: newDateF(new Date())

                }
            }),

            prismaClient.userInfo.update({
                where:{
                    uuid: user_info_uuid
                },
                data:{
                    user_document_validation_uuid: data.uuid,
                    updated_at: newDateF(new Date())
                }
            })
        ])
    }

}