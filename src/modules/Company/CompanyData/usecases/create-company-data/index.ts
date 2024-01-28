import { CorrectAdminPrismaRepository } from "../../../../CorrectAdmin/repositories/implementations/correct-admin.prisma.repository";
import { CompanyUserPrismaRepository } from "../../../CompanyUser/repositories/implementations/company-user.prisma.repository";
import { CompanyDataPrismaRepository } from "../../repositories/implementations/prisma/company-data-prisma.repository";
import { CreateCompanyDataController } from "./create-company-data.controller";

const companyDataRepository = new CompanyDataPrismaRepository()
const companyUserRepository = new CompanyUserPrismaRepository()

const companyDataController = new CreateCompanyDataController(
    companyDataRepository,
)

export { companyDataController }