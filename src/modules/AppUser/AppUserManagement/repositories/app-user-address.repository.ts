import RepositoryInterface from "../../../../@shared/domain/repository/repository-interface";
import { AddressEntity } from "../../../../infra/shared/address/address.entity";
import { InputCreateUserAddressDTO } from "../usecases/UserAddress/create-app-user-address/dto/create-app-user-address.dto";

export interface IAppUserAddressRepository extends RepositoryInterface<AddressEntity>{
    createAddress(data: AddressEntity, document: string): Promise<void>
}

