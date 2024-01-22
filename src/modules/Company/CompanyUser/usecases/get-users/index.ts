import { CompanyUserPrismaRepository } from "../../repositories/implementations/company-user.prisma.repository";
import { GetSingleUserController } from "./get-users.controller";

const companyUsersRepository = new CompanyUserPrismaRepository()
const getSingleUserController = new GetSingleUserController(companyUsersRepository)

export { getSingleUserController }