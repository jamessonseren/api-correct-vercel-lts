import RepositoryInterface from "../../../../@shared/domain/repository/repository-interface";
import { AddressEntity } from "../../../../infra/shared/address/address.entity";

export interface IAppUserAddressRepository extends RepositoryInterface<AddressEntity>{}

