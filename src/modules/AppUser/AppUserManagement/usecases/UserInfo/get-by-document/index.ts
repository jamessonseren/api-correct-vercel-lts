import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { GetUserInfoByDocumentController } from "./get-user-info-by-document.controller";

const userInfoRepository = new AppUserInfoPrismaRepository()
const getUserInfoController = new GetUserInfoByDocumentController(userInfoRepository)

export { getUserInfoController }