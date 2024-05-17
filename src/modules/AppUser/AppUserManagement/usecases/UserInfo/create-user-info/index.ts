import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository"
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository"
import { CreateUserInfoController } from "./create-user-info.controller"

const appUserAuthRepository = new AppUserAuthPrismaRepository()
const appUserInfoRepository = new AppUserInfoPrismaRepository()

const createUserInfoController = new CreateUserInfoController(appUserInfoRepository, appUserAuthRepository) 

export { createUserInfoController }