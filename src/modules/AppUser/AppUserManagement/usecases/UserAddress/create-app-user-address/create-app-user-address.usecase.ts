import { Uuid } from "../../../../../../@shared/ValueObjects/uuid.vo";
import { CustomError } from "../../../../../../errors/custom.error";
import { AppUserAddressEntity, AppUserAddressProps } from "../../../entities/app-user-address.entity";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { IAppUserAddressRepository } from "../../../repositories/app-user-address.repository";

export class CreateAppUserAddressUsecase{
    constructor(
        private addressRepository: IAppUserAddressRepository,
        private userAuthRepository: IAppUserAuthRepository
    ){}

    async execute(data: AppUserAddressProps, user_id: string){

        const findUser = await this.userAuthRepository.find(new Uuid(user_id))
        if(!findUser) throw new CustomError("Unauthorized access", 401)

        const userAddress = await AppUserAddressEntity.create(data)

        const registerAddress = await this.addressRepository.save(userAddress, findUser.document)

        return registerAddress

    }
}