import { CompanyContractPrismaRepository } from "../../repositories/implementations/prisma/company-contract-prisma.repository";
import { FindCompanyContractsController } from "./find-company-contracts.controller";

const contractsRepository = new CompanyContractPrismaRepository()
const findCompanyContractsController = new FindCompanyContractsController(
    contractsRepository
)

export { findCompanyContractsController }