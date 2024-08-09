import { AppUserAddressPrismaRepository } from "../../../repositories/implementations-user-address/app-user-address-prisma.repository";
import { AppUserAuthPrismaRepository } from "../../../repositories/implementations-user-auth/app-user-auth-prisma.repository";
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { UpdateAppUserAddressController } from "../update-app-user-address/update-app-user-address.controller";

const addressRepository = new AppUserAddressPrismaRepository()
const userInfoRepository = new AppUserInfoPrismaRepository()
const userAuthRepository = new AppUserAuthPrismaRepository()

const updateUserAddressController = new UpdateAppUserAddressController(
    addressRepository,
    userInfoRepository,
    userAuthRepository
)

export { updateUserAddressController }