import { AppUserInfoPrismaRepository } from "../../AppUserManagement/repositories/implementations-user-info/app-user-info-prisma.repository";
import { AppUserSignUpPrismaRepository } from "../repositories/implementations/prisma/app-user-signup-prisma.repository";
import { AppUserSignUpController } from "./app-user-signup.controller";

const appUserRepository = new AppUserSignUpPrismaRepository()
const appUserInfoRepository = new AppUserInfoPrismaRepository()
const appUsersignUpController = new AppUserSignUpController(appUserRepository, appUserInfoRepository)

export { appUsersignUpController }