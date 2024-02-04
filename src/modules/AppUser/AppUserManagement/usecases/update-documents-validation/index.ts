import { AppUserDocumentsPrismaRepository } from "../../repositories/implementations-user-documents/app-user-documents-prisma.repository";
import { UpdateDocumentsValidationController } from "./update-documents-validation.controller";

const userValidationRepository = new AppUserDocumentsPrismaRepository()
const updateDocumentsController = new UpdateDocumentsValidationController(userValidationRepository)

export { updateDocumentsController }