import { CompanyDataPrismaRepository } from "../../../CompanyData/repositories/implementations/prisma/company-data-prisma.repository";
import { CompanyUserPrismaRepository } from "../../repositories/implementations/company-user.prisma.repository";
import { CreateCompanyUserByCorrectController } from "./create-company-admin.controller";

const companyUserRepository = new CompanyUserPrismaRepository()
const companyDataRepository = new CompanyDataPrismaRepository()
const companyUserController = new CreateCompanyUserByCorrectController(
    companyUserRepository,
    companyDataRepository
)

export { companyUserController }