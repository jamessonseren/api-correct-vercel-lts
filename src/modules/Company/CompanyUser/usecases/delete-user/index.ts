import { CompanyUserPrismaRepository } from "../../repositories/implementations/company-user.prisma.repository";
import { DeleteUserByAdminController } from "./delete-user-by-admin.controller";

const companyUserRepository = new CompanyUserPrismaRepository()
const deleteUserController = new DeleteUserByAdminController(companyUserRepository)

export { deleteUserController }