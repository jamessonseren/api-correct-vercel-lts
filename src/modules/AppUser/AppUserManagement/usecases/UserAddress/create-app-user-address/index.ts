import { AppUserAddressPrismaRepository } from "../../../repositories/implementations-user-address/app-user-address-prisma.repository";
import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { CreateAppUserAddressController } from "./create-app-user-address.controller";

const addressRepository = new AppUserAddressPrismaRepository()
const userInfoRepository = new AppUserInfoPrismaRepository()
const userAuthRepository = new AppUserAuthPrismaRepository()

const createUserAddressController = new CreateAppUserAddressController(
    addressRepository,
    userInfoRepository,
    userAuthRepository
)

export { createUserAddressController }