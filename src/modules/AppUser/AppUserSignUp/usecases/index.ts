import { AppUserSignUpPrismaRepository } from "../repositories/implementations/prisma/app-user-signup-prisma.repository";
import { AppUserSignUpController } from "./app-user-signup.controller";

const appUserRepository = new AppUserSignUpPrismaRepository()
const appUsersignUpController = new AppUserSignUpController(appUserRepository)

export { appUsersignUpController }