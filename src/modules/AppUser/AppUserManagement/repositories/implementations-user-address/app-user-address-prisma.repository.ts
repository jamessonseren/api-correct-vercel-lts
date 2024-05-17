import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { newDateF } from "../../../../../utils/date";
import { AppUserAddressEntity } from "../../entities/app-user-address.entity";
import { IAppUserAddressRepository } from "../app-user-address.repository";

export class AppUserAddressPrismaRepository implements IAppUserAddressRepository{
    async findById(id: string): Promise<AppUserAddressEntity | null> {
        return await prismaClient.address.findUnique({
            where:{
                uuid: id
            }
        })
    }
    
    async save(data: AppUserAddressEntity, document: string): Promise<void> {
        await prismaClient.$transaction([
            prismaClient.address.create({
                data:{
                    uuid: data.uuid,
                    line1: data.line1,
                    line2: data.line2,
                    postal_code: data.postal_code,
                    neighborhood: data.neighborhood,
                    city: data.city,
                    state: data.state,
                    country: data.country
                }
            })
        ]),

        await prismaClient.userInfo.update({
            where:{
                document
            },
            data:{
                address_uuid: data.uuid,
                updated_at: newDateF(new Date())
            }
        })
    }

}