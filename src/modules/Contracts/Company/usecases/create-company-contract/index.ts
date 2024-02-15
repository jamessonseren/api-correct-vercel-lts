import { PasswordBCrypt } from "../../../../../infra/shared/crypto/password.bcrypt";
import { CompanyUserPrismaRepository } from "../../../../Company/CompanyUser/repositories/implementations/company-user.prisma.repository";
import { CompanyContractPrismaRepository } from "../../repositories/implementations/prisma/company-contract-prisma.repository";
import { CreateCompanyContractController } from "./create-company-contract.controller";

const companyContractRepository = new CompanyContractPrismaRepository()
const businessUserRepository = new CompanyUserPrismaRepository()
const passwordCrypto = new PasswordBCrypt()


const createCompanyContractController = new CreateCompanyContractController(
    companyContractRepository, 
    businessUserRepository,
    passwordCrypto
    )

export {createCompanyContractController }