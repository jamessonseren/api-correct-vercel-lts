import { DocumentValidationPrismaRepository } from "../../../repositories/implementations-document-validation/app-user-document-validation-prisma.repository";
import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { GetByDocumentController } from "./get-by-document.controller";

const userAuthRepository = new AppUserAuthPrismaRepository()
const userInfoRepository = new AppUserInfoPrismaRepository()
const userValidation = new DocumentValidationPrismaRepository()

const getByDocumentController = new GetByDocumentController(
    userAuthRepository,
    userInfoRepository,
    userValidation
)

export { getByDocumentController }