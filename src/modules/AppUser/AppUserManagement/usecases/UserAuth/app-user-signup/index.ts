import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { AppUserAuthSignUpController } from "./app-user-auth-signup.controller";

const appUserRepository = new AppUserAuthPrismaRepository()
const appUserInfoRepository = new AppUserInfoPrismaRepository()

const appUserAuthSignUpController = new AppUserAuthSignUpController(appUserRepository, appUserInfoRepository)

export { appUserAuthSignUpController }