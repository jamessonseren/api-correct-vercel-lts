import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { AppUserDetailsController } from "./app-user-details.controller";

const appUserRepository = new AppUserAuthPrismaRepository()
const userDetailsController = new AppUserDetailsController(appUserRepository)

export { userDetailsController }