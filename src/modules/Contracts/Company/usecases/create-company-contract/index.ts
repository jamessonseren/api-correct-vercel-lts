import { CompanyContractPrismaRepository } from "../../repositories/implementations/prisma/company-contract-prisma.repository";
import { CreateCompanyContractController } from "./create-company-contract.controller";

const companyContractRepository = new CompanyContractPrismaRepository()

const createCompanyContractController = new CreateCompanyContractController(companyContractRepository)

export {createCompanyContractController }