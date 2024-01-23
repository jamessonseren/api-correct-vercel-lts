import { CompanyUserPrismaRepository } from "../../repositories/implementations/company-user.prisma.repository";
import { GetSingleUserController } from "./get-single-user.controller";

const companyUserRepository = new CompanyUserPrismaRepository()
const getSingleUserController = new GetSingleUserController(companyUserRepository)

export { getSingleUserController}