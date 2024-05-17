import { AppUserAddressEntity } from "../entities/app-user-address.entity";

export interface IAppUserAddressRepository{
    findById(id: string): Promise<AppUserAddressEntity | null>
    save(data: AppUserAddressEntity, document: string): Promise<void>
}