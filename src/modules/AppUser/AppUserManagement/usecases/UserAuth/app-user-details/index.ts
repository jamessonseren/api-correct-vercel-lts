import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { AppUserDetailsController } from "./app-user-details.controller";

const appUserRepository = new AppUserAuthPrismaRepository()
const appUserInfoRepository = new AppUserInfoPrismaRepository()
const userDetailsController = new AppUserDetailsController(appUserRepository, appUserInfoRepository)

export { userDetailsController }