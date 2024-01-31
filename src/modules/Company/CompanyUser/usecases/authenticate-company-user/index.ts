import { PasswordBCrypt } from "../../../../../infra/shared/crypto/password.bcrypt";
import { CompanyAdminJWToken } from "../../../../../infra/shared/crypto/token/CompanyAdmin/jwt.token";
import { CompanyDataPrismaRepository } from "../../../CompanyData/repositories/implementations/prisma/company-data-prisma.repository";
import { CompanyUserPrismaRepository } from "../../repositories/implementations/company-user.prisma.repository";
import { AuthenticateCompanyAdminController } from "./authenticate-company-user.controller";

const companyUserRepository = new CompanyUserPrismaRepository()
const companyDataRepository = new CompanyDataPrismaRepository()
const passwordCrypto = new PasswordBCrypt()
const tokenGenerated = new CompanyAdminJWToken()

const authCompanyUserController = new AuthenticateCompanyAdminController(
    companyUserRepository,
    companyDataRepository,
    passwordCrypto,
    tokenGenerated
)

export { authCompanyUserController }