import RepositoryInterface from "../../../../@shared/domain/repository/repository-interface";
import { AppUserAddressEntity } from "../entities/app-user-address.entity";

export interface IAppUserAddressRepository extends RepositoryInterface<AppUserAddressEntity>{
    findById(id: string): Promise<AppUserAddressEntity | null>
    save(data: AppUserAddressEntity, document: string): Promise<void>
}

