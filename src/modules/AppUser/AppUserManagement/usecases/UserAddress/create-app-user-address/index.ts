import { AppUserAddressPrismaRepository } from "../../../repositories/implementations-user-address/app-user-address-prisma.repository";
import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { CreateAppUserAddressController } from "./create-app-user-address.controller";

const addressRepository = new AppUserAddressPrismaRepository()
const userAuthRepository = new AppUserAuthPrismaRepository()

const createUserAddressController = new CreateAppUserAddressController(
    addressRepository,
    userAuthRepository
)

export { createUserAddressController }