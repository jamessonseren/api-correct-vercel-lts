import { CompanyContractPrismaRepository } from "../../repositories/implementations/prisma/company-contract-prisma.repository";
import { FindSingleCompanyContractsController } from "./find-single-company-contracts.controller";

const contractsRepository = new CompanyContractPrismaRepository()
const findSingleCompanyContractsController = new FindSingleCompanyContractsController(
    contractsRepository
)

export { findSingleCompanyContractsController }