import { AppUserAddressPrismaRepository } from "../../../repositories/implementations-user-address/app-user-address-prisma.repository";
import { AppUserInfoPrismaRepository } from "../../../repositories/implementations-user-info/app-user-info-prisma.repository";
import { GetAppUserAddressController } from "./get-app-user-address.controller";

const addressRepository = new AppUserAddressPrismaRepository()
const userInfoRepository = new AppUserInfoPrismaRepository()

const getUserAddressController = new GetAppUserAddressController(
    addressRepository,
    userInfoRepository
)

export { getUserAddressController }