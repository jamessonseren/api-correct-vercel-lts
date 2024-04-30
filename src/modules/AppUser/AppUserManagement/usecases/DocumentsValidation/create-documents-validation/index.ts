import { DocumentValidationPrismaRepository } from "../../../repositories/implementations-document-validation/app-user-document-validation-prisma.repository";
import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { CreateDocumentsValidationController } from "./create-documents-validation.controller";

const userAuthRepository = new AppUserAuthPrismaRepository()
const documentsValidationRepository = new DocumentValidationPrismaRepository()

const createDocumentsController = new CreateDocumentsValidationController(
    userAuthRepository,
    documentsValidationRepository
)

export { createDocumentsController }