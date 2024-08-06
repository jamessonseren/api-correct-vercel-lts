import { CompanyDataPrismaRepository } from "../../../../../Company/CompanyData/repositories/implementations/prisma/company-data-prisma.repository";
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { GetUserInfoByUserController } from "./get-user-info-by-user.controller";

const appUserRepository = new AppUserInfoPrismaRepository()
const businessInfoRepository = new CompanyDataPrismaRepository()

const getUserInfobyUser = new GetUserInfoByUserController(appUserRepository, businessInfoRepository)

export { getUserInfobyUser }