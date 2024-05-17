import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { GetByDocumentController } from "./get-by-document.controller";

const userAuthRepository = new AppUserAuthPrismaRepository()
const getByDocumentController = new GetByDocumentController(userAuthRepository)

export { getByDocumentController }