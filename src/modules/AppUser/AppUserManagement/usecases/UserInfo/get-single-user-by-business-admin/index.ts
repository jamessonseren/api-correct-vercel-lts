import { CompanyUserPrismaRepository } from "../../../../../Company/CompanyUser/repositories/implementations/company-user.prisma.repository";
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { GetSingleUserByBusinessAdminController } from "./get-single-user-by-business-admin.controller";

const appUserRepository = new AppUserInfoPrismaRepository()
const businessUserRepository = new CompanyUserPrismaRepository()

const getSingleUserByAdmin = new GetSingleUserByBusinessAdminController(appUserRepository, businessUserRepository)

export { getSingleUserByAdmin }