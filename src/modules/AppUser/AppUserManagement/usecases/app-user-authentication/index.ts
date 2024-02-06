import { PasswordBCrypt } from "../../../../../infra/shared/crypto/password.bcrypt";
import { AppUserJWToken } from "../../../../../infra/shared/crypto/token/AppUser/jwt.token";
import { JWTToken } from "../../../../../infra/shared/crypto/token/CorrectAdmin/jwt.token";
import { AppUserAuthPrismaRepository } from "../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { AuthenticateAppUserController } from "./authenticate-app-user.controller";

const appUserPrismaRepository = new AppUserAuthPrismaRepository()
const passwordCrypto = new PasswordBCrypt()
const tokenGenerated = new AppUserJWToken()

const authenticateAppUserController = new AuthenticateAppUserController(
    appUserPrismaRepository,
    passwordCrypto,
    tokenGenerated
)

export { authenticateAppUserController }