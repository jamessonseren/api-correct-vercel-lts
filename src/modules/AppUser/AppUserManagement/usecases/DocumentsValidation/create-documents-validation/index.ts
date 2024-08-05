import { DocumentValidationPrismaRepository } from "../../../repositories/implementations-document-validation/app-user-document-validation-prisma.repository";
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { CreateDocumentsValidationController } from "./create-documents-validation.controller";

const userInfoRepository = new AppUserInfoPrismaRepository()
const documentsValidationRepository = new DocumentValidationPrismaRepository()

const createDocumentsController = new CreateDocumentsValidationController(
    userInfoRepository,
    documentsValidationRepository
)

export { createDocumentsController }