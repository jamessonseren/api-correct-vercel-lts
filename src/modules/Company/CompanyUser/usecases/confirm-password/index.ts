import { PasswordBCrypt } from "../../../../../infra/shared/crypto/password.bcrypt"
import { CompanyUserPrismaRepository } from "../../repositories/implementations/company-user.prisma.repository"
import { ConfirmPasswordController } from "./confirm-password.controller"

const companyUserRepository = new CompanyUserPrismaRepository()
const passwordCrypto = new PasswordBCrypt()

const confirmPasswordController = new ConfirmPasswordController(
    companyUserRepository,
    passwordCrypto
)

export { confirmPasswordController }
