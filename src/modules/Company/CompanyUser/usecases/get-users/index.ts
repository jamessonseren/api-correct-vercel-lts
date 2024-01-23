import { CompanyUserPrismaRepository } from "../../repositories/implementations/company-user.prisma.repository";
import { GetUsersController } from "./get-users.controller";

const companyUsersRepository = new CompanyUserPrismaRepository()
const getUsersController = new GetUsersController(companyUsersRepository)

export { getUsersController }