import { AddressEntity } from "../../../../../../infra/shared/address/address.entity";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { IAppUserAddressRepository } from "../../../repositories/app-user-address.repository";
import { InputCreateUserAddressDTO, OutputCreateUserAddressDTO } from "./dto/create-app-user-address.dto";

export class CreateAppUserAddressUsecase{
    constructor(
        private addressRepository: IAppUserAddressRepository,
    ){}

    async execute(data: InputCreateUserAddressDTO):Promise<OutputCreateUserAddressDTO>{

        const userAddress = await AddressEntity.create(data)

        await this.addressRepository.create(userAddress)

        return {
            uuid: userAddress.uuid,
            line1: userAddress.line1,
            line2: userAddress.line2,
            line3: userAddress.line3,
            postal_code: userAddress.postal_code,
            neighborhood: userAddress.neighborhood,
            city: userAddress.city,
            state: userAddress.state,
            country: userAddress.country,
            created_at: userAddress.created_at,
            updated_at: userAddress.updated_at,
            user_uuid: data.user_uuid
        }

    }
}